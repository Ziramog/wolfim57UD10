// tests/tracking.test.mjs
//
// Pruebas unitarias de la lógica de tracking: allowlist de hosts, bootstrap de
// GA4 (incluido el banner que no tapa el CTA sticky), gating de eventos,
// atribución last-touch con TTL de 90 días y tracker único de WhatsApp.
// Corren con `node --test "tests/*.test.mjs"` (Node 22+ importa .ts nativo).
//
// No requieren build ni red.

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ALLOWED_HOSTS,
  GA_MEASUREMENT_ID,
  HOST_WARNING_ID,
  HOST_WARNING_BODY_CLASS,
  HOST_WARNING_FALLBACK_OFFSET,
  HOST_WARNING_STICKY_GAP,
  HOST_WARNING_STYLE_ID,
  buildTrackingBootstrap,
  isAllowedHost,
} from '../src/lib/tracking-config.ts';
import { isTrackingEnabled, trackEvent } from '../src/lib/analytics.ts';
import {
  ATTRIBUTION_CAPTURED_AT_KEY,
  ATTRIBUTION_MODEL,
  ATTRIBUTION_TTL_DAYS,
  ATTRIBUTION_TTL_MS,
  captureUTMs,
  computeSource,
  getAttribution,
  getUTMs,
} from '../src/lib/utm.ts';
import {
  WHATSAPP_SELECTOR,
  initWhatsAppTracking,
  resolveWhatsAppComponent,
  trackWhatsAppClick,
} from '../src/lib/whatsapp-tracking.ts';

// ─── helpers ────────────────────────────────────────────────────────────────

const DAY_MS = 24 * 60 * 60 * 1000;

const setGlobal = (key, value) => {
  globalThis[key] = value;
};

const clearGlobals = () => {
  for (const key of ['window', 'document', 'localStorage', 'location']) {
    delete globalThis[key];
  }
};

const makeLocalStorage = (seed = {}) => {
  const store = new Map(Object.entries(seed));
  return {
    store,
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
  };
};

/** Sandbox mínimo de DOM: suficiente para el bootstrap de <head>. */
const makeStyle = () => {
  const props = new Map();
  return {
    cssText: '',
    setProperty: (key, value) => props.set(key, value),
    removeProperty: (key) => props.delete(key),
    getPropertyValue: (key) => (props.has(key) ? props.get(key) : ''),
    props,
  };
};

const makeClassList = () => {
  const set = new Set();
  return {
    set,
    add: (cls) => set.add(cls),
    remove: (cls) => set.delete(cls),
    contains: (cls) => set.has(cls),
  };
};

const makeElement = (tagName, { height = 0 } = {}) => ({
  tagName,
  id: '',
  style: makeStyle(),
  classList: makeClassList(),
  children: [],
  parentNode: null,
  attrs: {},
  textContent: '',
  height,
  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  },
  removeChild(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) this.children.splice(index, 1);
    child.parentNode = null;
    return child;
  },
  setAttribute(name, value) {
    this.attrs[name] = value;
  },
  getAttribute(name) {
    return this.attrs[name] ?? null;
  },
  addEventListener(type, fn) {
    this.attrs[`on${type}`] = fn;
  },
  getBoundingClientRect() {
    return { height: this.height, top: 0, bottom: this.height, left: 0, right: 0, width: 0 };
  },
});

const findByTag = (root, tagName) => {
  for (const child of root.children) {
    if (child.tagName === tagName) return child;
    const nested = findByTag(child, tagName);
    if (nested) return nested;
  }
  return null;
};

const findById = (root, id) => {
  for (const child of root.children) {
    if (child.id === id) return child;
    const nested = findById(child, id);
    if (nested) return nested;
  }
  return null;
};

/**
 * Ejecuta el bootstrap de Layout en un sandbox controlado y devuelve todo lo
 * que tocó: elementos del head, del body, warnings, listeners y banner.
 */
