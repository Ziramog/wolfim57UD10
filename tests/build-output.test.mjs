// tests/build-output.test.mjs
//
// Pruebas sobre el build real (.vercel/output/static). Requieren haber corrido
// `npm run build` antes. Verifican lo que efectivamente se sirve: CTA + canal
// email del home, allowlist en el tag GA4, banner de host que no tapa el CTA
// sticky, canonical/hreflang/sitemap en el host canónico (www) y un único
// tracker de WhatsApp.
//
// IMPORTANTE: si falta el build, este archivo FALLA en vez de saltearse
// (nit 6 de la revisión 2026-10-27). Un `npm test` verde sin build era un
// falso positivo: 24 pass / 8 skipped en un clon limpio.

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, '.vercel', 'output', 'static');
const SITE_ORIGIN = 'https://www.wolfim.com';

const built = existsSync(path.join(OUT, 'index.html'));

if (!built) {
  // Falla en duro y con instrucciones: no hay skip posible.
  throw new Error(
    `Faltan los tests de build: no existe ${OUT} (o no tiene index.html).\n` +
      'Corré `npm run build` y volvé a correr `npm test`.\n' +
      'Estos tests no se saltean a propósito: un verde sin build no prueba nada.'
  );
}

const readOut = (rel) => readFile(path.join(OUT, rel), 'utf8');

const readPage = async (route) => {
  const candidates = [path.join(route, 'index.html'), route];
  for (const candidate of candidates) {
    const full = path.join(OUT, candidate);
    if (existsSync(full)) return readFile(full, 'utf8');
  }
  throw new Error(`no encuentro el HTML de ${route}`);
};

const canonicalOf = (html) => {
  const match = html.match(/<link rel="canonical" href="([^"]+)"/);
  return match ? match[1] : null;
};

const hreflangsOf = (html) =>
  [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => ({
    lang: m[1],
    href: m[2],
  }));

test('build: existe el output de Vercel', () => {
  assert.ok(existsSync(path.join(OUT, 'index.html')));
});

// ─── home: formulario muerto reemplazado por CTA ────────────────────────────

