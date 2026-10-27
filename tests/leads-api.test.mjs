// tests/leads-api.test.mjs
//
// Pruebas del endpoint /api/leads sin red y sin Supabase: se mockea fetch.
// Verifica la atribución (source calculado, utm_term y click ids) y la
// degradación progresiva cuando la tabla todavía no tiene columnas nuevas.

import test from 'node:test';
import assert from 'node:assert/strict';

process.env.SUPABASE_URL = 'https://test-project.supabase.co';
process.env.SUPABASE_ANON_KEY = 'test-anon-key';

const { POST } = await import('../src/pages/api/leads.ts');

const jsonResponse = (body, status = 200) =>
  new Response(typeof body === 'string' ? body : JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const makeRequest = (payload) => ({ json: async () => payload });

/**
 * Mockea fetch con una cola de respuestas y devuelve los bodies enviados.
 */
const mockFetch = (responses) => {
  const sent = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    sent.push({ url: String(url), body: init.body ? JSON.parse(init.body) : null });
    const next = responses.shift();
    if (!next) throw new Error('fetch inesperado: no quedan respuestas mockeadas');
    return next;
  };
  return { sent, restore: () => (globalThis.fetch = original) };
};

const validPayload = {
  name: 'Probe',
  website: 'example.com',
  whatsapp: '3513157202',
};

test('POST /api/leads: 400 cuando faltan campos requeridos', async () => {
  const { sent, restore } = mockFetch([]);
  try {
    const res = await POST({ request: makeRequest({ name: 'solo nombre' }) });
    assert.equal(res.status, 400);
    assert.equal(sent.length, 0, 'no debe llamar a Supabase con payload inválido');
  } finally {
    restore();
  }
});

test('POST /api/leads: persiste utm_term, gclid y un source calculado', async () => {
  const { sent, restore } = mockFetch([jsonResponse({}, 201)]);
  try {
    const res = await POST({
      request: makeRequest({
        ...validPayload,
        utms: {
          utm_source: 'google',
          utm_medium: 'cpc',
          utm_campaign: 'diagnostico',
          utm_term: 'web para inmobiliaria',
          gclid: 'GCLID-TEST',
        },
      }),
    });

    assert.equal(res.status, 200);
    assert.equal(sent.length, 1);

    const body = sent[0].body;
    assert.equal(body.utm_term, 'web para inmobiliaria');
    assert.equal(body.gclid, 'GCLID-TEST');
    assert.equal(body.source, 'google_ads', 'el source debe derivarse del gclid, no ser constante');
    assert.equal(body.utm_source, 'google');
    assert.equal(body.name, 'Probe');
  } finally {
    restore();
  }
});

test('POST /api/leads: respeta un source explícito del cliente', async () => {
  const { sent, restore } = mockFetch([jsonResponse({}, 201)]);
  try {
    await POST({
      request: makeRequest({
        ...validPayload,
        source: 'diagnostico:referral',
        utms: { fbclid: 'FB1' },
      }),
    });
    assert.equal(sent[0].body.source, 'diagnostico:referral');
    assert.equal(sent[0].body.fbclid, 'FB1');
  } finally {
    restore();
  }
});

test('POST /api/leads: si falta la columna utm_term reintenta sin perder el lead', async () => {
  const missingUtmTerm = jsonResponse(
    {
      code: 'PGRST204',
      message: "Could not find the 'utm_term' column of 'leads' in the schema cache",
    },
    400
  );

  const { sent, restore } = mockFetch([missingUtmTerm, jsonResponse({}, 201)]);
  try {
    const res = await POST({
      request: makeRequest({
        ...validPayload,
        utms: { utm_source: 'meta', utm_term: 'lotes' },
      }),
    });

    assert.equal(res.status, 200);
    const payload = await res.json();
    assert.equal(payload.success, true);
    assert.equal(payload.warning, 'optional_columns_missing');

    assert.equal(sent.length, 2, 'debe reintentar una vez');
    assert.ok('utm_term' in sent[0].body);
    assert.equal('utm_term' in sent[1].body, false, 'el reintento no debe mandar la columna inexistente');

    // los datos comerciales no se pierden en el reintento
    assert.equal(sent[1].body.name, 'Probe');
    assert.equal(sent[1].body.website, 'example.com');
    assert.equal(sent[1].body.whatsapp, '3513157202');
    assert.equal(sent[1].body.source, 'utm:meta');
    assert.equal(sent[1].body.utm_source, 'meta');
  } finally {
    restore();
  }
});

