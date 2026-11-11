# WOLFIM / 57UD10 — Auditoría de conversiones V10

Fecha: 11 de noviembre de 2026
Rama de corrección: `fix/wolfim-conversions-20261111`
Origen: V9 en producción, commit `5ffc429`.
Estado: QA local completado; subir a Vercel Preview, sin publicación automática a `main`.

## 1. Evidencia comprobada en producción

**Google Analytics 4**
- `www.wolfim.com` habilita GA4 con ID `G-D7E290M8PW`.
- Chrome detectó carga de `googletagmanager.com/gtag/js` y solicitud real `www.google-analytics.com/g/collect`.
- El CTA principal «Contanos tu desafío» generó exactamente un `click_whatsapp` con `component=hero_v6_challenge` y un `contact_cta_click` con `component=home_hero_v6`.
- La prueba del clic se hizo con recolección de GA4 bloqueada para el evento sintético; no se inició ninguna conversación de WhatsApp ni se creó un lead.
- Esto **no confirma** recepción ni configuración como key events dentro de la propiedad GA4. Hace falta acceso autorizado a GA4 para verificar Realtime, DebugView y parámetros.

**Canales**
- El hero enlaza a `https://wa.me/5493513157202` con texto de apertura.
- El contacto comercial usa un brief (B2B/B2C/mixto y descripción) que genera un mensaje de WhatsApp: NO almacena en Supabase.
- La alternativa de email es `mailto:juan@wolfim.com`; se verificó el destino HTML, NO la recepción del buzón.
- `/diagnostico` presenta campos de nombre, web y teléfono y tiene ruta alternativa a WhatsApp si falla API.
- Se verificó HTTP 200 para homepage y diagnóstico, y HTTP 400 en POST incompleto a `/api/leads`.

## 2. Cambios realizados (solo rama de Preview)

**Medición**
- Eliminado evento `view_pricing` residual, que podía informar visitas a precios inexistentes sobre el ancla legacy `#pricing`.
- Nuevo evento `view_digital360` en el heading real `#wolfim-v8-360-heading`, una vez por carga y al menos 50% visible.
- Chrome local: una emisión incluso al repetir el scroll, tanto 390×844 como 1440×900. `view_pricing` no se disparó. Sin excepciones JS.

**Calidad de datos / API**
- `/api/leads` rechaza sitios con esquemas no HTTP(S), dominios mal formados o URLs con credenciales.
- Rechaza teléfonos con caracteres prohibidos o dígitos fuera del rango 8–15; limita nombre a 120 caracteres.
- Normaliza campos UTM no textuales, recorta los largos a 200 caracteres y limita `source` a 150 caracteres.
- La landing hace validación paralela de URL y teléfono antes de intentar registrar.
- No se alteraron las columnas, la atribución last-touch ni la semántica de `form_submit_diagnostico` (solo tras respuesta positiva real).

## 3. Pruebas

- `npm run build`: PASS, Astro 7 / Node.js 24.
- `npm test`: 81 / 81 PASS.
- Navegador local: evento `view_digital360` una vez por sesión de página en desktop y móvil, sin evento ficticio de precios.
- API local: URL inválida = 400; teléfono inválido = 400; payload incompleto = 400; payload válido sin credenciales locales = 503 (no se escribió en ninguna tabla).
- No se enviaron formularios reales con números de cliente ni se crearon registros falsos.

## 4. Dependencias pendientes para cerrar el circuito

1. **Supabase**: conectar cuenta autorizada, identificar proyecto que recibe los leads de WOLFIM y comprobar los registros/estructura/RLS y logs recientes. Verificar las variables de Vercel sin exponer valores en chat.
2. **Vercel**: confirmar proyecto oficial `wolfim-57ud10` y el segundo proyecto conectado, environment variables por entorno y logs de `/api/leads`.
3. **GA4**: acceder a propiedad de medición, verificar `click_whatsapp`, `contact_cta_click`, `form_submit_diagnostico` y el nuevo `view_digital360`. Definir `form_submit_diagnostico` como evento clave tras comprobar el circuito real.
4. **Prueba integral**: hacer una consulta de prueba consentida con un número propio, verificar respuesta 200, persistencia en Supabase, y recepción operativa del seguimiento.
5. **Anti-spam**: antes de escalar campañas pagas, evaluar rate limiting/WAF y protección frente a bots del endpoint público.
6. **Privacidad**: validar política y consentimientos de analytics y captura de datos según la normativa aplicable.

## 5. Decisión de publicación

Estos ajustes se entregan como Preview. NO promover a `main` sin comprobar primero la integración real con Supabase y los eventos registrados en GA4. La V9 estable permanece en producción.
