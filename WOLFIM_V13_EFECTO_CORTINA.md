# WOLFIM V13 — Cortina editorial del hero hacia «Desafíos reales»

**Fecha:** 12 de noviembre de 2026
**Rama:** `feat/wolfim-v13-curtain-20261112`
**Base:** V12 `9050dfe`, sin cambios en `main` ni producción.

## Objetivo
Que la segunda sección («01 / Desafíos reales») ascienda al hacer scroll por delante del hero, como una cortina o panel que cubre progresivamente la portada.

## Diseño e implementación
- Hero `#hero`: `position: sticky; top:0`, con altura 100svh y z-index inferior al contenido.
- `#main-content` como plano frontal `z-index:2`. La sección `#desafios` conserva sus textos, tarjetas y fondo original; incorpora sombra superior y esquinas redondeadas discretas para hacer legible la superposición.
- Navegación fija con prioridad original; no se alteran logo ni menú.
- La animación ocurre con **scroll nativo y CSS**, sin librerías, transformaciones dinámicas ni secuestro de rueda/pantalla.
- Se conservaron caída del cuadrado rojo a 1,5 segundos, arrastre por mouse/touch, botón del hero y revelados editoriales.
- La visibilidad del hero ya no depende de observar la propia caja sticky; se calcula según el borde de la primera sección. Así WhatsApp reaparece al quedar la portada cubierta y el motor físico se pausa correctamente.
- Si el hero queda totalmente tapado, recibe `inert` para que sus enlaces y el cuadrado no queden accesibles al tabulador detrás de otra sección.
- El logo fijo del header lleva al inicio mediante `scrollTo({top:0})`; se respeta la preferencia de reducir movimiento.
- Con `prefers-reduced-motion: reduce` la portada recupera el flujo normal sin fijación sticky.

## Verificaciones
- `npm run build`: exit code 0.
- `npm test`: **92/92 tests aprobados**.
- `node scripts/predeploy-v9.mjs`: 15/15.
- `npm audit --omit=dev --audit-level=moderate`: 0 vulnerabilidades reportadas.
- Chrome CDP dedicado: 320×568, 390×844, 768×1024, 1440×900, 1920×1080:
  - el hero mantiene top=0 mientras la sección pasa por delante;
  - la cortina avanza la misma distancia que el scroll;
  - al quedar tapado el hero es inert, y WhatsApp recupera visibilidad;
  - el logo del header vuelve efectivamente al scroll 0;
  - sin desbordamientos horizontales ni excepciones JS;
  - «reducir movimiento» quita la fijación;
  - **V13_CURTAIN_QA_PASSED true**.
- Regresión del home y apilamiento de tarjetas: `V9_BROWSER_QA_PASSED true`.
- Touch y movimiento reducido: `V81_TOUCH_REDUCED_QA_PASSED true`.

## Capturas en el equipo local
- `_review/WOLFIM_V13_1440_cortina_parcial.png`.
- `_review/WOLFIM_V13_390_cortina_parcial.png`.

## Archivos modificados
- `src/components/HeroV5.astro`.
- `src/components/BusinessOverview.astro`.
- `src/pages/index.astro`.
- `src/styles/global.css`.
- `tests/performance-v11.test.mjs` (selector semántico actualizado).
- `tests/curtain-v13.test.mjs` (nuevo).
- Este informe.

## Publicación
Entregar como Vercel Preview del proyecto oficial WOLFIM (`wolfim-57ud10`). No promover a `main` ni alterar `www.wolfim.com` sin una instrucción explícita.
