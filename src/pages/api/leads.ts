export const prerender = false;

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

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

const isMissingOptionalColumnError = (error: { code?: string; message?: string } | null) => {
  if (!error) return false;
  return (
    error.code === 'PGRST204' &&
    (error.message?.includes("'status'") || error.message?.includes("'utm_content'"))
  );
};

export const POST: APIRoute = async ({ request }) => {
  if (!supabaseUrl || !supabaseKey) {
    return json({ error: 'Supabase not configured' }, 500);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

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

    const { error } = await supabase.from('leads').insert(leadWithOptionalColumns);

    if (!error) {
      return json({ success: true }, 200);
    }

    // Backward-compatible fallback: current production table may not have status/utm_content yet.
    // This keeps lead capture working while the SQL migration is applied.
    if (isMissingOptionalColumnError(error)) {
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

      const { error: retryError } = await supabase.from('leads').insert(leadWithoutOptionalColumns);

      if (!retryError) {
        return json({ success: true, warning: 'optional_columns_missing' }, 200);
      }

      console.error('[API] Supabase retry error:', retryError);
      return json({ error: 'Database error' }, 500);
    }

    console.error('[API] Supabase error:', error);
    return json({ error: 'Database error' }, 500);
  } catch (err) {
    console.error('[API] Error:', err);
    return json({ error: 'Internal server error' }, 500);
  }
};
