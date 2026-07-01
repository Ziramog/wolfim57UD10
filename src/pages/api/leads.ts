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
};

type LeadPayload = {
  name?: string;
  website?: string;
  whatsapp?: string;
  source?: string;
  utms?: Utms;
};

type LeadInsert = {
  name: string;
  website: string;
  whatsapp: string;
  source: string;
  created_at: string;
  status?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
};

const json = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const sanitize = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const getSupabaseEnv = () => {
  const runtimeEnv = (globalThis as RuntimeGlobal).process?.env;

  return {
    url: import.meta.env.SUPABASE_URL || runtimeEnv?.SUPABASE_URL,
    key: import.meta.env.SUPABASE_ANON_KEY || runtimeEnv?.SUPABASE_ANON_KEY,
  };
};

const isMissingOptionalColumnError = (status: number, body: string) => {
  return (
    status === 400 &&
    body.includes('PGRST204') &&
    (body.includes("'status'") || body.includes("'utm_content'"))
  );
};

const insertLead = async (supabaseUrl: string, supabaseKey: string, lead: LeadInsert) => {
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
    const source = sanitize(body.source) || 'meta_diagnostico';
    const utms = body.utms || {};

    if (!name || !website || !whatsapp) {
      return json({ error: 'Missing required fields' }, 400);
    }

    const leadWithOptionalColumns: LeadInsert = {
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
    };

    const res = await insertLead(supabaseUrl, supabaseKey, leadWithOptionalColumns);

    if (res.ok) {
      return json({ success: true }, 200);
    }

    const errorBody = await res.text();

    // Backward-compatible fallback: current production table may not have status/utm_content yet.
    // This keeps lead capture working while the SQL migration is applied.
    if (isMissingOptionalColumnError(res.status, errorBody)) {
      const leadWithoutOptionalColumns: LeadInsert = {
        name,
        website,
        whatsapp,
        source,
        created_at: leadWithOptionalColumns.created_at,
        utm_source: leadWithOptionalColumns.utm_source,
        utm_medium: leadWithOptionalColumns.utm_medium,
        utm_campaign: leadWithOptionalColumns.utm_campaign,
      };

      const retryRes = await insertLead(supabaseUrl, supabaseKey, leadWithoutOptionalColumns);

      if (retryRes.ok) {
        return json({ success: true, warning: 'optional_columns_missing' }, 200);
      }

      console.error('[API] Supabase retry error:', await retryRes.text());
      return json({ error: 'Database error' }, 500);
    }

    console.error('[API] Supabase error:', errorBody);
    return json({ error: 'Database error' }, 500);
  } catch (err) {
    console.error('[API] Error:', err);
    return json({ error: 'Internal server error' }, 500);
  }
};
