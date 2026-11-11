# WOLFIM / 57UD10 — V12: SEO técnico e investigación LCP

Fecha: 11/11/2026
Rama: perf/wolfim-v12-lcp-seo-20261111
Base: V11 en Preview, commit 2a67813. Publicación principal aún en V9.

## Evidencia — SEO del sitio publicado
Revisamos directamente https://www.wolfim.com:
- Las siete rutas públicas ensayadas respondieron 200.
- La home y /diagnostico tenían canonical `https://www.wolfim.com`.
- /inmobiliarias exponía canonical y OG con `https://wolfim.com`, dominio que redirige 308 al host `www`.
- Dos páginas auxiliares en /victor carecían de enlace canonical; la página de Ranger no tenía imagen social propia y enlazaba un favicon /favicon.ico que no existe.
- robots.txt y sitemap.xml estaban disponibles con HTTP 200. El sitemap oficial incluía únicamente /, /diagnostico e /inmobiliarias, decisión preservada.
- Search Console no está conectado; pruebas de metadata no equivalen a confirmar indexación efectiva en Google.

## Cambios
- /inmobiliarias: canonical y og:image absolutos con www, sin alterar contenido comercial.
- /victor/lotes-rio-tercero: canonical autorreferencial al host principal (mantiene fuera de sitemap).
- /victor/ranger-2015: canonical autorreferencial, Open Graph básico incluyendo imagen del vehículo ya existente, twitter card y corrección de favicon al archivo real. No se tocó precio, imágenes, contenido, CTA ni contacto.
- sitemap: fecha lastmod 2026-11-11 para /diagnostico e /inmobiliarias, editadas efectivamente hoy, sin inventar rutas nuevas.
- Test automatizado SEO: unicidad de canonical correcto para siete rutas, URL OG coherente, assets existentes, sitemap exacto y fechas.
- Se corrigió una prueba antigua cuyo resultado esperado todavía asumía el canonical incorrecto en /inmobiliarias.

## Investigación LCP — decisión prudente
- Lighthouse V11 local registró LCP 8,6 segundos, pero V9 publicada 4,4 segundos. Estos valores NO son comparables por entorno/condiciones.
- Se probó, solo de forma temporal, quitar la entrada animada del logo (LCP principal).
- La medición aislada con el logo estático devolvió LCP 10,4 segundos; NO demostró mejora y estuvo afectada por variación local.
- Se revirtió el experimento y se mantiene la animación original del logo, entrada editorial, física del cuadrado y stacked cards.
- No declarar LCP resuelto hasta medir V11/V12 en un entorno de staging sin protección de sesión o directamente en producción una vez aprobado.

## QA
- Astro build completado y 89/89 tests automatizados correctos.
- 15/15 preflight checks; npm audit --omit=dev = 0 vulnerabilidades reportadas.
- Chrome QA: 320, 390, 768, 1440, 1920 px. Sin overflow ni excepciones.
- Arrastre táctil/rebote y reduced-motion aprobados.
- V12 no cambia la interfaz.

## Pendientes preservados
- Supabase y recepción real de leads.
- Acceso a reportes GA4 / Search Console.
- Validación editorial del caso inmobiliario y de la condición de indexabilidad de páginas auxiliares.
- LCP/Core Web Vitals reales en staging sin protección o producción.
- Promover únicamente tras revisión; no push a main.
