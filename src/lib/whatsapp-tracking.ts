// src/lib/whatsapp-tracking.ts
//
// Único tracker de clicks de WhatsApp del sitio.
// Un listener delegado en document (fase capture) evita los duplicados que
// producían el listener genérico de script.js y los listeners por elemento de
// index.astro / diagnostico.astro.
//
// El `component` se resuelve explícitamente: data-cta del link, luego
// [data-wa-component], luego la clase del botón sticky, luego section[id].

export const WHATSAPP_SELECTOR = 'a[href*="wa.me"]';
export const STICKY_CLASS = 'whatsapp-sticky';
export const UNKNOWN_COMPONENT = 'unknown';
const INIT_FLAG = '__wolfimWhatsAppTrackerReady';

type TrackFn = (name: string, params?: Record<string, any>) => void;

const readDataCta = (link: any): string | null => {
  if (!link) return null;
  if (link.dataset && link.dataset.cta) return String(link.dataset.cta);
  if (typeof link.getAttribute === 'function') {
    const value = link.getAttribute('data-cta');
    if (value) return value;
  }
  return null;
};

const closestMatch = (link: any, selector: string) => {
  if (!link || typeof link.closest !== 'function') return null;
  try {
    return link.closest(selector);
  } catch {
    return null;
  }
};

export const resolveWhatsAppComponent = (link: any): string => {
  const explicit = readDataCta(link);
  if (explicit) return explicit;

  const wrapper = closestMatch(link, '[data-wa-component]');
  if (wrapper && typeof wrapper.getAttribute === 'function') {
    const value = wrapper.getAttribute('data-wa-component');
    if (value) return value;
  }

  if (link && link.classList && typeof link.classList.contains === 'function' && link.classList.contains(STICKY_CLASS)) {
    return 'sticky';
  }

  const section = closestMatch(link, 'section[id]');
  if (section && section.id) return section.id;

  return UNKNOWN_COMPONENT;
};

export const trackWhatsAppClick = (link: any, track: TrackFn): void => {
  // Solo `component`: `page_path` lo agrega analytics.trackEvent. Antes este
  // módulo mandaba `page` y analytics `page_path`, duplicando el mismo dato en
  // cada click_whatsapp (nit 1 de la revisión 2026-10-27).
  track('click_whatsapp', {
    component: resolveWhatsAppComponent(link),
  });
};

const currentPagePath = (): string | undefined =>
  typeof location !== 'undefined' && location ? location.pathname : undefined;

/**
 * Instala el tracker delegado. Idempotente: una segunda llamada no agrega
 * otro listener. Devuelve una función para desinstalarlo (tests).
 */
export const initWhatsAppTracking = (
  options: { document?: any; track?: TrackFn; pagePath?: string; window?: any } = {}
): (() => void) => {
  const doc = options.document || (typeof document !== 'undefined' ? document : null);
  const win = options.window || (typeof window !== 'undefined' ? (window as any) : null);
  const track: TrackFn =
    options.track ||
    ((name: string, params?: Record<string, any>) => {
      if (!win || typeof win.gtag !== 'function') return;
      // El tracker por defecto también informa la página, una sola vez.
      win.gtag('event', name, { page_path: options.pagePath || currentPagePath(), ...params });
    });

  if (!doc || typeof doc.addEventListener !== 'function') return () => {};

  if (win && win[INIT_FLAG]) return () => {};
  if (win) win[INIT_FLAG] = true;

  const handler = (event: any) => {
    const target = event && event.target;
    const link = target && typeof target.closest === 'function' ? closestMatch(target, WHATSAPP_SELECTOR) : null;
    if (!link) return;
    trackWhatsAppClick(link, track);
  };

  doc.addEventListener('click', handler, { capture: true });

  return () => {
    if (typeof doc.removeEventListener === 'function') {
      doc.removeEventListener('click', handler, { capture: true });
    }
    if (win) win[INIT_FLAG] = false;
  };
};
