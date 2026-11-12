# WOLFIM V14 — Scroll Based Velocity + gráfico 360° parallax

Fecha: 12 de noviembre de 2026.
Base: V12, commit 9050dfe. La V13 con cortina fue descartada y no está presente en esta rama.
Referencia: https://magicui.design/docs/components/scroll-based-velocity

## Decisión gráfica
- La sección 01 / Desafíos reales deja el fondo casi blanco y pasa a grafito premium con tipografía blanca y acentos rojos.
- Composición editorial: título a la izquierda, esquema de conexiones 360° a la derecha, y tres tarjetas de desafíos sobre fondo oscuro.
- El gráfico es **conceptual** y no representa integraciones existentes o resultados comerciales.
- Cuatro nodos sobre una retícula, unidos al núcleo «360°»: identidad, comercio, procesos e inteligencia.
- Parallax de profundidad sobre diferentes capas (nodos, retícula, núcleo), aplicado con transformaciones GPU y requestAnimationFrame.
- Dos bandas tipográficas circulantes con las palabras MARCA · COMERCIO · OPERACIÓN · DATOS / ESTRATEGIA · DISEÑO · TECNOLOGÍA · CRECIMIENTO.
- Implementación original del principio *Scroll Based Velocity* de Magic UI: velocidad y dirección responden al scroll; sin copiar código ni añadir React/Motion al stack Astro.
- Compatible con ES/EN mediante claves v14 del sistema actual.

## Rendimiento y accesibilidad
- SVG y HTML/CSS; no video ni imágenes pesadas adicionales.
- IntersectionObserver pausa animaciones fuera del viewport, visibilitychange pausa en pestañas ocultas.
- Se respeta prefers-reduced-motion (ticker estático y capas sin desplazamiento).
- Banda continua se describe mediante un único texto accesible, evitando repetición de cada palabra para lectores de pantalla.
- Sin desplazamiento horizontal del documento en 320×568, 390×844, 768×1024, 1440×900 y 1920×1080.

## QA
- npm run build: correcto.
- npm test: 93/93.
- preflight: 15/15.
- npm audit --omit=dev --audit-level=moderate: 0 vulnerabilidades reportadas.
- Chrome CDP: V14_CHROME_PASS true; movimiento de la banda verificado, cinco resoluciones, cero errores JS, reduced motion correcto.
- Regresión: V9_BROWSER_QA_PASSED true (hero, links, método y stacked cards).
- Touch: V81_TOUCH_REDUCED_QA_PASSED true (caída y arrastre del cubo, reduced motion).

## Capturas locales
- _review/WOLFIM_V14_1440_section2.png
- _review/WOLFIM_V14_390_section2.png
- _review/WOLFIM_V14_1440_velocity.png
- _review/WOLFIM_V14_390_velocity.png

## Entrega
- Subir rama feat/wolfim-v14-velocity-20261112 a Vercel Preview del proyecto oficial wolfim-57ud10.
- No hacer push a main ni modificar producción sin aceptación visual.
- Siguen pendientes Supabase, recepción real de leads y acceso a GA4/Console.