test('home V7: brief general real y diagnóstico especializado separado', async () => {
  const html = await readPage('index.html');
  assert.equal(html.includes('id="contact-form"'), false, 'el viejo formulario sin handler no debe regresar');
  assert.equal(/<form[^>]*action="#" method="POST"/.test(html), false, 'ningún formulario debe postear a /');
  assert.match(html, /id="v7-contact-form"/, 'el brief comercial debe estar presente');
  assert.match(html, /id="v7-model"/);
  assert.match(html, /id="v7-challenge"/);
  assert.match(html, /href="\/diagnostico"/, 'se conserva el diagnóstico web especializado');
  const source = await readFile(path.join(ROOT, 'src', 'components', 'MethodContactV7.astro'), 'utf8');
  assert.match(source, /window\.location\.assign\('https:\/\/wa\.me\//, 'el brief debe preparar WhatsApp en un evento real de submit');
  assert.doesNotMatch(source, /fetch\('\/api\/leads/, 'el brief general no debe enviarse a un backend que solo acepta web');
});

test('home V7: email alternativo y CTA de diagnóstico conservados', async () => {
  const html = await readPage('index.html');
  assert.match(html, /href="mailto:juan@wolfim\.com[^"]*"/, 'debe mantenerse email público');
  assert.match(html, /id="contact-email"/, 'email secundario identificable');
  assert.match(html, /id="contact-cta-diagnostico"/, 'conservar instrumentación del diagnóstico web');
  assert.match(html, /Abriremos WhatsApp con tu mensaje preparado/, 'el visitante debe saber que el envío final depende de él');
});

test('home V7: todos los enlaces directos a WhatsApp tienen data-cta', async () => {
  const html = await readPage('index.html');
  const links = [...html.matchAll(/<a\b[^>]*href="https:\/\/wa\.me\/[^"]*"[^>]*>/g)].map(m=>m[0]);
  assert.ok(links.length >= 5, `se esperan rutas comerciales B2B/B2C/mixto y WhatsApp, encontrados: ${links.length}`);
  assert.deepEqual(links.filter(tag=>!/data-cta="/.test(tag)),[], 'todos los links deben etiquetar el componente');
});

// ─── GA4: allowlist de hosts + banner que no tapa el sticky ─────────────────

test('GA4: el tag no se sirve como script estático y el bootstrap trae allowlist', async () => {
  const pages = ['index.html', 'diagnostico/index.html', 'inmobiliarias/index.html'];

  for (const page of pages) {
    const html = await readPage(page);

    assert.equal(
      /<script[^>]*src="https:\/\/www\.googletagmanager\.com/.test(html),
      false,
      `${page}: el tag de GA4 no debe cargarse incondicionalmente desde el HTML`
    );
    assert.match(html, /"www\.wolfim\.com","wolfim\.com"/, `${page}: falta la allowlist de hosts`);
    assert.match(html, /__wolfimTracking/, `${page}: falta el estado de tracking para gatear eventos`);
    assert.match(html, /wolfim-tracking-warning/, `${page}: falta el warning visible para hosts no permitidos`);
  }
});

test('GA4: el banner de host reserva espacio y desplaza el CTA sticky', async () => {
  const html = await readPage('index.html');

  assert.match(html, /wolfim-tracking-warning-active/, 'falta la clase que marca el banner activo');
  assert.match(html, /--wolfim-warning-offset/, 'falta la variable de altura del banner');
  assert.match(
    html,
    /\.whatsapp-sticky\{bottom:calc\(var\(--wolfim-warning-offset/,
    'el CTA sticky debe subir para no quedar tapado por el banner'
  );
  assert.match(html, /padding-bottom:var\(--wolfim-warning-offset/, 'el body debe reservar el espacio del banner');
});

// ─── canonical / hreflang / sitemap en el host canónico (www) ──────────────

test('SEO: canonical propio por página y hreflang consistente en https://www', async () => {
  const expectations = {
    'index.html': `${SITE_ORIGIN}/`,
    'diagnostico/index.html': `${SITE_ORIGIN}/diagnostico`,
    'Juan_Design_CV/index.html': `${SITE_ORIGIN}/Juan_Design_CV`,
  };

  for (const [page, expected] of Object.entries(expectations)) {
    const html = await readPage(page);
    assert.equal(canonicalOf(html), expected, `${page}: canonical incorrecto`);

    const alternates = hreflangsOf(html);
    const es = alternates.find((a) => a.lang === 'es');
    const fallback = alternates.find((a) => a.lang === 'x-default');
    assert.ok(es && fallback, `${page}: faltan hreflang es/x-default`);
    assert.equal(es.href, expected, `${page}: hreflang es debe apuntar a la propia página`);
    assert.equal(fallback.href, expected, `${page}: hreflang x-default debe apuntar a la propia página`);
    assert.equal(html.includes('?lang=en'), false, `${page}: no debe declarar una versión en inglés inexistente`);
    assert.equal(
      html.includes('https://wolfim.com/'),
      false,
      `${page}: el apex redirige 308, las URLs absolutas deben usar www`
    );
  }

  // /inmobiliarias queda fuera de la normalización a propósito: su archivo está
  // protegido (rediseño no commiteado) y hoy declara canonical/ogImage con el
  // apex. Sigue teniendo canonical propio por página, que es lo que este test
  // puede garantizar sin tocar ese archivo.
  const inmo = await readPage('inmobiliarias/index.html');
  assert.equal(canonicalOf(inmo), 'https://wolfim.com/inmobiliarias', 'inmobiliarias: canonical propio');
  const inmoAlternates = hreflangsOf(inmo);
  assert.ok(inmoAlternates.some((a) => a.lang === 'es'), 'inmobiliarias: falta hreflang es');
  assert.ok(inmoAlternates.some((a) => a.lang === 'x-default'), 'inmobiliarias: falta x-default');
});

test('SEO: sitemap en https://www y con las tres URLs', async () => {
  const sitemap = await readOut('sitemap.xml');

  assert.match(sitemap, /<loc>https:\/\/www\.wolfim\.com\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/www\.wolfim\.com\/diagnostico<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/www\.wolfim\.com\/inmobiliarias<\/loc>/);
  assert.equal(
    /<loc>https:\/\/wolfim\.com/.test(sitemap),
    false,
    'el sitemap no debe apuntar al apex que redirige'
  );
});

// ─── un solo tracker de WhatsApp ───────────────────────────────────────────

const assetsDir = () => path.join(OUT, '_astro');

const loadChunks = async () => {
  const dir = assetsDir();
  const files = (await readdir(dir)).filter((f) => f.endsWith('.js'));
  assert.ok(files.length > 0, 'no hay bundles JS en el build');
  const contents = new Map();
  for (const file of files) contents.set(file, await readFile(path.join(dir, file), 'utf8'));
  return contents;
};

/** Chunks alcanzables desde el module script de una página (dos niveles de imports). */
const chunksOfPage = async (page, contents) => {
  const html = await readPage(page);
  const entries = [...html.matchAll(/<script[^>]*type="module"[^>]*src="\/_astro\/([^"]+)"/g)].map((m) => m[1]);
  assert.ok(entries.length > 0, `${page}: no encuentro el module script`);

  const seen = new Set(entries);
  const collectImports = (code) => {
    for (const match of code.matchAll(/(?:from\s*|import\s*)"\.\/([A-Za-z0-9_.-]+\.js)"/g)) {
      if (!seen.has(match[1])) seen.add(match[1]);
    }
  };
  for (const entry of entries) if (contents.has(entry)) collectImports(contents.get(entry));
  for (const chunk of [...seen]) if (contents.has(chunk)) collectImports(contents.get(chunk));
  return [...seen];
};

test('WhatsApp: home y /diagnostico cargan un único tracker de WhatsApp', async () => {
  const contents = await loadChunks();

  for (const page of ['index.html', 'diagnostico/index.html']) {
    const chunks = await chunksOfPage(page, contents);
    const trackers = chunks.filter((chunk) => contents.has(chunk) && contents.get(chunk).includes('click_whatsapp'));

    assert.equal(trackers.length, 1, `${page}: debe haber un solo tracker, encontrados: ${trackers.join(', ') || 'ninguno'}`);
    assert.match(trackers[0], /^whatsapp-tracking\./, `${page}: el tracker debe ser el módulo compartido`);
  }
});

test('WhatsApp: el evento emitido no duplica la página (sin parámetro page)', async () => {
  const contents = await loadChunks();
  const tracker = [...contents.entries()].find(([file]) => file.startsWith('whatsapp-tracking.'));

  assert.ok(tracker, 'no encuentro el bundle whatsapp-tracking.*.js');
  const [file, code] = tracker;
  assert.equal(code.includes('page:'), false, `${file}: no debe mandar el parámetro page (ya existe page_path)`);
  assert.match(code, /page_path/, `${file}: el tracker por defecto debe informar page_path una sola vez`);
});

test('WhatsApp: legacy script.js no instala trackers extra y mantiene pricing observer aislado', async () => {
  const source = await readFile(path.join(ROOT,'src','scripts','script.js'),'utf8');
  assert.doesNotMatch(source, /trackEvent\s*\(\s*['"]click_whatsapp['"]/, 'el script de navegación no debe emitir el evento click_whatsapp');
  assert.doesNotMatch(source, /querySelectorAll\([^)]*wa\.me/, 'el script de navegación no debe instalar listeners para links de WhatsApp');
  assert.match(source,/digital360Observer\.unobserve\(entry\.target\)/,'solo una visualización 360° por carga');
});

// ─── guardas de fuente (semántica de eventos) ───────────────────────────────

test('view_digital360: mide el título real, nunca una ancla antigua de precios', async () => {
  const source = await readFile(path.join(ROOT, 'src', 'scripts', 'script.js'), 'utf8');
  assert.match(source, /getElementById\("wolfim-v8-360-heading"\)/);
  assert.match(source, /digital360Observer\.unobserve\(entry\.target\)/);
  assert.match(source, /if \(!entry\.isIntersecting \|\| digital360Viewed\) return;/);
  assert.match(source, /trackEvent\("view_digital360"/);
  assert.doesNotMatch(source, /trackEvent\(['"]view_pricing['"]/);
});

test('diagnóstico: el evento se emite después de res.ok y existe form_error', async () => {
  const source = await readFile(path.join(ROOT, 'src', 'pages', 'diagnostico.astro'), 'utf8');

  const okIndex = source.indexOf('if (!res.ok)');
  const eventIndex = source.indexOf("trackEvent('form_submit_diagnostico'");
  const errorIndex = source.indexOf("trackEvent('form_error'");

  assert.ok(okIndex > -1 && eventIndex > -1 && errorIndex > -1, 'faltan las guardas del submit');
  assert.ok(eventIndex > okIndex, 'form_submit_diagnostico debe emitirse recién después de validar res.ok');
  assert.equal(source.includes("source: 'meta_diagnostico'"), false, 'el source ya no puede ser constante');
});

test('atribución: TTL de 90 días declarado en el módulo', async () => {
  const source = await readFile(path.join(ROOT, 'src', 'lib', 'utm.ts'), 'utf8');

  assert.match(source, /ATTRIBUTION_TTL_DAYS = 90/);
  assert.match(source, /ATTRIBUTION_MODEL = 'last-touch'/);
  assert.match(source, /captured_at/);
});
