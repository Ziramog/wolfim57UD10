export const prerender = false;

import type { APIRoute } from 'astro';

type RuntimeGlobal = typeof globalThis & {
  process?: {
    env?: Record<string, string | undefined>;
  };
};

type Utms = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  msclkid?: string | null;
};

type LeadPayload = {
  name?: string;
  website?: string;
  whatsapp?: string;
  source?: string;
  utms?: Utms;
};

const json = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const sanitize = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const getSupabaseEnv = () => {
  const runtimeEnv = (globalThis as RuntimeGlobal).process?.env;

  // import.meta.env existe en el build de Astro/Vercel; el fallback a {} permite
  // importar este módulo desde Node (tests) sin romper el arranque.
  const viteEnv = (import.meta as any).env || {};

  return {
    url: viteEnv.SUPABASE_URL || runtimeEnv?.SUPABASE_URL,
    key: viteEnv.SUPABASE_ANON_KEY || runtimeEnv?.SUPABASE_ANON_KEY,
  };
};

// Columnas que pueden no existir todavía en la tabla productiva. Si Supabase
// responde PGRST204 por alguna de ellas, se reintenta sin esa columna: nunca se
// pierde el lead y no hace falta migrar el esquema antes de desplegar.
const OPTIONAL_COLUMNS = ['status', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'msclkid'] as const;

const isOptionalColumn = (column: string): column is (typeof OPTIONAL_COLUMNS)[number] =>
  (OPTIONAL_COLUMNS as readonly string[]).includes(column);

const findMissingOptionalColumn = (
  status: number,
  body: string,
  payload: Record<string, unknown>
): string | null => {
  if (status !== 400 || !body.includes('PGRST204')) return null;

  // El `unshift` solo acepta columnas de OPTIONAL_COLUMNS (B3 de la revisión
  // 2026-10-27). Si PostgREST reportara una columna requerida (name, source,
  // website, whatsapp) NO se degrada el payload: se devuelve null y el endpoint
  // responde 500, en vez de guardar un lead sin canal o sin datos de contacto.
  const reported = (body.match(/'([a-z_]+)' column/i)?.[1] || '').toLowerCase();
  const candidates: string[] = [];

  if (reported && !isOptionalColumn(reported)) {
    // Columna requerida reportada por PostgREST: no hay degradación posible sin
    // corromper el lead, así que se corta acá (el endpoint responde 500).
    console.warn(
      `[API] PGRST204 por columna no opcional ('${reported}'): no se degrada el payload.`
    );
    return null;
  }
  if (reported) candidates.push(reported);

  for (const column of OPTIONAL_COLUMNS) {
    if (!candidates.includes(column)) candidates.push(column);
  }

  for (const column of candidates) {
    if (column in payload) return column;
  }

  return null;
};

// Canal real del lead cuando el cliente no manda `source` (o manda uno vacío).
const deriveSource = (utms: Utms): string => {
  if (utms.gclid) return 'google_ads';
  if (utms.fbclid) return 'meta_ads';
  if (utms.msclkid) return 'microsoft_ads';

  const source = (utms.utm_source || '').trim().toLowerCase();
  const medium = (utms.utm_medium || '').trim().toLowerCase();
  if (source) return medium ? `utm:${source}:${medium}` : `utm:${source}`;

  return 'direct';
};

const insertLead = async (supabaseUrl: string, supabaseKey: string, lead: Record<string, unknown>) => {
  return fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(lead),
  });
};

export const POST: APIRoute = async ({ request }) => {
  const { url: supabaseUrl, key: supabaseKey } = getSupabaseEnv();

  if (!supabaseUrl || !supabaseKey) {
    return json({ error: 'Supabase not configured' }, 500);
  }

  try {
    const body = (await request.json()) as LeadPayload;
    const name = sanitize(body.name);
    const website = sanitize(body.website);
    const whatsapp = sanitize(body.whatsapp);
    const utms = body.utms || {};
    const source = sanitize(body.source) || deriveSource(utms);

    if (!name || !website || !whatsapp) {
      return json({ error: 'Missing required fields' }, 400);
    }

    const payload: Record<string, unknown> = {
      name,
      website,
      whatsapp,
      source,
      status: 'new',
      created_at: new Date().toISOString(),
      utm_source: utms.utm_source || null,
      utm_medium: utms.utm_medium || null,
      utm_campaign: utms.utm_campaign || null,
      utm_content: utms.utm_content || null,
      utm_term: utms.utm_term || null,
      gclid: utms.gclid || null,
      fbclid: utms.fbclid || null,
      msclkid: utms.msclkid || null,
    };

    // Insert con degradación progresiva: si la tabla todavía no tiene alguna
    // columna opcional (status, utm_content, utm_term, gclid, fbclid, msclkid),
    // Supabase responde PGRST204 y se reintenta sin esa columna.
    let strippedColumns = 0;

    for (let attempt = 0; attempt <= OPTIONAL_COLUMNS.length; attempt++) {
      const res = await insertLead(supabaseUrl, supabaseKey, payload);

      if (res.ok) {
        return json(
          strippedColumns > 0 ? { success: true, warning: 'optional_columns_missing' } : { success: true },
          200
        );
      }

      const errorBody = await res.text();
      const missingColumn = findMissingOptionalColumn(res.status, errorBody, payload);

      if (!missingColumn) {
        console.error('[API] Supabase error:', errorBody);
        return json({ error: 'Database error' }, 500);
      }

      delete payload[missingColumn];
      strippedColumns += 1;
    }

    console.error('[API] Supabase error: too many missing optional columns');
    return json({ error: 'Database error' }, 500);
  } catch (err) {
    console.error('[API] Error:', err);
    return json({ error: 'Internal server error' }, 500);
  }
};
