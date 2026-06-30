export const prerender = false;

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

export const POST: APIRoute = async ({ request }) => {
  if (!supabaseUrl || !supabaseKey) {
    return new Response(
      JSON.stringify({ error: 'Supabase not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const body = await request.json();
    const { name, website, whatsapp, source, utms } = body;

    // Validate required fields
    if (!name || !website || !whatsapp) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insert into leads table
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name: name.trim(),
          website: website.trim(),
          whatsapp: whatsapp.trim(),
          source: source || 'meta_ads_diagnostico',
          utm_source: utms?.utm_source || null,
          utm_medium: utms?.utm_medium || null,
          utm_campaign: utms?.utm_campaign || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('[API] Supabase error:', error);
      return new Response(
        JSON.stringify({ error: 'Database error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[API] Error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
