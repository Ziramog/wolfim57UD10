# WOLFIM / 57UD10 — V15 · Orbiting 360

Fecha: 12 de noviembre de 2026
Rama: feat/wolfim-v15-orbit-20261112
Base: V12 (9050dfe). Se excluyen V13 (cortina) y V14 (scroll velocity), ambas rechazadas.
Estado: candidato a Preview, NO a producción.

## Dirección de arte
- La segunda sección «01 / Desafíos reales» se rediseña con dos columnas: mensaje estratégico condensado y gráfico orbital central.
- Se usa la estética oficial blanca, grafito y rojo WOLFIM, sin degradados llamativos ni marcas multicolores.
- Núcleo WOLFIM 360° rojo. Órbita exterior: Mercado Libre, Instagram, Facebook y WhatsApp (36 s por vuelta); órbita interior: Web y CRM (25 s en sentido inverso).
- Los iconos contrarrotan para mantener su orientación, no giran como una rueda ilegible.
- El gráfico es conceptual y NO certifica integraciones ya implementadas.
- Sin React, dependencias nuevas, video, canvas, WebGL ni efectos de desplazamiento forzado. Astro + SVG + CSS.
- El titular se acortó a «Cuando los canales no se conectan, el negocio lo siente.». Bajada breve, tres tarjetas compactas en grafito y copy reducido. Se conserva la idea comercial original.
- Traducciones completas ES/EN y descripción única para tecnologías asistivas.
- Al estar fuera de pantalla, las órbitas se pausan con IntersectionObserver; al ocultar pestaña también se pausan. Respeto total de prefers-reduced-motion.
- El botón flotante de WhatsApp permanece oculto/inert solamente cuando esta sección está visible para no tapar las tarjetas. El acceso al contacto sigue disponible en otras secciones.

## Diseño responsivo
- Escritorio >=1001 px y altura >=720 px: sección en 100svh; tarjetas completas dentro del viewport.
- 390×844: sección 100svh, tres tarjetas visibles.
- 320×568: scroll natural; no comprime tipografía para forzar un solo viewport.
- 768×1024: composición en una columna, todas las tarjetas visibles.
- El resto de la navegación, hero, gravedad y apilamiento de método no se modifican visualmente.

## QA
- npm run build, Astro 7 + Node.js 24 en Vercel: PASS.
- npm test: 95/95 PASS.
- V15_BROWSER_QA_PASSED true; 320×568,390×844,768×1024,1024×768,1440×900,1920×1080.
- CSS orbital animado, 4 canales exteriores y 2 interiores, sin overflow y sin excepciones JS.
- Movimiento reducido: órbitas inmóviles.
- WhatsApp flotante: invisible/inert al mostrar la sección.
- V9_BROWSER_QA_PASSED true: hero, CTA, seis cards del módulo 360, cinco tarjetas apiladas sin regresiones.
- Capturas en _review/WOLFIM_V15_1440_section2.png, WOLFIM_V15_390_section2.png, WOLFIM_V15_1024_section2.png.
- Las pruebas mobile touch y preflight/audit quedan archivadas en _review.

## Entrega
Publicar solo Preview del proyecto oficial wolfim-57ud10, para evaluación visual antes de promover a main. El despliegue en producción no está autorizado por este alcance. Mantener pendientes Supabase, GA4 y leads reales.