function runBootstrap(hostname, { bodyReady = true, bannerHeight = 0 } = {}) {
  const head = makeElement('head');
  const body = makeElement('body');
  const documentElement = makeElement('html');
  const warnings = [];
  const listeners = [];

  const document = {
    head,
    body: bodyReady ? body : null,
    documentElement,
    getElementById(id) {
      return findById(body, id) || findById(head, id);
    },
    addEventListener(type, fn) {
      listeners.push({ type, fn });
    },
    createElement(tagName) {
      return makeElement(tagName, { height: tagName === 'div' ? bannerHeight : 0 });
    },
  };

  const window = {};
  const location = { hostname, pathname: '/', search: '' };
  const consoleSpy = {
    warn: (...args) => warnings.push(args.join(' ')),
    log: () => {},
    error: () => {},
  };

  const source = buildTrackingBootstrap();
  // eslint-disable-next-line no-new-func
  new Function('window', 'document', 'location', 'console', source)(window, document, location, consoleSpy);

  return { window, document, head, body, documentElement, warnings, listeners, location };
}

// ─── allowlist ──────────────────────────────────────────────────────────────

test('allowlist: solo www.wolfim.com y wolfim.com pueden medir', () => {
  assert.deepEqual(ALLOWED_HOSTS, ['www.wolfim.com', 'wolfim.com']);
  assert.equal(isAllowedHost('www.wolfim.com'), true);
  assert.equal(isAllowedHost('wolfim.com'), true);
  assert.equal(isAllowedHost(' WWW.WOLFIM.COM '), true);

  for (const host of [
    'wolfim-57ud10.vercel.app',
    'wolfim-57ud10-git-main-ziramog.vercel.app',
    'localhost',
    '127.0.0.1',
    'wolfim.com.evil.test',
    '',
    undefined,
    null,
  ]) {
    assert.equal(isAllowedHost(host), false, `host no permitido aceptado: ${String(host)}`);
  }
});

test('bootstrap: en host permitido carga gtag y configura la propiedad', () => {
  const { window, head, body, warnings } = runBootstrap('www.wolfim.com');

  assert.equal(window.__wolfimTracking.allowed, true);
  assert.equal(window.__wolfimTracking.measurementId, GA_MEASUREMENT_ID);
  assert.equal(warnings.length, 0);
  assert.equal(body.children.length, 0, 'no debe mostrar banner en producción');

  const scripts = head.children.filter((el) => el.tagName === 'script');
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
  assert.equal(scripts[0].async, true);

  const configCall = window.dataLayer.find((args) => args[0] === 'config');
  assert.ok(configCall, 'debe configurar GA4 con el measurement id');
  assert.equal(configCall[1], GA_MEASUREMENT_ID);
});

test('bootstrap: en host no permitido no carga gtag, avisa y muestra banner', () => {
  const { window, head, body, warnings } = runBootstrap('wolfim-57ud10.vercel.app');

  assert.equal(window.__wolfimTracking.allowed, false);
  assert.equal(
    head.children.some((el) => el.tagName === 'script'),
    false,
    'no debe inyectar el script de GA4 fuera de la allowlist'
  );
  assert.equal(
    window.dataLayer.some((args) => args[0] === 'config'),
    false,
    'no debe configurar GA4 fuera de la allowlist'
  );
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /host fuera de allowlist/i);

  const banner = body.children.find((el) => el.id === HOST_WARNING_ID);
  assert.ok(banner, 'el banner debe existir en el body');
  assert.equal(banner.attrs.role, 'status');
  const label = findByTag(banner, 'span');
  assert.ok(label, 'el banner debe tener el texto como span');
  assert.match(label.textContent, /analitica desactivada/i);
});