test('POST /api/leads: degrade progresivo con varias columnas faltantes', async () => {
  const pgrst = (column) =>
    jsonResponse(
      { code: 'PGRST204', message: `Could not find the '${column}' column of 'leads' in the schema cache` },
      400
    );

  const { sent, restore } = mockFetch([pgrst('status'), pgrst('gclid'), jsonResponse({}, 201)]);
  try {
    const res = await POST({
      request: makeRequest({ ...validPayload, utms: { gclid: 'G1' } }),
    });
    assert.equal(res.status, 200);
    assert.equal(sent.length, 3);
    assert.equal('status' in sent[2].body, false);
    assert.equal('gclid' in sent[2].body, false);
    assert.equal(sent[2].body.source, 'google_ads');
  } finally {
    restore();
  }
});

test('POST /api/leads: error real de base de datos sigue siendo 500', async () => {
  const { sent, restore } = mockFetch([jsonResponse({ message: 'boom' }, 500)]);
  try {
    const res = await POST({ request: makeRequest(validPayload) });
    assert.equal(res.status, 500);
    assert.equal(sent.length, 1, 'no debe reintentar ante errores que no son columnas faltantes');
  } finally {
    restore();
  }
});

// ─── B3: solo se pueden quitar columnas OPTIONAL_COLUMNS ────────────────────

const pgrst204 = (column) =>
  jsonResponse(
    { code: 'PGRST204', message: `Could not find the '${column}' column of 'leads' in the schema cache` },
    400
  );

test('POST /api/leads: una columna requerida reportada NO se elimina del payload (500)', async () => {
  for (const required of ['name', 'website', 'whatsapp', 'source']) {
    const { sent, restore } = mockFetch([pgrst204(required)]);
    try {
      const res = await POST({
        request: makeRequest({ ...validPayload, source: 'direct', utms: { gclid: 'G1' } }),
      });

      assert.equal(res.status, 500, `${required}: no debe degradarse el lead`);
      assert.equal(sent.length, 1, `${required}: no debe reintentar quitando una columna requerida`);
      assert.ok(required in sent[0].body, `${required}: la columna requerida no puede desaparecer del payload`);
      assert.equal(sent[0].body.name, 'Probe');
      assert.equal(sent[0].body.source, 'direct');
    } finally {
      restore();
    }
  }
});

test('POST /api/leads: una columna del payload que no es opcional tampoco se elimina', async () => {
  // utm_campaign existe en el esquema productivo; si faltara, es un problema de
  // tabla, no una degradación aceptable.
  const { sent, restore } = mockFetch([pgrst204('utm_campaign')]);
  try {
    const res = await POST({
      request: makeRequest({ ...validPayload, utms: { utm_source: 'google', utm_campaign: 'x' } }),
    });
    assert.equal(res.status, 500);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].body.utm_campaign, 'x');
  } finally {
    restore();
  }
});

test('POST /api/leads: si repite una columna ya eliminada, degrada la siguiente opcional', async () => {
  const { sent, restore } = mockFetch([pgrst204('utm_term'), pgrst204('utm_term'), jsonResponse({}, 201)]);
  try {
    const res = await POST({
      request: makeRequest({ ...validPayload, utms: { utm_term: 'lotes', gclid: 'G1' } }),
    });

    assert.equal(res.status, 200);
    assert.equal(sent.length, 3);
    assert.equal('utm_term' in sent[2].body, false);
    assert.equal('status' in sent[2].body, false, 'debe degradar la siguiente opcional del payload');
    assert.equal(sent[2].body.gclid, 'G1');
    assert.equal(sent[2].body.name, 'Probe');

    const payload = await res.json();
    assert.equal(payload.warning, 'optional_columns_missing');
  } finally {
    restore();
  }
});
