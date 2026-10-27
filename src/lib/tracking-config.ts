// src/lib/tracking-config.ts
//
// Fuente única de verdad para el host allowlist de GA4 y para el bootstrap
// del tag. Layout.astro renderiza `buildTrackingBootstrap()` como script
// inline en <head>, así que la decisión corre antes de que exista cualquier
// request a googletagmanager.com.
//
// Regla: fuera de la allowlist no se carga la librería de GA4 y no se envía
// ningún hit; en su lugar se emite un warning en consola y un banner visible.

export const GA_MEASUREMENT_ID = 'G-D7E290M8PW';

/** Dominios productivos autorizados a medir. Todo lo demás (previews, alias vercel, localhost) queda bloqueado. */
export const ALLOWED_HOSTS = ['www.wolfim.com', 'wolfim.com'];

export const isAllowedHost = (host?: string | null): boolean =>
  ALLOWED_HOSTS.includes(String(host ?? '').trim().toLowerCase());

export const HOST_WARNING_ID = 'wolfim-tracking-warning';
/** Clase que se agrega al <body> mientras el banner está visible (reserva espacio abajo). */
export const HOST_WARNING_BODY_CLASS = 'wolfim-tracking-warning-active';
/** Id del <style> que desplaza el CTA sticky cuando el banner está visible. */
export const HOST_WARNING_STYLE_ID = 'wolfim-tracking-warning-style';
/** Alto reservado (px) cuando el banner no se puede medir. */
export const HOST_WARNING_FALLBACK_OFFSET = 48;
/** Separación entre el banner y el CTA sticky de WhatsApp (px). */
export const HOST_WARNING_STICKY_GAP = 24;

/**
 * Devuelve el JS del bootstrap de tracking (ES5, sin dependencias).
 * Se ejecuta en <head> y decide entre cargar GA4 o bloquearlo + avisar.
 */
export const buildTrackingBootstrap = (): string => {
  // CSS que desplaza el CTA sticky mientras el banner está visible.
  const warningCss =
    `body.${HOST_WARNING_BODY_CLASS}{padding-bottom:var(--wolfim-warning-offset,${HOST_WARNING_FALLBACK_OFFSET}px);}` +
    `body.${HOST_WARNING_BODY_CLASS} .whatsapp-sticky{bottom:calc(var(--wolfim-warning-offset,${HOST_WARNING_FALLBACK_OFFSET}px) + ${HOST_WARNING_STICKY_GAP}px);}`;

  const config = JSON.stringify({
    measurementId: GA_MEASUREMENT_ID,
    allowedHosts: ALLOWED_HOSTS,
    warningId: HOST_WARNING_ID,
    warningBodyClass: HOST_WARNING_BODY_CLASS,
    warningStyleId: HOST_WARNING_STYLE_ID,
    warningFallbackOffset: HOST_WARNING_FALLBACK_OFFSET,
    warningStickyGap: HOST_WARNING_STICKY_GAP,
    warningCss,
  });

  return [
    '/* GA4 bootstrap con allowlist de hosts (generado desde src/lib/tracking-config.ts) */',
    '(function () {',
    `  var CONFIG = ${config};`,
    "  var host = String(location.hostname || '').toLowerCase();",
    '  var allowed = CONFIG.allowedHosts.indexOf(host) !== -1;',
    '',
    '  window.dataLayer = window.dataLayer || [];',
    "  if (typeof window.gtag !== 'function') {",
    '    window.gtag = function () { window.dataLayer.push(arguments); };',
    '  }',
    '  window.__wolfimTracking = { allowed: allowed, host: host, measurementId: CONFIG.measurementId };',
    '',
    '  if (!allowed) {',
    "    console.warn('[tracking] Host fuera de allowlist: ' + host + '. GA4 deshabilitado: no se enviaran hits.');",
    '',
    '    // El banner se ancla abajo: reserva espacio en el body y sube el CTA',
    '    // sticky de WhatsApp para no taparlo (antes se solapaban 14 px).',
    '    var ensureOffsetStyle = function () {',
    '      if (!document.head || document.getElementById(CONFIG.warningStyleId)) { return; }',
    "      var style = document.createElement('style');",
    '      style.id = CONFIG.warningStyleId;',
    '      style.textContent = CONFIG.warningCss;',
    '      document.head.appendChild(style);',
    '    };',
    '',
    '    var showHostWarning = function () {',
    '      if (!document.body || document.getElementById(CONFIG.warningId)) { return; }',
    '      ensureOffsetStyle();',
    '',
    "      var warning = document.createElement('div');",
    '      warning.id = CONFIG.warningId;',
    "      warning.setAttribute('role', 'status');",
    "      warning.setAttribute('aria-live', 'polite');",
    "      warning.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:2147483647;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;padding:10px 16px;background:#b00020;color:#ffffff;font:600 13px/1.4 system-ui,-apple-system,sans-serif;text-align:center;letter-spacing:0.02em;';",
    '',
    "      var label = document.createElement('span');",
    "      label.textContent = 'Entorno de prueba: analitica desactivada (host ' + host + ').';",
    '      warning.appendChild(label);',
    '',
    "      var dismiss = document.createElement('button');",
    "      dismiss.type = 'button';",
    "      dismiss.setAttribute('aria-label', 'Cerrar aviso de entorno de prueba');",
    "      dismiss.textContent = 'Cerrar';",
    "      dismiss.style.cssText = 'flex:0 0 auto;padding:2px 10px;border:1px solid rgba(255,255,255,0.75);border-radius:999px;background:transparent;color:inherit;font:inherit;line-height:1.2;cursor:pointer;';",
    '      warning.appendChild(dismiss);',
    '',
    '      var setOffset = function (px) {',
    "        document.documentElement.style.setProperty('--wolfim-warning-offset', px + 'px');",
    '        document.body.classList.add(CONFIG.warningBodyClass);',
    '      };',
    '',
    '      document.body.appendChild(warning);',
    '',
    '      var measured = 0;',
    "      if (typeof warning.getBoundingClientRect === 'function') {",
    '        measured = warning.getBoundingClientRect().height || 0;',
    '      }',
    '      setOffset(measured > 0 ? Math.ceil(measured) : CONFIG.warningFallbackOffset);',
    '',
    "      dismiss.addEventListener('click', function () {",
    '        if (warning.parentNode) { warning.parentNode.removeChild(warning); }',
    '        document.body.classList.remove(CONFIG.warningBodyClass);',
    "        document.documentElement.style.removeProperty('--wolfim-warning-offset');",
    '      });',
    '    };',
    '',
    '    if (document.body) { showHostWarning(); }',
    "    else { document.addEventListener('DOMContentLoaded', showHostWarning, { once: true }); }",
    '    return;',
    '  }',
    '',
    "  window.gtag('js', new Date());",
    "  var tag = document.createElement('script');",
    '  tag.async = true;',
    "  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.measurementId;",
    '  document.head.appendChild(tag);',
    "  window.gtag('config', CONFIG.measurementId);",
    '})();',
  ].join('\n');
};