test('bootstrap: el banner reserva espacio y no tapa el CTA sticky de WhatsApp', () => {
  const { body, documentElement, head } = runBootstrap('preview.example.vercel.app', { bannerHeight: 38 });

  // Reserva espacio abajo para que el banner no tape contenido.
  assert.equal(body.classList.contains(HOST_WARNING_BODY_CLASS), true, 'falta la clase en el body');
  assert.equal(
    documentElement.style.getPropertyValue('--wolfim-warning-offset'),
    '38px',
    'el offset debe medirse del banner real'
  );

  const style = findById(head, HOST_WARNING_STYLE_ID);
  assert.ok(style, 'falta el <style> que desplaza el sticky');
  assert.match(style.textContent, /padding-bottom:var\(--wolfim-warning-offset/);
  assert.match(style.textContent, /\.whatsapp-sticky\{bottom:calc\(var\(--wolfim-warning-offset/);
  assert.match(
    style.textContent,
    new RegExp(`\\+ ${HOST_WARNING_STICKY_GAP}px\\)`),
    'el sticky debe quedar por encima del banner, con separación'
  );
});

test('bootstrap: sin altura medible usa el offset de respaldo', () => {
  const { documentElement } = runBootstrap('localhost');
  assert.equal(
    documentElement.style.getPropertyValue('--wolfim-warning-offset'),
    `${HOST_WARNING_FALLBACK_OFFSET}px`
  );
});

test('bootstrap: el banner se puede descartar y libera el espacio reservado', () => {
  const { body, documentElement } = runBootstrap('preview.example.vercel.app', { bannerHeight: 38 });

  const banner = body.children.find((el) => el.id === HOST_WARNING_ID);
  const dismiss = findByTag(banner, 'button');
  assert.ok(dismiss, 'el banner debe tener botón de cierre');
  assert.match(dismiss.attrs['aria-label'] || '', /cerrar/i);

  dismiss.attrs.onclick();

  assert.equal(body.children.includes(banner), false, 'el banner debe desaparecer');
  assert.equal(body.classList.contains(HOST_WARNING_BODY_CLASS), false, 'debe liberar el padding');
  assert.equal(documentElement.style.getPropertyValue('--wolfim-warning-offset'), '');
});

test('bootstrap: si el body aún no existe, el banner se difiere a DOMContentLoaded', () => {
  const { body, listeners } = runBootstrap('preview.example.vercel.app', { bodyReady: false });
  assert.equal(body.children.length, 0);
  const domReady = listeners.find((l) => l.type === 'DOMContentLoaded');
  assert.ok(domReady, 'debe registrar el defer del banner');
});

// ─── gating de eventos ──────────────────────────────────────────────────────

test('trackEvent no envía nada si el bootstrap bloqueó el host', () => {
  clearGlobals();
  const calls = [];
  setGlobal('window', {
    location: { pathname: '/diagnostico' },
    __wolfimTracking: { allowed: false, host: 'wolfim-57ud10.vercel.app' },
    gtag: (...args) => calls.push(args),
  });

  trackEvent('form_submit_diagnostico', { component: 'test' });

  assert.equal(isTrackingEnabled(), false);
  assert.deepEqual(calls, []);
  clearGlobals();
});

test('trackEvent envía el evento cuando el host está permitido', () => {
  clearGlobals();
  const calls = [];
  setGlobal('window', {
    location: { pathname: '/diagnostico' },
    __wolfimTracking: { allowed: true, host: 'www.wolfim.com' },
    gtag: (...args) => calls.push(args),
  });

  trackEvent('form_submit_diagnostico', { component: 'diagnostico_landing' });

  assert.equal(isTrackingEnabled(), true);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0][0], 'event');
  assert.deepEqual(calls[0][1], 'form_submit_diagnostico');
  assert.equal(calls[0][2].component, 'diagnostico_landing');
  clearGlobals();
});

test('trackEvent no inventa eventos si el bootstrap nunca corrió', () => {
  clearGlobals();
  const calls = [];
  setGlobal('window', { location: { pathname: '/' }, gtag: (...args) => calls.push(args) });
  trackEvent('click_whatsapp', { component: 'hero' });
  assert.deepEqual(calls, []);
  clearGlobals();
});

// ─── atribución: captura, last touch y TTL de 90 días ───────────────────────

const seedAttribution = (storage, value) => storage.setItem('wolfim_utms', JSON.stringify(value));

test('captureUTMs conserva utm_term, los click ids y sella la fecha del touch', () => {
  clearGlobals();
  const storage = makeLocalStorage();
  setGlobal('localStorage', storage);
  setGlobal('window', {
    location: {
      search:
        '?utm_source=google&utm_medium=cpc&utm_campaign=lanzamiento&utm_content=ad1&utm_term=web+para+inmobiliaria&gclid=GCLID123',
    },
  });

  const before = Date.now();
  captureUTMs();
  const stored = JSON.parse(storage.getItem('wolfim_utms'));

  assert.equal(stored.utm_source, 'google');
  assert.equal(stored.utm_medium, 'cpc');
  assert.equal(stored.utm_campaign, 'lanzamiento');
  assert.equal(stored.utm_content, 'ad1');
  assert.equal(stored.utm_term, 'web para inmobiliaria');
  assert.equal(stored.gclid, 'GCLID123');
  assert.equal(typeof stored[ATTRIBUTION_CAPTURED_AT_KEY], 'number', 'falta el sello del touch');
  assert.ok(stored[ATTRIBUTION_CAPTURED_AT_KEY] >= before, 'el sello debe ser el de este touch');
  clearGlobals();
});

test('captureUTMs es last-touch: el touch nuevo reemplaza al anterior', () => {
  clearGlobals();
  const storage = makeLocalStorage();
  seedAttribution(storage, {
    utm_term: 'previo',
    fbclid: 'FB1',
    utm_source: 'meta',
    [ATTRIBUTION_CAPTURED_AT_KEY]: Date.now() - 3 * DAY_MS,
  });
  setGlobal('localStorage', storage);
  setGlobal('window', { location: { search: '?msclkid=MS1' } });

  captureUTMs();
  const stored = getUTMs();

  assert.equal(stored.msclkid, 'MS1');
  assert.equal(stored.fbclid, undefined, 'no debe arrastrar el click id de la campaña anterior');
  assert.equal(stored.utm_term, undefined, 'no debe mezclar campañas');
  assert.equal(stored.utm_source, undefined, 'no debe arrastrar UTMs de la campaña anterior');
  clearGlobals();
});

test('captureUTMs ignora navegaciones sin parámetros y no renueva el touch', () => {
  clearGlobals();
  const capturedAt = Date.now() - 10 * DAY_MS;
  const storage = makeLocalStorage();
  seedAttribution(storage, { utm_source: 'meta', [ATTRIBUTION_CAPTURED_AT_KEY]: capturedAt });
  setGlobal('localStorage', storage);
  setGlobal('window', { location: { search: '' } });

  captureUTMs();

  assert.equal(getUTMs().utm_source, 'meta');
  assert.equal(
    JSON.parse(storage.getItem('wolfim_utms'))[ATTRIBUTION_CAPTURED_AT_KEY],
    capturedAt,
    'una navegación interna no debe extender el TTL'
  );
  clearGlobals();
});

test('TTL: a los 90 días exactos sigue vigente, al día siguiente expira', () => {
  clearGlobals();
  const storage = makeLocalStorage();
  setGlobal('localStorage', storage);
  setGlobal('window', { location: { search: '' } });

  seedAttribution(storage, {
    gclid: 'GCLID-VIEJO',
    [ATTRIBUTION_CAPTURED_AT_KEY]: Date.now() - ATTRIBUTION_TTL_MS,
  });
  assert.equal(getUTMs().gclid, 'GCLID-VIEJO', 'el límite exacto todavía vale');

  seedAttribution(storage, {
    gclid: 'GCLID-VIEJO',
    [ATTRIBUTION_CAPTURED_AT_KEY]: Date.now() - ATTRIBUTION_TTL_MS - DAY_MS,
  });
  assert.deepEqual(getUTMs(), {}, 'pasado el TTL no debe quedar atribución');
  assert.equal(storage.getItem('wolfim_utms'), null, 'el registro expirado debe borrarse');
  assert.equal(computeSource(getUTMs()), 'direct', 'un gclid vencido no puede seguir ganando');
  clearGlobals();
});

test('TTL: todo registro sin fecha (legacy) se considera expirado', () => {
  clearGlobals();
  const storage = makeLocalStorage();
  seedAttribution(storage, { gclid: 'GCLID-SIN-FECHA', utm_source: 'google' });
  setGlobal('localStorage', storage);
  setGlobal('window', { location: { search: '' } });

  assert.deepEqual(getUTMs(), {}, 'sin sello no se puede verificar la antigüedad');
  assert.equal(storage.getItem('wolfim_utms'), null);
  clearGlobals();
});

test('TTL: una fecha en el futuro se descarta (reloj inválido)', () => {
  clearGlobals();
  const storage = makeLocalStorage();
  seedAttribution(storage, {
    gclid: 'GCLID-FUTURO',
    [ATTRIBUTION_CAPTURED_AT_KEY]: Date.now() + DAY_MS,
  });
  setGlobal('localStorage', storage);
  setGlobal('window', { location: { search: '' } });

  assert.deepEqual(getUTMs(), {});
  clearGlobals();
});

test('renovación: un touch nuevo reinicia los 90 días', () => {
  clearGlobals();
  const storage = makeLocalStorage();
  const oldTouch = Date.now() - 80 * DAY_MS;
  seedAttribution(storage, { gclid: 'GCLID-80D', [ATTRIBUTION_CAPTURED_AT_KEY]: oldTouch });
  setGlobal('localStorage', storage);
  setGlobal('window', { location: { search: '?gclid=GCLID-NUEVO' } });

  assert.equal(getUTMs().gclid, 'GCLID-80D', 'a los 80 días el touch anterior sigue vigente');

  captureUTMs();
  const stored = JSON.parse(storage.getItem('wolfim_utms'));

  assert.equal(stored.gclid, 'GCLID-NUEVO');
  assert.ok(stored[ATTRIBUTION_CAPTURED_AT_KEY] > oldTouch, 'el sello debe renovarse');
  assert.ok(
    Date.now() - stored[ATTRIBUTION_CAPTURED_AT_KEY] < 60 * 1000,
    'el sello debe ser de ahora'
  );
  clearGlobals();
});

test('computeSource refleja el canal real del lead', () => {
  assert.equal(computeSource({ gclid: 'x' }), 'google_ads');
  assert.equal(computeSource({ fbclid: 'x' }), 'meta_ads');
  assert.equal(computeSource({ msclkid: 'x' }), 'microsoft_ads');
  assert.equal(computeSource({ utm_source: 'Meta', utm_medium: 'paid' }), 'utm:meta:paid');
  assert.equal(computeSource({ utm_source: 'newsletter' }), 'utm:newsletter');
  assert.equal(computeSource({}, 'https://www.google.com/search?q=x'), 'referral');
  assert.equal(computeSource({}, 'https://www.wolfim.com/diagnostico/'), 'direct');
  assert.equal(computeSource({}, ''), 'direct');
  // un gclid gana sobre un utm_source genérico
  assert.equal(computeSource({ gclid: 'x', utm_source: 'google' }), 'google_ads');
});

test('getAttribution devuelve source, utms, modelo y TTL', () => {
  clearGlobals();
  const storage = makeLocalStorage();
  seedAttribution(storage, {
    utm_source: 'meta',
    utm_medium: 'cpc',
    utm_term: 'lotes',
    fbclid: 'FB9',
    [ATTRIBUTION_CAPTURED_AT_KEY]: Date.now() - DAY_MS,
  });
  setGlobal('localStorage', storage);
  setGlobal('window', { location: { search: '' } });
  setGlobal('document', { referrer: '' });

  const attribution = getAttribution();
  assert.equal(attribution.source, 'meta_ads');
  assert.equal(attribution.utms.utm_term, 'lotes');
  assert.equal(attribution.utms.fbclid, 'FB9');
  assert.equal(attribution.model, ATTRIBUTION_MODEL);
  assert.equal(attribution.model, 'last-touch');
  assert.equal(attribution.ttlDays, ATTRIBUTION_TTL_DAYS);
  assert.equal(ATTRIBUTION_TTL_DAYS, 90);
  clearGlobals();
});

test('getAttribution con atribución expirada no sobre-atribuye a ads', () => {
  clearGlobals();
  const storage = makeLocalStorage();
  seedAttribution(storage, {
    gclid: 'GCLID-VIEJO',
    [ATTRIBUTION_CAPTURED_AT_KEY]: Date.now() - 200 * DAY_MS,
  });
  setGlobal('localStorage', storage);
  setGlobal('window', { location: { search: '' } });
  setGlobal('document', { referrer: 'https://www.google.com/' });

  const attribution = getAttribution();
  assert.deepEqual(attribution.utms, {});
  assert.equal(attribution.source, 'referral', 'sin touch vigente la fuente es la real, no google_ads');
  clearGlobals();
});

// ─── tracker único de WhatsApp ──────────────────────────────────────────────

test('resolveWhatsAppComponent usa data-cta cuando existe', () => {
  const link = { dataset: { cta: 'hero' }, closest: () => null };
  assert.equal(resolveWhatsAppComponent(link), 'hero');
});

test('resolveWhatsAppComponent cae a section[id], sticky y unknown', () => {
  const sectionLink = {
    dataset: {},
    closest: (selector) => (selector === 'section[id]' ? { id: 'pricing' } : null),
  };
  assert.equal(resolveWhatsAppComponent(sectionLink), 'pricing');

  const stickyLink = {
    dataset: {},
    classList: { contains: (cls) => cls === 'whatsapp-sticky' },
    closest: () => null,
  };
  assert.equal(resolveWhatsAppComponent(stickyLink), 'sticky');

  assert.equal(resolveWhatsAppComponent({ dataset: {}, closest: () => null }), 'unknown');
  assert.equal(resolveWhatsAppComponent(null), 'unknown');
});

test('un click = un solo click_whatsapp (y el tracker es idempotente)', () => {
  clearGlobals();
  const listeners = [];
  const document = {
    addEventListener: (type, fn, opts) => listeners.push({ type, fn, opts }),
    removeEventListener: () => {},
  };
  const link = {
    dataset: { cta: 'pricing' },
    closest: (selector) => (selector === WHATSAPP_SELECTOR ? link : null),
  };
  const target = { closest: (selector) => (selector === WHATSAPP_SELECTOR ? link : null) };
  const events = [];

  const window = {};
  initWhatsAppTracking({
    document,
    window,
    track: (name, params) => events.push({ name, params }),
    pagePath: '/inmobiliarias',
  });
  // segunda inicialización (p. ej. dos scripts en la misma página) no debe duplicar
  initWhatsAppTracking({
    document,
    window,
    track: (name, params) => events.push({ name, params }),
    pagePath: '/inmobiliarias',
  });

  assert.equal(listeners.length, 1, 'debe haber un único listener delegado');
  assert.equal(listeners[0].opts.capture, true);

  listeners[0].fn({ target });
  assert.equal(events.length, 1);
  assert.equal(events[0].name, 'click_whatsapp');
  assert.equal(events[0].params.component, 'pricing');
  clearGlobals();
});

test('click_whatsapp no duplica la página: solo component (page_path lo pone analytics)', () => {
  const events = [];
  const link = { dataset: { cta: 'sticky' }, closest: () => null };

  trackWhatsAppClick(link, (name, params) => events.push({ name, params }));

  assert.equal(events.length, 1);
  assert.deepEqual(Object.keys(events[0].params), ['component'], 'un solo parámetro de ubicación');
  assert.equal('page' in events[0].params, false);
});

test('el tracker por defecto informa page_path una sola vez', () => {
  clearGlobals();
  const calls = [];
  const listeners = [];
  const document = {
    addEventListener: (type, fn, opts) => listeners.push({ type, fn, opts }),
    removeEventListener: () => {},
  };
  const link = {
    dataset: { cta: 'hero' },
    closest: (selector) => (selector === WHATSAPP_SELECTOR ? link : null),
  };
  const window = { gtag: (...args) => calls.push(args) };

  initWhatsAppTracking({ document, window, pagePath: '/diagnostico' });
  listeners[0].fn({ target: { closest: (selector) => (selector === WHATSAPP_SELECTOR ? link : null) } });

  assert.equal(calls.length, 1);
  const params = calls[0][2];
  assert.equal(params.page_path, '/diagnostico');
  assert.equal('page' in params, false);
  assert.deepEqual(Object.keys(params).sort(), ['component', 'page_path']);
  clearGlobals();
});

test('clicks que no son de WhatsApp no generan eventos', () => {
  const listeners = [];
  const document = {
    addEventListener: (type, fn) => listeners.push({ type, fn }),
    removeEventListener: () => {},
  };
  const events = [];
  initWhatsAppTracking({
    document,
    window: {},
    track: (name) => events.push(name),
  });

  listeners[0].fn({ target: { closest: () => null } });
  assert.deepEqual(events, []);
});
