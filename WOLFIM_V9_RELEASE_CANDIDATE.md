# WOLFIM / 57UD10 — Release candidate V9
**Fecha:** 11 de noviembre de 2026
**Entorno:** C:\Projects\Wolfim57ud10-hero-v5
**Estado:** listo para staging y revisión de aceptación. **No autorizado para producción todavía.**

## 1. Decisiones tomadas al comparar contra wolfim.com
**Conservar del sitio publicado**
- SVG compacto WOLFIM / 57UD10 en el header. Sin descriptor inferior; rutas e identidad originales.
- Efecto original de tarjetas numeradas superpuestas al hacer scroll (sticky, reducción progresiva de escala y opacidad, sin saltos de layout).
- Navegación institucional y anclas previas; alias compatibles para `#capabilities`, `#pricing` y `#testimonials`, sin reinstalar secciones de venta desactualizadas.

**Conservar de la nueva identidad**
- Hero con PNG 4K **oficial** (57UD10 vertical + disciplinas) sin reconstrucción.
- Titular «Que se vea bien no alcanza. Tiene que funcionar.»; identificador `/ 000`.
- Cuadrado rojo: caída a 1,5 s, squash/rebote y arrastre mouse/touch; no interfiere con CTA.
- Estrategia · Diseño · Tecnología, opciones B2B/B2C/mixto y narrativa de Transformación Comercial Digital 360°.
- Proyectos como **material en revisión**, con cuatro posters extraídos de videos propios y vista previa bajo demanda, sin publicar afirmaciones no verificadas.
- Proceso actual en cinco pasos: diagnosticar, priorizar, diseñar, implementar, medir y evolucionar. Las tarjetas se apilan.
- Contacto comercial abre WhatsApp con mensaje prearmado; formulario de `/diagnostico` mantiene su API especializada.
- SEO canónico `https://www.wolfim.com`, GA4 con allowlist de producción y UTMs originales.

**No migrar del sitio publicado**
- Precios heredados, testimonios sin autorización, cifras de resultados no acreditadas, enlaces fingidos a sitios en vivo.
- Contenido de servicios web que contradiga el nuevo posicionamiento empresarial.

## 2. Estado técnico y seguridad
- Astro **7.4.10**, adaptador Vercel **11.0.21**, runtime `nodejs24.x`; se eliminó el uso del parche antiguo que forzaba Node20.
- Archivo de instalación reproducible: `package-lock.json` y `npm ci`.
- Overrides transitorios verificados para dependencias transitivas: `path-to-regexp ^6.3.0`, `glob ^14.0.2`, `minimatch ^11.0.1`; reevaluar con cada nueva actualización del adaptador.
- Auditoría de producción `npm audit --omit=dev --audit-level=moderate`: **0 vulnerabilidades reportadas** el 11/11/2026 (no garantiza ausencia futura).
- `npm run build`: compilación completa exit 0, Astro check sin errores.
- `npm test`: **79/79 aprobadas** (incluye API/atribución, interacciones y regresiones).
- `node scripts/predeploy-v9.mjs`: **15/15 PASS**, guardado en `_review/v9_predeploy_results.json`.
- Chrome (Astro 7): **V9_BROWSER_QA_PASSED true** en 320×568, 390×844, 768×1024, 1440×900, 1920×1080; sin desbordamiento horizontal, sin errores JavaScript. Stack real en desktop y móvil.
- Móvil touch: **V81_TOUCH_REDUCED_QA_PASSED true** (arrastre, reposo, reduced motion).
- Nueva imagen OpenGraph `public/og-image.jpg`: 1200×630, logotipo completo oficial y manifiesto; copia visual `_review/WOLFIM_V9_OG_final.png`.
- API sin secretos locales: JSON inválido y campos faltantes `400`, payload formalmente válido sin configuración `503`. **No constituye recepción real de consultas.**
- Las rutas `/`, `/diagnostico`, `/inmobiliarias`, CVs y páginas auxiliares `/victor/*` continúan compilando.

## 3. Bloqueos obligatorios antes de publicar
1. **Vercel**: vincular el worktree al proyecto/organización correcta en una preview, verificar dominio `www.wolfim.com`, rama autorizada y variable Node24. Falta `.vercel/project.json` local; no deducir destinos por `vercel.json`.
2. **Supabase**: verificar `SUPABASE_URL`, `SUPABASE_ANON_KEY` en ambiente de Vercel autorizado; probar captura real de `/diagnostico` y recepción en tabla. No exponer credenciales en logs o commit.
3. **Conversiones**: verificar el destino humano de WhatsApp y email, consentimientos y política de datos aplicable. El brief general prepara mensaje para enviar, no hace POST a API.
4. **Portfolio**: confirmar permisos de nombres, videos, imágenes y estado de cada proyecto. Mantener «material en revisión» mientras falte evidencia.
5. **SEO/analítica**: validar canonicals, sitemap y 301/308 del host en preview; revisar Search Console y GA4 cuando el dominio real esté activo. En previews el banner de GA4 deshabilitado es intencional; no habilitar medición de producción por preview.
6. **Experiencia**: Lighthouse/CWV con red móvil real, accesibilidad con teclado/lector, Web Vitals y prueba final desktop/mobile incluyendo apertura de videos.
7. **Aprobación**: confirmar visualmente la candidata V9 y autorizar explícitamente el despliegue. El estado «release candidate» no significa que se publicó.

## 4. Procedimiento recomendado de staging y rollback
**A. Verificación local**
```powershell
cd C:\Projects\Wolfim57ud10-hero-v5
npm ci
npm run build
npm test
npm audit --omit=dev --audit-level=moderate
node scripts/predeploy-v9.mjs
npm run dev -- --host 127.0.0.1 --port 4321
```

**B. Deploy de preview (NO producción)**
- Revisar el proyecto y el equipo real de Vercel; NO instalar credenciales en el repositorio.
- Conectar una rama de release exclusivamente a una preview autorizada. Verificar que Node sea 24 y que la ruta de API funcione con environment variables de preview.
- Confirmar URLs y enlaces internos con usuarios reales, sin datos sensibles en test público.
- Capturar reporte Lighthouse, prueba E2E de lead y consentimiento/aprobación de portfolio.

**C. Despliegue final con permiso**
- Registrar ID/URL de la última versión estable en Vercel y SHA de origen antes de promover.
- Promover SOLO el deployment de staging probado al dominio autorizado; comprobar homepage, 7 rutas, API, GA4 y conversiones.
- Monitorear errores tras publicación. En caso de regresión, usar la opción de rollback/promoción del deployment estable previamente verificado y volver a chequear rutas/API. No editar DNS salvo necesidad real.

## 5. Alcance de la intervención
- Aislamiento: worktree `C:\Projects\Wolfim57ud10-hero-v5` (repositorio de origen `C:\Projects\Wolfim57ud10` conservado con sus cambios locales preexistentes).
- **Sin push, sin deploy y sin modificación pública de wolfim.com.**
- Artefactos principales: `src/components/MethodStackV9.astro`, `public/og-image.jpg`, `package.json`, `package-lock.json`, `astro.config.mjs`, `scripts/predeploy-v9.mjs`, `tests/home-v9.test.mjs`.
