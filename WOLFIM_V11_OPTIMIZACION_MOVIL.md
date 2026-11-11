# WOLFIM / 57UD10 — V11 · Rendimiento y accesibilidad móvil

Fecha: 11 noviembre 2026
Rama: `perf/wolfim-v11-20261111`
Estado: candidata a Preview; no publicar a `main` en esta intervención.
Base: V10 `bbfef66`, con correcciones de medición y datos. V9 sigue activa en producción `5ffc429`.

## Contexto y alcance
Se posponen expresamente la conexión a Supabase, consulta directa de informes GA4 y verificación de leads reales. Esta iteración cubre rendimiento, accesibilidad y experiencia móvil. No cambiar logo, hero editorial, física del cuadrado rojo, 360°, ni cards superpuestas.

## Medición inicial de producción (Lighthouse móvil simulado)
- www.wolfim.com (V9): performance **84**, accesibilidad **92**, buenas prácticas **100**, SEO **100**.
- FCP **1,7 s**, LCP **4,4 s**, CLS **0**.
- Oportunidades: imagen del hero 4096×1368 cargada con 154 KB, hasta 147 KB de ahorro; fuentes externas render-blocking ~640 ms; 22 hallazgos de contraste, 5 de nombres accesibles, 1 de tamaño táctil y ausencia de un `main`.
- Auditoría independiente desktop V9: rendimiento **83**, accesibilidad **92**, buenas prácticas **100**, SEO **100**.

## Cambios V11 (preservación de identidad)
- Se conservaron el PNG 4K oficial original y el SVG limpio del header. Se añadieron **dos conversiones lossless WebP** del mismo logo, proporciones intactas: ancho 720px (**19 KB**) y ancho 1440px (**40 KB**). El HTML utiliza `srcset` y `sizes`, con respaldo PNG original. `fetchpriority=high`.
- Google Fonts mantienen las familias y los pesos, pero el CSS se precarga de manera no bloqueante, con `media=print`, `onload` y fallback `noscript`. Se conserva `font-display=swap`.
- Se añadió la región semántica `main`; se eliminó la etiqueta accesible redundante del selector de idiomas; las tarjetas de vista previa aprovechan el texto visible y `alt` descriptivo.
- Botón de menú móvil con área táctil 44×44px; en pantallas estrechas se adapta el espaciado para evitar desbordamiento.
- Se ajustaron **colores de texto**, no el rojo corporativo ni las superficies de marca, para alcanzar contraste accesible (numeración editorial, sellos, disclaimers, 360°, etiquetas de método y brief de contacto).
- En /diagnostico se ajustó el contraste del texto del caso, sin alterar formulario ni API.

## Medición comparativa local (Lighthouse móvil, mismo entorno de desarrollo)
- Antes (V10 local): performance 72, accesibilidad 92, buenas prácticas 100, SEO 100. FCP 2,4s, LCP 9,3s, CLS 0,008.
- Después (V11 local, tras las correcciones de homepage): performance 73, accesibilidad 100, buenas prácticas 100, SEO 100. FCP 1,7s, LCP 8,6s, CLS 0,011.
- Las cifras de desarrollo NO son equivalentes a la medición publicada: localhost y la advertencia de entorno de prueba afectan la carga. No se atribuye a producción una mejora aún no medida en el dominio real.
- /diagnostico V11 local tras el ajuste de contraste: performance 100, accesibilidad 100, buenas prácticas 100, SEO 100 (Lighthouse móvil simulado).

## QA
- Compilación Astro/Vercel con Node24 para funciones exitosa (Node local 26 genera aviso informativo).
- Pruebas 85/85 correctas, incluidos 4 tests específicos de V11.
- Chrome QA visual: 320×568, 390×844, 768×1024, 1440×900, 1920×1080, sin overflow, CTA visible en primera pantalla y apilamiento funcional.
- Se mantienen caída a 1,5s, arrastre táctil/mouse y `prefers-reduced-motion`.
- GA4 sigue bloqueado en hosts de Preview; no se envían conversiones sintéticas a producción.

## Pendientes
1. Validar LCP, INP, CLS y condiciones de caché sobre V11 en staging/producción con datos de usuarios reales (Core Web Vitals / CrUX) antes de declarar logrado un objetivo de rendimiento.
2. Mantener pendiente Supabase, recepción de leads y acceso a GA4, tal como se solicitó.
3. Revisar consentimiento y privacidad de analytics antes de ampliar campañas.
4. Revisar resultados de Lighthouse y funcionamiento de la versión desplegada con sesión autorizada de Vercel Preview.
