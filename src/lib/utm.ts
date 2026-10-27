// src/lib/utm.ts
//
// Atribución de campaña en cliente.
// - Captura los 5 UTMs + click ids de las tres plataformas de ads.
// - Calcula un `source` real (antes el lead se guardaba siempre como
//   'meta_diagnostico', sin importar de dónde venía).
// - Modelo de atribución: LAST TOUCH con ventana explícita de 90 días
//   (decisión de la revisión 2026-10-27, B4). Un touch nuevo —una URL con UTMs
//   o click ids— reemplaza al anterior y sella `captured_at`; pasado el TTL la
//   atribución se descarta y el lead vuelve a `direct`/`referral`. Sin esto un
//   gclid de una campaña vieja seguía ganando para siempre y sobre-atribuía a
//   Google Ads.
// - No cambia el esquema de la tabla: los click ids y utm_term viajan en el
//   payload y la API los persiste solo si las columnas existen.

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const CLICK_ID_KEYS = ['gclid', 'fbclid', 'msclkid'];
const STORAGE_KEY = 'wolfim_utms';

/** Días que vale un touch de campaña antes de considerarse expirado. */
export const ATTRIBUTION_TTL_DAYS = 90;
/** TTL en milisegundos (derivado, para tests y reportes). */
export const ATTRIBUTION_TTL_MS = ATTRIBUTION_TTL_DAYS * 24 * 60 * 60 * 1000;
/** Modelo declarado por escrito (no first-touch). */
export const ATTRIBUTION_MODEL = 'last-touch';
/** Campo donde se sella la fecha del touch (epoch ms). */
export const ATTRIBUTION_CAPTURED_AT_KEY = 'captured_at';

export type Attribution = Record<string, string>;
/** Registro persistido: los campos de atribución (strings) + el sello temporal. */
type StoredAttribution = { [key: string]: string | number | undefined };

const readParam = (params: URLSearchParams, key: string) => {
  const value = params.get(key);
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
};

const writeStorage = (value: StoredAttribution) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (error) {
    console.warn('[UTM] No se pudo persistir la atribución', error);
  }
};

const removeStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage no disponible: nada que limpiar
  }
};

/**
 * Lee el registro crudo y decide si sigue vigente.
 * - Sin `captured_at` (registros previos al TTL): se considera expirado, porque
 *   no hay forma de saber su antigüedad y son justamente los que se volvían
 *   eternos.
 * - `captured_at` en el futuro o más viejo que el TTL: expirado.
 */
const readRecord = (): StoredAttribution | null => {
  if (typeof window === 'undefined') return null;

  let parsed: any;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    parsed = JSON.parse(stored);
  } catch (error) {
    console.error('Error reading UTMs from localStorage', error);
    return null;
  }

  if (!parsed || typeof parsed !== 'object') return null;

  const capturedAt = Number(parsed[ATTRIBUTION_CAPTURED_AT_KEY]);
  const age = Date.now() - capturedAt;
  const isFresh =
    Number.isFinite(capturedAt) && Number.isFinite(age) && age >= 0 && age <= ATTRIBUTION_TTL_MS;

  if (!isFresh) {
    removeStorage();
    return null;
  }

  const record = { [ATTRIBUTION_CAPTURED_AT_KEY]: capturedAt } as StoredAttribution;
  [...UTM_KEYS, ...CLICK_ID_KEYS].forEach((key) => {
    const value = parsed[key];
    if (typeof value === 'string' && value.trim()) record[key] = value.trim();
  });

  return record;
};

export const captureUTMs = () => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const touch: Attribution = {};

  UTM_KEYS.forEach((key) => {
    const value = readParam(params, key);
    if (value) touch[key] = value;
  });
  CLICK_ID_KEYS.forEach((key) => {
    const value = readParam(params, key);
    if (value) touch[key] = value;
  });

  // Los click ids pueden venir solos (Google Ads sin UTMs, Meta sin UTMs).
  // Navegación interna sin parámetros = no es un touch nuevo: el registro
  // vigente se conserva hasta que expire.
  if (Object.keys(touch).length === 0) return;

  // Last touch: reemplaza el registro anterior (no se mezclan campañas) y se
  // sella la fecha, que es lo que habilita la expiración a los 90 días.
  const record: StoredAttribution = { ...touch, [ATTRIBUTION_CAPTURED_AT_KEY]: Date.now() };
  writeStorage(record);
  console.log(`[UTM] Touch capturado (${ATTRIBUTION_MODEL}, TTL ${ATTRIBUTION_TTL_DAYS}d)`, touch);
};

export const getUTMs = (): Attribution => {
  const record = readRecord();
  if (!record) return {};

  const clean: Attribution = {};
  [...UTM_KEYS, ...CLICK_ID_KEYS].forEach((key) => {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) clean[key] = value.trim();
  });
  return clean;
};

/**
 * Canal real del lead. Valores estables para reportes:
 * google_ads | meta_ads | microsoft_ads | utm:<source>[:<medium>] | referral | direct
 */
export const computeSource = (attribution: Attribution = {}, referrer?: string): string => {
  if (attribution.gclid) return 'google_ads';
  if (attribution.fbclid) return 'meta_ads';
  if (attribution.msclkid) return 'microsoft_ads';

  const source = (attribution.utm_source || '').trim().toLowerCase();
  const medium = (attribution.utm_medium || '').trim().toLowerCase();
  if (source) return medium ? `utm:${source}:${medium}` : `utm:${source}`;

  if (referrer) {
    try {
      const host = new URL(referrer).hostname.toLowerCase();
      if (host && !/(^|\.)wolfim\.com$/.test(host)) return 'referral';
    } catch {
      // referrer inválido: se ignora
    }
  }

  return 'direct';
};

export const getAttribution = () => {
  const utms = getUTMs();
  const referrer = typeof document !== 'undefined' ? document.referrer : '';
  return {
    utms,
    source: computeSource(utms, referrer),
    model: ATTRIBUTION_MODEL,
    ttlDays: ATTRIBUTION_TTL_DAYS,
  };
};
