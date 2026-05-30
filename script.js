/* ═══════════════════════════════════════════════════════
   WOLFIM STUDIO — Interaction Layer
   Cinematic motion · Subtle · Precise · Bilingual
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── TRANSLATIONS ───
  const translations = {
    en: {
      // Nav
      'nav.projects': 'Work',
      'nav.capabilities': 'Services',
      'nav.pricing': 'Pricing',
      'nav.process': 'Process',
      'nav.contact': 'Contact',

      // Hero
      'hero.label': 'Digital Design & Creative Technology',
      'hero.desc': 'We design and build premium websites and digital systems for modern businesses. Every project combines architectural design thinking, AI-enhanced workflows, and a relentless focus on what actually drives growth.',
      'hero.desc_mobile': 'We build digital systems for the next generation of business. Design with intent, AI with purpose, technology that scales — an atmosphere built for exponential growth.',
      'hero.cta_projects': 'View Work',
      'hero.cta_pricing': 'Pricing',
      'hero.scroll': 'Scroll',

      // Projects
      'projects.title': 'Selected<br>Work',
      'projects.subtitle': 'Websites and digital systems, built to perform',
      'projects.p1.title': 'Roggero<br>&amp; Roma',
      'projects.p1.tag1': 'Real Estate Platform',
      'projects.p1.tag2': 'Immersive Web',
      'projects.p1.desc': 'Immersive website and premium branding for real estate developments. Integrated quoting engine, advanced SEO optimization, direct Google Reviews connection, and interactive maps — designed to elevate brand authority and convert leads.',
      'projects.p2.title': 'S&amp;P<br>Cars',
      'projects.p2.tag1': 'Automotive Platform',
      'projects.p2.tag2': 'AI & Automation',
      'projects.p2.desc': 'High-performance digital platform for premium new and used car dealerships. AI-powered vehicle descriptions, advanced SEO architecture, side-by-side comparisons, and automated quoting — turning search traffic into closed sales.',
      'projects.p3.title': 'Construvial<br>S.A.',
      'projects.p3.tag1': 'Construction Website',
      'projects.p3.tag2': 'Visual Identity & AI',
      'projects.p3.desc': 'Immersive digital presence for a construction company. Custom visual identity, AI image generation, and strategic WhatsApp CTA integration — designed to build trust and capture leads directly.',
      'projects.p4.title': 'KORANTIS<br>.COM',
      'projects.p4.tag1': 'AI Search Engine',
      'projects.p4.tag2': 'Web Platform',
      'projects.p4.desc': 'AI-powered restaurant and coffee shop search engine with conversational recommendations. Intelligent filtering, personalized suggestions, and a sleek interface that finds the perfect spot before you finish typing.',

      // Capabilities
      'capabilities.title': 'What We<br>Build',
      'capabilities.subtitle': 'Websites, systems, and everything between',
      'cap.a.title': 'Web Design & Development',
      'cap.a.desc': 'The core of everything we do. Premium websites designed with architectural precision and built for performance. No templates, no page builders — every site is crafted from scratch.',
      'cap.a.l1': 'Custom Website Design',
      'cap.a.l2': 'Responsive Development',
      'cap.a.l3': 'CMS Integration',
      'cap.a.l4': 'Performance Optimization',
      'cap.b.title': 'Brand & Digital Identity',
      'cap.b.desc': 'Your website is only as strong as the identity behind it. We build cohesive visual systems — from logo and typography to the tone of every page — so your brand feels intentional everywhere.',
      'cap.b.l1': 'Visual Identity Design',
      'cap.b.l2': 'Typography & Color Systems',
      'cap.b.l3': 'Brand Guidelines',
      'cap.b.l4': 'Social & Collateral Design',
      'cap.c.title': 'AI-Enhanced Workflows',
      'cap.c.desc': 'AI isn\'t our product — it\'s how we work. We use intelligent tools to accelerate design, automate content workflows, and build smarter systems. You get better results, faster.',
      'cap.c.l1': 'AI-Assisted Content',
      'cap.c.l2': 'Automated Workflows',
      'cap.c.l3': 'Smart Integrations',
      'cap.c.l4': 'Intelligent Automation',
      'cap.d.title': 'SEO & Content Strategy',
      'cap.d.desc': 'A beautiful website that nobody finds is a wasted investment. We build SEO into the architecture from day one — technical structure, content strategy, and keyword systems designed to rank.',
      'cap.d.l1': 'Technical SEO',
      'cap.d.l2': 'Content Architecture',
      'cap.d.l3': 'Keyword Strategy',
      'cap.d.l4': 'Local & National SEO',
      'cap.e.title': 'Ads & Paid Acquisition',
      'cap.e.desc': 'Drive the right traffic to the right pages. We manage Google Ads and paid social campaigns built on real data — not guesswork. Every dollar tracked, every conversion measured.',
      'cap.e.l1': 'Google Ads Management',
      'cap.e.l2': 'Social Media Ads',
      'cap.e.l3': 'Landing Page Design',
      'cap.e.l4': 'Conversion Tracking',
      'cap.f.title': 'Analytics & Growth',
      'cap.f.desc': 'What gets measured gets improved. We set up analytics that actually tell you something useful — dashboards, conversion funnels, and reporting that help you make smarter business decisions.',
      'cap.f.l1': 'Analytics Setup',
      'cap.f.l2': 'Conversion Optimization',
      'cap.f.l3': 'Performance Dashboards',
      'cap.f.l4': 'Monthly Reporting',

      // AI Integration
      'ai.title': 'Built With<br>Intelligence',
      'ai.subtitle': 'AI as advantage, not gimmick',
      'ai.statement': 'AI isn\'t our product — it\'s our <em>advantage</em>.<br>Every website, every system, every workflow<br>we deliver is smarter because of how we build it.',
      'ai.s1.title': 'Smarter Research',
      'ai.s1.desc': 'AI-powered market analysis, competitor audits, and content research. We understand your landscape faster and deeper than traditional methods allow.',
      'ai.s2.title': 'Accelerated Design',
      'ai.s2.desc': 'AI-assisted prototyping and content generation lets us explore more ideas, faster. You see better options in less time — without cutting corners on quality.',
      'ai.s3.title': 'Intelligent Automation',
      'ai.s3.desc': 'Automated content workflows, smart form handling, and AI-powered chat — we build systems that keep working when you\'re not watching.',
      'ai.s4.title': 'Continuous Optimization',
      'ai.s4.desc': 'AI-driven analytics surface what\'s working and what isn\'t. We refine copy, layouts, and campaigns based on real performance data — not hunches.',

      // What You Get
      'systems.title': 'What You<br>Get',
      'systems.subtitle': 'Every piece of your digital presence, handled',
      'sys.a.title': 'Your<br>Website',
      'sys.a.desc': 'A premium, fully custom website that looks exceptional and performs even better. Fast, responsive, SEO-ready — designed to make your business look as good as it actually is.',
      'sys.b.title': 'Content<br>System',
      'sys.b.desc': 'A CMS you can actually use. Update pages, publish posts, manage content — without needing a developer every time. Simple for you, powerful under the hood.',
      'sys.c.title': 'SEO<br>Foundation',
      'sys.c.desc': 'Technical SEO baked into every page. Clean structure, fast load times, schema markup, and content architecture designed to rank on Google from launch day.',
      'sys.d.title': 'Ad<br>Campaigns',
      'sys.d.desc': 'Google Ads and paid social campaigns set up, managed, and optimized. Landing pages that convert, budgets that make sense, and reporting you can actually read.',
      'sys.e.title': 'Analytics<br>Dashboard',
      'sys.e.desc': 'Know exactly what\'s happening on your site. Visitor tracking, conversion funnels, and performance metrics — all in a clear dashboard you\'ll actually check.',
      'sys.f.title': 'Ongoing<br>Support',
      'sys.f.desc': 'Websites aren\'t set-and-forget. Updates, content changes, performance tweaks, and strategic guidance — we stay with you after launch to keep things running and improving.',

      // Design Philosophy
      'visual.title': 'Design<br>Philosophy',
      'visual.desc': 'A website isn\'t just a page — it\'s the first impression your business makes. We treat every project like a piece of architecture: structurally sound, visually commanding, and built to last. This website is our proof.',
      'visual.p1.label': 'Typography',
      'visual.p1.value': 'Type sets the tone before a single word is read. We choose every font with intent.',
      'visual.p2.label': 'Layout',
      'visual.p2.value': 'Grid-based, mathematically precise composition. Nothing is placed randomly.',
      'visual.p3.label': 'Motion',
      'visual.p3.value': 'Subtle, cinematic animation that guides attention without demanding it.',
      'visual.p4.label': 'Space',
      'visual.p4.value': 'Generous whitespace that lets the design breathe and the message land.',
      'visual.p5.label': 'Detail',
      'visual.p5.value': 'The difference between good and premium is in the details nobody notices consciously.',

      // Process
      'process.title': 'How It<br>Works',
      'process.subtitle': 'Clear process, no surprises',
      'process.duration_label': 'Typical Duration',
      'process.s1.phase': 'Phase I',
      'process.s1.title': 'Conversation &amp;<br>Strategy',
      'process.s1.desc': 'We talk. I learn your business, your audience, and what you actually need — not what a template tells you to buy. We define the scope, the goals, and the direction before anything gets designed.',
      'process.s1.duration': '1 Week',
      'process.s2.phase': 'Phase II',
      'process.s2.title': 'Design &amp;<br>Direction',
      'process.s2.desc': 'Visual direction, layout concepts, and the design system take shape. You see exactly what your site will look and feel like before a single line of code is written. Revisions are built into the process.',
      'process.s2.duration': '1–2 Weeks',
      'process.s3.phase': 'Phase III',
      'process.s3.title': 'Build &amp;<br>Refinement',
      'process.s3.desc': 'The design becomes a live website. Responsive development, CMS setup, SEO foundation, performance optimization, and all the integrations your business needs. Tested thoroughly before launch.',
      'process.s3.duration': '2–4 Weeks',
      'process.s4.phase': 'Phase IV',
      'process.s4.title': 'Launch &amp;<br>Growth',
      'process.s4.desc': 'Your site goes live — but we don\'t disappear. Ads setup, analytics monitoring, content updates, and performance optimization. The relationship continues as your business grows.',
      'process.s4.duration': 'Ongoing',

      // Results & Performance
      'intel.title': 'Results &amp;<br>Performance',
      'intel.subtitle': 'Built to grow your business, not just look good',
      'intel.statement': 'A premium website should be more than beautiful — it should work. Every site we build is engineered to rank on Google, convert visitors into customers, and give you clear data on what\'s happening with your business online.',
      'intel.m1': 'Google PageSpeed<br>Score Average',
      'intel.m2': 'Lead Generation<br>Improvement',
      'intel.m3': 'Lower Cost<br>Per Acquisition',
      'intel.m4': 'Scalability<br>Ceiling',
      'intel.pill1.title': 'SEO & Organic Growth',
      'intel.pill1.desc': 'Websites built to rank. Technical SEO, content structure, and keyword architecture that bring in organic traffic — the kind of growth that compounds and doesn\'t cost you per click.',
      'intel.pill2.title': 'Paid Ads & Acquisition',
      'intel.pill2.desc': 'Google Ads and paid social campaigns managed with real strategy. Targeted audiences, optimized landing pages, and continuous refinement — every dollar accounted for.',
      'intel.pill3.title': 'Analytics & Insights',
      'intel.pill3.desc': 'Clear dashboards that show you what\'s working. Visitor behavior, conversion rates, campaign performance — real numbers that help you make real business decisions.',

      // Pricing
      'pricing.title': 'Clear Pricing.<br>No Surprises.',
      'pricing.subtitle': 'Setup + Monthly maintenance. Everything you need included.',
      'pricing.setup': 'USD setup',
      'pricing.monthly': 'USD/mo',
      'pricing.terms': '50% upfront to begin',
      'pricing.p1.tag': 'Ideal to start',
      'pricing.p1.title': 'Landing',
      'pricing.p1.f1': 'Custom Design',
      'pricing.p1.f2': '1 Optimized Page',
      'pricing.p1.f3': 'Video Background',
      'pricing.p1.f4': 'Basic SEO',
      'pricing.p1.f5': 'Hosting + SSL Included',
      'pricing.p1.f6': '2 Weeks Delivery',
      'pricing.p2.tag': 'Most chosen',
      'pricing.p2.title': 'Professional',
      'pricing.p2.f1': 'Custom Design',
      'pricing.p2.f2': 'Up to 5 Pages',
      'pricing.p2.f3': 'Photo Gallery',
      'pricing.p2.f4': 'Smart Filters',
      'pricing.p2.f5': 'Optimized SEO',
      'pricing.p2.f6': 'Admin Panel Included',
      'pricing.p2.f7': 'Hosting + SSL Included',
      'pricing.p2.f8': '2-3 Weeks Delivery',
      'pricing.p3.tag': 'For products',
      'pricing.p3.title': 'Catalog',
      'pricing.p3.f1': 'Custom Design',
      'pricing.p3.f2': 'Product Catalog',
      'pricing.p3.f3': 'Advanced Filters',
      'pricing.p3.f4': 'Premium SEO',
      'pricing.p3.f5': 'Full Admin Panel',
      'pricing.p3.f6': 'Hosting + SSL Included',
      'pricing.p3.f7': '3-4 Weeks Delivery',
      'pricing.p4.tag': 'Full online store',
      'pricing.p4.title': 'Ecommerce',
      'pricing.p4.f1': 'Custom Design',
      'pricing.p4.f2': 'Full Online Store',
      'pricing.p4.f3': 'Shopping Cart',
      'pricing.p4.f4': 'Payment Gateway',
      'pricing.p4.f5': 'Premium SEO',
      'pricing.p4.f6': 'Full Admin Panel',
      'pricing.p4.f7': 'Hosting + SSL Included',
      'pricing.p4.f8': '3-4 Weeks Delivery',

      // Marquee
      'marquee.1': 'Web Design',
      'marquee.2': 'Development',
      'marquee.3': 'SEO',
      'marquee.4': 'Google Ads',
      'marquee.5': 'Brand Identity',
      'marquee.6': 'AI Workflows',

      // Contact
      'contact.title': 'Let\'s Build<br>Your Next<br>Website',
      'contact.desc': 'If you\'re looking for a website that actually reflects the quality of your business — not a template with your logo on it — let\'s talk. I work directly with every client, from first conversation to launch and beyond.',
      'contact.schedule_label': 'Schedule',
      'contact.schedule_value': 'Book a free intro call',
      'contact.availability': 'Currently taking on new projects for Q3 2026',

      // Footer
      'footer.copy': '© 2024 — All rights reserved',
    },

    es: {
      // Nav
      'nav.projects': 'Trabajos',
      'nav.capabilities': 'Servicios',
      'nav.pricing': 'Precios',
      'nav.process': 'Proceso',
      'nav.contact': 'Contacto',

      // Hero
      'hero.label': 'Diseño Digital & Tecnología Creativa',
      'hero.desc': 'Diseño con intención. Tecnología con propósito. Cada proyecto es una arquitectura digital construida desde cero — con IA en el proceso y el crecimiento como única métrica.',
      'hero.desc_mobile': 'Construimos sistemas digitales para la próxima generación de negocios. Diseño con intención, IA con propósito, tecnología que escala — una atmósfera construida para crecer de forma exponencial.',
      'hero.cta_projects': 'Ver Proyectos',
      'hero.cta_pricing': 'Precios',
      'hero.focus_label': 'Enfoque',
      'hero.focus_value': 'Diseño Web Premium &amp;<br>Sistemas Digitales',
      'hero.approach_label': 'Método',
      'hero.approach_value': 'Potenciado por IA &amp;<br>Orientado a Sistemas',
      'hero.scroll': 'Desplazar',

      // Projects
      'projects.title': 'Trabajos<br>Seleccionados',
      'projects.subtitle': 'Sitios web y sistemas digitales, construidos para rendir',
      'projects.p1.title': 'Roggero<br>&amp; Roma',
      'projects.p1.tag1': 'Plataforma Inmobiliaria',
      'projects.p1.tag2': 'Web Inmersiva',
      'projects.p1.desc': 'Sitio web inmersivo e imagen premium para desarrollos inmobiliarios. Generación de presupuestos integrados, optimización SEO avanzada, conexión directa con reseñas de Google y mapas interactivos — diseñado para posicionar la marca y convertir leads.',
      'projects.p2.title': 'S&amp;P<br>Cars',
      'projects.p2.tag1': 'Plataforma Automotriz',
      'projects.p2.tag2': 'IA & Automatización',
      'projects.p2.desc': 'Plataforma digital de alto rendimiento para agencia de autos premium nuevos y usados. Generación de descripciones potenciada por IA, arquitectura SEO, comparativas de vehículos y emisión automatizada de presupuestos — convirtiendo tráfico en ventas.',
      'projects.p3.title': 'Construvial<br>S.A.',
      'projects.p3.tag1': 'Sitio Web Constructora',
      'projects.p3.tag2': 'Identidad Visual e IA',
      'projects.p3.desc': 'Presencia digital inmersiva para empresa constructora. Identidad visual, generación de imágenes con IA, y un CTA estratégico de WhatsApp — diseñado para generar confianza y captar clientes de manera directa.',
      'projects.p4.title': 'KORANTIS<br>.COM',
      'projects.p4.tag1': 'Motor de Búsqueda IA',
      'projects.p4.tag2': 'Plataforma Web',
      'projects.p4.desc': 'Motor de búsqueda de restaurantes y cafeterías con IA conversacional. Filtrado inteligente, sugerencias personalizadas y una interfaz elegante que encuentra el lugar perfecto antes de que termines de escribir.',

      // Capabilities
      'capabilities.title': 'Qué<br>Construimos',
      'capabilities.subtitle': 'Sitios web, sistemas, y todo lo intermedio',
      'cap.a.title': 'Diseño & Desarrollo Web',
      'cap.a.desc': 'El centro de todo lo que hacemos. Sitios web premium diseñados con precisión arquitectónica y construidos para rendir. Sin plantillas, sin page builders — cada sitio se construye desde cero.',
      'cap.a.l1': 'Diseño Web Personalizado',
      'cap.a.l2': 'Desarrollo Responsivo',
      'cap.a.l3': 'Integración CMS',
      'cap.a.l4': 'Optimización de Rendimiento',
      'cap.b.title': 'Marca & Identidad Digital',
      'cap.b.desc': 'Tu sitio web es tan fuerte como la identidad detrás de él. Construimos sistemas visuales cohesivos — desde logo y tipografía hasta el tono de cada página — para que tu marca se sienta intencional en todos lados.',
      'cap.b.l1': 'Diseño de Identidad Visual',
      'cap.b.l2': 'Sistemas Tipográficos & de Color',
      'cap.b.l3': 'Guías de Marca',
      'cap.b.l4': 'Diseño Social & Colateral',
      'cap.c.title': 'Flujos Potenciados por IA',
      'cap.c.desc': 'La IA no es nuestro producto — es cómo trabajamos. Usamos herramientas inteligentes para acelerar diseño, automatizar flujos de contenido y construir sistemas más inteligentes. Obtenés mejores resultados, más rápido.',
      'cap.c.l1': 'Contenido Asistido por IA',
      'cap.c.l2': 'Flujos Automatizados',
      'cap.c.l3': 'Integraciones Inteligentes',
      'cap.c.l4': 'Automatización Inteligente',
      'cap.d.title': 'SEO & Estrategia de Contenido',
      'cap.d.desc': 'Un sitio web hermoso que nadie encuentra es una inversión desperdiciada. Integramos SEO en la arquitectura desde el día uno — estructura técnica, estrategia de contenido y sistemas de keywords diseñados para posicionar.',
      'cap.d.l1': 'SEO Técnico',
      'cap.d.l2': 'Arquitectura de Contenido',
      'cap.d.l3': 'Estrategia de Keywords',
      'cap.d.l4': 'SEO Local & Nacional',
      'cap.e.title': 'Ads & Adquisición Pagada',
      'cap.e.desc': 'Llevá el tráfico correcto a las páginas correctas. Gestionamos campañas de Google Ads y redes sociales basadas en datos reales — no en suposiciones. Cada peso registrado, cada conversión medida.',
      'cap.e.l1': 'Gestión de Google Ads',
      'cap.e.l2': 'Ads en Redes Sociales',
      'cap.e.l3': 'Diseño de Landing Pages',
      'cap.e.l4': 'Seguimiento de Conversiones',
      'cap.f.title': 'Analítica & Crecimiento',
      'cap.f.desc': 'Lo que se mide, se mejora. Configuramos analítica que realmente te dice algo útil — dashboards, embudos de conversión y reportes que te ayudan a tomar mejores decisiones de negocio.',
      'cap.f.l1': 'Configuración de Analítica',
      'cap.f.l2': 'Optimización de Conversión',
      'cap.f.l3': 'Dashboards de Rendimiento',
      'cap.f.l4': 'Reportes Mensuales',

      // AI Integration
      'ai.title': 'Construido Con<br>Inteligencia',
      'ai.subtitle': 'IA como ventaja, no como truco',
      'ai.statement': 'La IA no es nuestro producto — es nuestra <em>ventaja</em>.<br>Cada sitio web, cada sistema, cada flujo de trabajo<br>que entregamos es más inteligente por cómo lo construimos.',
      'ai.s1.title': 'Investigación Más Inteligente',
      'ai.s1.desc': 'Análisis de mercado potenciado por IA, auditorías de competencia e investigación de contenido. Entendemos tu panorama más rápido y más profundo que los métodos tradicionales.',
      'ai.s2.title': 'Diseño Acelerado',
      'ai.s2.desc': 'El prototipado y la generación de contenido asistidos por IA nos permiten explorar más ideas, más rápido. Ves mejores opciones en menos tiempo — sin sacrificar calidad.',
      'ai.s3.title': 'Automatización Inteligente',
      'ai.s3.desc': 'Flujos de contenido automatizados, formularios inteligentes y chat potenciado por IA — construimos sistemas que siguen trabajando cuando no estás mirando.',
      'ai.s4.title': 'Optimización Continua',
      'ai.s4.desc': 'La analítica impulsada por IA revela qué funciona y qué no. Refinamos copy, layouts y campañas basándonos en datos reales de rendimiento — no en corazonadas.',

      // What You Get
      'systems.title': 'Qué<br>Recibís',
      'systems.subtitle': 'Cada pieza de tu presencia digital, resuelta',
      'sys.a.title': 'Tu Sitio<br>Web',
      'sys.a.desc': 'Un sitio web premium, completamente personalizado, que se ve excepcional y rinde aún mejor. Rápido, responsivo, listo para SEO — diseñado para que tu negocio se vea tan bien como realmente es.',
      'sys.b.title': 'Sistema de<br>Contenido',
      'sys.b.desc': 'Un CMS que realmente podés usar. Actualizá páginas, publicá posts, gestioná contenido — sin necesitar un desarrollador cada vez. Simple para vos, poderoso por dentro.',
      'sys.c.title': 'Base<br>SEO',
      'sys.c.desc': 'SEO técnico integrado en cada página. Estructura limpia, tiempos de carga rápidos, schema markup y arquitectura de contenido diseñada para posicionar en Google desde el día del lanzamiento.',
      'sys.d.title': 'Campañas<br>Publicitarias',
      'sys.d.desc': 'Campañas de Google Ads y redes sociales configuradas, gestionadas y optimizadas. Landing pages que convierten, presupuestos que tienen sentido y reportes que realmente podés leer.',
      'sys.e.title': 'Dashboard<br>Analítico',
      'sys.e.desc': 'Sabé exactamente qué pasa en tu sitio. Seguimiento de visitantes, embudos de conversión y métricas de rendimiento — todo en un dashboard claro que realmente vas a revisar.',
      'sys.f.title': 'Soporte<br>Continuo',
      'sys.f.desc': 'Los sitios web no son de configurar y olvidar. Actualizaciones, cambios de contenido, ajustes de rendimiento y orientación estratégica — nos quedamos con vos después del lanzamiento para que todo siga funcionando y mejorando.',

      // Design Philosophy
      'visual.title': 'Filosofía<br>de Diseño',
      'visual.desc': 'Un sitio web no es solo una página — es la primera impresión que da tu negocio. Tratamos cada proyecto como una pieza de arquitectura: estructuralmente sólido, visualmente imponente y construido para durar. Este sitio web es nuestra prueba.',
      'visual.p1.label': 'Tipografía',
      'visual.p1.value': 'La tipografía establece el tono antes de que se lea una sola palabra. Elegimos cada fuente con intención.',
      'visual.p2.label': 'Composición',
      'visual.p2.value': 'Composición basada en grillas, matemáticamente precisa. Nada se coloca al azar.',
      'visual.p3.label': 'Movimiento',
      'visual.p3.value': 'Animación sutil y cinemática que guía la atención sin exigirla.',
      'visual.p4.label': 'Espacio',
      'visual.p4.value': 'Espacio en blanco generoso que deja respirar al diseño y que el mensaje aterrice.',
      'visual.p5.label': 'Detalle',
      'visual.p5.value': 'La diferencia entre bueno y premium está en los detalles que nadie nota conscientemente.',

      // Process
      'process.title': 'Cómo<br>Funciona',
      'process.subtitle': 'Proceso claro, sin sorpresas',
      'process.duration_label': 'Duración Típica',
      'process.s1.phase': 'Fase I',
      'process.s1.title': 'Conversación &amp;<br>Estrategia',
      'process.s1.desc': 'Hablamos. Aprendo sobre tu negocio, tu audiencia y lo que realmente necesitás — no lo que una plantilla te dice que compres. Definimos el alcance, los objetivos y la dirección antes de diseñar nada.',
      'process.s1.duration': '1 Semana',
      'process.s2.phase': 'Fase II',
      'process.s2.title': 'Diseño &amp;<br>Dirección',
      'process.s2.desc': 'La dirección visual, los conceptos de layout y el sistema de diseño toman forma. Ves exactamente cómo se verá y sentirá tu sitio antes de que se escriba una sola línea de código. Las revisiones están incluidas en el proceso.',
      'process.s2.duration': '1–2 Semanas',
      'process.s3.phase': 'Fase III',
      'process.s3.title': 'Construcción &amp;<br>Refinamiento',
      'process.s3.desc': 'El diseño se convierte en un sitio web real. Desarrollo responsivo, configuración de CMS, base SEO, optimización de rendimiento y todas las integraciones que tu negocio necesita. Testeado exhaustivamente antes del lanzamiento.',
      'process.s3.duration': '2–4 Semanas',
      'process.s4.phase': 'Fase IV',
      'process.s4.title': 'Lanzamiento &amp;<br>Crecimiento',
      'process.s4.desc': 'Tu sitio sale en vivo — pero no desaparecemos. Configuración de ads, monitoreo analítico, actualizaciones de contenido y optimización de rendimiento. La relación continúa mientras tu negocio crece.',
      'process.s4.duration': 'Continuo',

      // Results & Performance
      'intel.title': 'Resultados &amp;<br>Rendimiento',
      'intel.subtitle': 'Construido para hacer crecer tu negocio, no solo para verse bien',
      'intel.statement': 'Un sitio web premium debería ser más que hermoso — debería funcionar. Cada sitio que construimos está diseñado para posicionar en Google, convertir visitantes en clientes, y darte datos claros sobre qué está pasando con tu negocio online.',
      'intel.m1': 'Puntuación Google<br>PageSpeed Promedio',
      'intel.m2': 'Mejora en Generación<br>de Leads',
      'intel.m3': 'Menor Costo Por<br>Adquisición',
      'intel.m4': 'Techo de<br>Escalabilidad',
      'intel.pill1.title': 'SEO & Crecimiento Orgánico',
      'intel.pill1.desc': 'Sitios web construidos para posicionar. SEO técnico, estructura de contenido y arquitectura de keywords que traen tráfico orgánico — el tipo de crecimiento que se compone y no te cuesta por clic.',
      'intel.pill2.title': 'Ads & Adquisición Pagada',
      'intel.pill2.desc': 'Campañas de Google Ads y redes sociales gestionadas con estrategia real. Audiencias segmentadas, landing pages optimizadas y refinamiento continuo — cada peso contabilizado.',
      'intel.pill3.title': 'Analítica & Insights',
      'intel.pill3.desc': 'Dashboards claros que muestran qué funciona. Comportamiento de visitantes, tasas de conversión, rendimiento de campañas — números reales que ayudan a tomar decisiones reales de negocio.',

      // Pricing
      'pricing.title': 'Precios Claros.<br>Sin Sorpresas.',
      'pricing.subtitle': 'Setup + Mantenimiento mensual. Todo lo que necesitás incluido.',
      'pricing.setup': 'USD setup',
      'pricing.monthly': 'USD/mes',
      'pricing.terms': '50% adelantado para empezar',
      'pricing.p1.tag': 'Ideal para empezar',
      'pricing.p1.title': 'Landing',
      'pricing.p1.f1': 'Diseño Personalizado',
      'pricing.p1.f2': '1 Página Optimizada',
      'pricing.p1.f3': 'Fondo de Video',
      'pricing.p1.f4': 'SEO Básico',
      'pricing.p1.f5': 'Hosting + SSL Incluido',
      'pricing.p1.f6': 'Entrega en 2 Semanas',
      'pricing.p2.tag': 'El más elegido',
      'pricing.p2.title': 'Profesional',
      'pricing.p2.f1': 'Diseño Personalizado',
      'pricing.p2.f2': 'Hasta 5 Páginas',
      'pricing.p2.f3': 'Galería de Fotos',
      'pricing.p2.f4': 'Filtros Inteligentes',
      'pricing.p2.f5': 'SEO Optimizado',
      'pricing.p2.f6': 'Panel Admin Incluido',
      'pricing.p2.f7': 'Hosting + SSL Incluido',
      'pricing.p2.f8': 'Entrega en 2-3 Semanas',
      'pricing.p3.tag': 'Para productos',
      'pricing.p3.title': 'Catálogo',
      'pricing.p3.f1': 'Diseño Personalizado',
      'pricing.p3.f2': 'Catálogo de Productos',
      'pricing.p3.f3': 'Filtros Avanzados',
      'pricing.p3.f4': 'SEO Premium',
      'pricing.p3.f5': 'Panel Admin Completo',
      'pricing.p3.f6': 'Hosting + SSL Incluido',
      'pricing.p3.f7': 'Entrega en 3-4 Semanas',
      'pricing.p4.tag': 'Tienda online completa',
      'pricing.p4.title': 'Ecommerce',
      'pricing.p4.f1': 'Diseño Personalizado',
      'pricing.p4.f2': 'Tienda Online Completa',
      'pricing.p4.f3': 'Carrito de Compras',
      'pricing.p4.f4': 'Pasarela de Pagos',
      'pricing.p4.f5': 'SEO Premium',
      'pricing.p4.f6': 'Panel Admin Completo',
      'pricing.p4.f7': 'Hosting + SSL Incluido',
      'pricing.p4.f8': 'Entrega en 3-4 Semanas',

      // Marquee
      'marquee.1': 'Diseño Web',
      'marquee.2': 'Desarrollo',
      'marquee.3': 'SEO',
      'marquee.4': 'Google Ads',
      'marquee.5': 'Identidad de Marca',
      'marquee.6': 'Flujos de IA',

      // Contact
      'contact.title': 'Construyamos<br>Tu Próximo<br>Sitio Web',
      'contact.desc': 'Si buscás un sitio web que realmente refleje la calidad de tu negocio — no una plantilla con tu logo encima — hablemos. Trabajo directamente con cada cliente, desde la primera conversación hasta el lanzamiento y más allá.',
      'contact.schedule_label': 'Agendar',
      'contact.schedule_value': 'Reservar una llamada introductoria gratuita',
      'contact.availability': 'Actualmente tomando nuevos proyectos para Q3 2026',

      // Footer
      'footer.copy': '© 2024 — Todos los derechos reservados',
    },
  };

  let currentLang = 'es';

  function setLanguage(lang) {
    currentLang = lang;
    const dict = translations[lang];

    // Update textContent elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update innerHTML elements (for <br> and <em> tags)
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update toggle visual state
    document.querySelectorAll('.lang-toggle__option').forEach((opt) => {
      opt.classList.toggle('lang-toggle__option--active', opt.dataset.lang === lang);
    });

    // Mobile typewriter removed for instant readability

    // Persist preference
    try {
      localStorage.setItem('wolfim-lang', lang);
    } catch (e) {
      // localStorage not available
    }
  }

  let typewriterTimeout = null;
  function runMobileTypewriter() {
    const mobileDesc = document.querySelector('.desc-mobile');
    if (!mobileDesc) return;

    if (typewriterTimeout) clearTimeout(typewriterTimeout);

    const key = mobileDesc.getAttribute('data-i18n');
    const fullText = translations[currentLang][key];
    if (!fullText) return;

    mobileDesc.textContent = '';
    mobileDesc.classList.add('is-typing');
    
    let i = 0;
    function typeChar() {
      if (i < fullText.length) {
        mobileDesc.textContent += fullText.charAt(i);
        i++;
        // Add slight randomness to typing speed for realism (20-60ms)
        const speed = Math.random() * 40 + 20;
        typewriterTimeout = setTimeout(typeChar, speed);
      } else {
        mobileDesc.classList.remove('is-typing');
      }
    }
    
    // Initial delay before typing starts
    typewriterTimeout = setTimeout(typeChar, 800);
  }

  // ─── LANGUAGE TOGGLE ───
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      setLanguage(currentLang === 'en' ? 'es' : 'en');
    });
  }

  // Restore saved preference or default to Spanish
  try {
    const saved = localStorage.getItem('wolfim-lang');
    if (saved && translations[saved]) {
      setLanguage(saved);
    } else {
      setLanguage('es');
    }
  } catch (e) {
    setLanguage('es');
  }


  // ─── SCRAMBLE TEXT SYSTEM ───
  const SCRAMBLE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0234567891';
  const SCRAMBLE_FINAL = '57UD10';
  let scrambleAnimating = false;

  function scrambleText(element, finalText, options) {
    options = options || {};
    const cycleDuration = options.cycleDuration || 1400; // slightly longer for cinematic feel
    const charStagger = options.charStagger || 150; // more pronounced stagger
    const cycleSpeed = options.cycleSpeed || 60; // slightly slower cycling
    const onComplete = options.onComplete || null;

    scrambleAnimating = true;
    const chars = finalText.split('');

    // Build character spans
    element.innerHTML = '';
    const spans = chars.map(function (char) {
      const span = document.createElement('span');
      span.className = 'hero__char hero__char--cycling';
      span.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      span.dataset.final = char;
      element.appendChild(span);
      return span;
    });

    // Cycle each character at slightly varied speeds
    const intervals = spans.map(function (span) {
      return setInterval(function () {
        span.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }, cycleSpeed + Math.floor(Math.random() * 30));
    });

    // Resolve characters strictly sequentially one by one
    spans.forEach(function (span, i) {
      // Easing simulation: wait progressively longer
      const delay = cycleDuration + (i * charStagger);
      
      setTimeout(function () {
        clearInterval(intervals[i]);
        span.textContent = span.dataset.final;
        span.classList.remove('hero__char--cycling');
        span.classList.add('hero__char--resolved');

        // Clean up resolved class after animation completes
        setTimeout(function () {
          span.classList.remove('hero__char--resolved');
        }, 1200);

        // Signal completion after last character
        if (i === spans.length - 1) {
          setTimeout(function () {
            scrambleAnimating = false;
            if (onComplete) onComplete();
          }, 1200);
        }
      }, delay);
    });
  }


  // ─── CUSTOM CURSOR & GLOW ───
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  const cursorGlow = document.getElementById('cursor-glow');

  let cursorX = 0, cursorY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    
    // Activate glow on first mouse movement
    if (cursorGlow && !cursorGlow.classList.contains('is-active')) {
      cursorGlow.classList.add('is-active');
    }
  });

  const heroContent = document.querySelector('.hero__content');
  const heroGridLines = document.querySelector('.hero__grid-lines');
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  });

  function animateCursor() {
    cursorX += (targetX - cursorX) * 0.12;
    cursorY += (targetY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    if (cursorGlow) {
      cursorGlow.style.left = cursorX + 'px';
      cursorGlow.style.top = cursorY + 'px';
    }

    if (document.body.classList.contains('system-awake')) {
      const offsetX = (cursorX - windowWidth / 2) / windowWidth;
      const offsetY = (cursorY - windowHeight / 2) / windowHeight;

      if (heroContent) {
        heroContent.style.transform = `translate(${offsetX * -10}px, ${offsetY * -10}px)`;
      }
      if (heroGridLines) {
        heroGridLines.style.transform = `translate(${offsetX * 15}px, ${offsetY * 15}px)`;
      }
    }
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Expand cursor on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project__image, .contact__link');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--expanded'));
  });

  // ─── NAV LINK HOVER SCRAMBLE ───
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      if (link.dataset.isScrambling === 'true') return;
      link.dataset.isScrambling = 'true';
      
      const currentText = link.textContent;
      let iterations = 0;
      
      const interval = setInterval(() => {
        link.textContent = currentText.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iterations) return currentText[index];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join('');
        
        iterations += 1/3;
        
        if (iterations >= currentText.length) {
          clearInterval(interval);
          link.textContent = currentText;
          link.dataset.isScrambling = 'false';
        }
      }, 30);
    });
  });
  // ─── NAVIGATION ───
  const nav = document.getElementById('nav-main');
  const menuBtn = document.getElementById('nav-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let lastScrollY = 0;
  let ticking = false;

  function updateNav() {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      if (scrollY > lastScrollY && scrollY > 300) {
        nav.classList.add('nav--hidden');
      } else {
        nav.classList.remove('nav--hidden');
      }
    } else {
      nav.classList.remove('nav--hidden');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  });

  // Mobile menu toggle with burger displacement effect
  menuBtn.addEventListener('click', () => {
    const isOpening = !mobileMenu.classList.contains('active');

    if (isOpening) {
      // Open: snap to burger rect, then animate to full (100% from bottom = hidden)
      const r = menuBtn.getBoundingClientRect();
      const inset = `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px)`;
      mobileMenu.style.clipPath = inset;
      mobileMenu.style.transition = 'none';
      mobileMenu.classList.add('active');
      menuBtn.classList.add('open');

      setTimeout(() => {
        mobileMenu.style.transition = '';
        mobileMenu.style.clipPath = 'inset(0px 0px 100% 100%)';
      }, 30);
    } else {
      // Close: animate from full screen (100% bottom) to burger rect
      mobileMenu.style.clipPath = 'inset(0px 0px 100% 100%)';
      mobileMenu.style.transition = '';
      const r = menuBtn.getBoundingClientRect();
      const inset = `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px)`;
      mobileMenu.style.clipPath = inset;
      menuBtn.classList.remove('open');

      mobileMenu.addEventListener('transitionend', () => {
        mobileMenu.classList.remove('active');
        mobileMenu.style.clipPath = '';
      }, { once: true });
    }

    document.body.style.overflow = isOpening ? 'hidden' : '';
  });

  // Close button (X) in top-right corner
  const closeBtn = document.getElementById('mobile-menu-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.style.clipPath = 'inset(0px 0px 100% 100%)';
      mobileMenu.style.transition = '';
      const r = menuBtn.getBoundingClientRect();
      const inset = `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px)`;
      mobileMenu.style.clipPath = inset;
      menuBtn.classList.remove('open');

      mobileMenu.addEventListener('transitionend', () => {
        mobileMenu.classList.remove('active');
        mobileMenu.style.clipPath = '';
      }, { once: true });
      document.body.style.overflow = '';
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu__link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.style.clipPath = 'inset(0px 0px 100% 100%)';
      mobileMenu.style.transition = '';
      const r = menuBtn.getBoundingClientRect();
      const inset = `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px)`;
      mobileMenu.style.clipPath = inset;
      menuBtn.classList.remove('active', 'open');

      mobileMenu.addEventListener('transitionend', () => {
        mobileMenu.classList.remove('active');
        mobileMenu.style.clipPath = '';
      }, { once: true });
      document.body.style.overflow = '';
    });
  });


  // ─── CLOCK ───
  const timeEl = document.getElementById('nav-time');

  function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (timeEl) {
      timeEl.textContent = `${h}:${m}:${s}`;
    }
  }

  updateTime();
  setInterval(updateTime, 1000);


  // ─── INTERSECTION OBSERVER — REVEAL ANIMATIONS ───
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });

  // ─── METRICS COUNTING ENGINE ───
  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.getAttribute('data-metric-target'));
        const suffix = entry.target.getAttribute('data-metric-suffix') || '';
        const duration = 2500;
        const startTime = performance.now();
        const isFloat = target % 1 !== 0;

        function updateNumber(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          let current = target * easeOut;
          
          if (isFloat) {
            entry.target.textContent = current.toFixed(1) + suffix;
          } else {
            entry.target.textContent = Math.round(current) + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          }
        }
        requestAnimationFrame(updateNumber);
        metricsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.metric__number[data-metric-target]').forEach(el => {
    metricsObserver.observe(el);
  });


  // ─── HERO TITLE ANIMATION ───
  const heroScrambleEl = document.getElementById('hero-scramble');
  const heroSepEl = document.getElementById('hero-sep');
  const titleLines = document.querySelectorAll('[data-animate="title-line"]');
  const heroGridEl = document.getElementById('hero-grid');
  
  // Select micro interface elements
  const microElements = [
    document.querySelector('.nav'),
    document.querySelector('.hero__eyebrow'),
    document.querySelector('.hero__meta'),
    document.querySelector('.hero__scroll')
  ];

  window.addEventListener('load', () => {
    // 0ms - film grain is active automatically via CSS

    // 400ms: Reveal grid lines
    setTimeout(() => {
      if (heroGridEl) heroGridEl.classList.add('is-loaded');
    }, 400);

    // 800ms: Micro interface details appear softly
    setTimeout(() => {
      microElements.forEach(el => {
        if (el) {
          el.classList.add('is-visible');
          if (el.classList.contains('nav')) el.classList.add('is-loaded');
        }
      });
    }, 800);

    // 1200ms: WOLFIM appears (authority emerging)
    setTimeout(() => {
      if (titleLines[0]) titleLines[0].classList.add('is-visible');
    }, 1200);

    // 1800ms: 57UD10 signature animation begins
    setTimeout(() => {
      if (titleLines[1]) titleLines[1].classList.add('is-visible');
      if (heroSepEl) heroSepEl.classList.add('is-visible');

      if (heroScrambleEl) {
        heroScrambleEl.classList.remove('hero__coded--waiting');
        scrambleText(heroScrambleEl, SCRAMBLE_FINAL, {
          cycleDuration: 800,
          charStagger: 180,
          cycleSpeed: 60,
          onComplete: function() {
            // After 57UD10 resolves, wait 3s then start the word sequence
            setTimeout(startHeroSequence, 3000);
          }
        });
      }
    }, 1800);

    // 2400ms: Description text and other fade-ups
    setTimeout(() => {
      const otherElements = document.querySelectorAll('.hero [data-animate="fade-up"]:not(.is-visible)');
      otherElements.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('is-visible');
        }, i * 150);
      });
    }, 2400);

    // 2800ms: System awake (ambient parallax begins)
    setTimeout(() => {
      document.body.classList.add('system-awake');
    }, 2800);
    // 3000ms: Unlock overflow for Fisheye effect
    setTimeout(() => {
      if (titleLines[0]) {
        titleLines[0].classList.add('is-unlocked');
        initFisheyeEffect(titleLines[0]);
      }
    }, 3000);
  });

  // ─── FISHEYE EFFECT LOGIC ───
  function initFisheyeEffect(container) {
    const text = container.textContent.trim();
    if (!text || container.dataset.fisheyeInit) return;
    container.dataset.fisheyeInit = "true";

    // Split text into spans
    container.innerHTML = '';
    const charElements = [];
    
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.className = 'fisheye-char';
      span.textContent = text[i];
      container.appendChild(span);
      charElements.push(span);
    }

    container.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const maxScale = 1.35;
      const influenceRadius = 150; // pixels

      charElements.forEach(char => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        
        const distance = Math.abs(mouseX - charCenterX);
        
        if (distance < influenceRadius) {
          // Normalize distance and calculate scale
          const factor = 1 - (distance / influenceRadius);
          // Non-linear easing for bubble effect
          const scale = 1 + (maxScale - 1) * Math.pow(factor, 1.5);
          char.style.transform = `scale(${scale})`;
          // Also subtly lower opacity of nearby chars
          char.style.opacity = 0.8 + (0.2 * Math.pow(factor, 2));
        } else {
          char.style.transform = `scale(1)`;
          char.style.opacity = 0.8;
        }
      });
    });

    container.addEventListener('mouseleave', () => {
      charElements.forEach(char => {
        char.style.transform = `scale(1)`;
        char.style.opacity = 1;
      });
    });
    
    container.addEventListener('mouseenter', () => {
      // Initialize states smoothly
      charElements.forEach(char => {
        char.style.opacity = 0.8;
      });
    });
  }

  // ─── HERO SCRAMBLE SEQUENCE ───
  // Cycles through words after the initial 57UD10 resolves
  const HERO_SEQUENCE = [
    { text: 'AI', delay: 3000 },
    { text: 'DESIGN', delay: 3000 },
    { text: 'vibe coding', delay: 3000 },
    { text: 'design systems', delay: 3000 },
    { text: 'ads', delay: 3000 },
  ];

  function getScrambleStyle(text) {
    if (text.length > 20) return { fontSize: '0.35em' };
    if (text.length > 16) return { fontSize: '0.45em' };
    return {};
  }

  function startHeroSequence() {
    var seqIndex = 0;

    function runNext() {
      if (seqIndex >= HERO_SEQUENCE.length) {
        // Loop back to 57UD10
        seqIndex = 0;
        heroScrambleEl.style.fontSize = '';
        scrambleText(heroScrambleEl, SCRAMBLE_FINAL, {
          cycleDuration: 800,
          charStagger: 180,
          cycleSpeed: 60,
          onComplete: function() {
            setTimeout(runNext, HERO_SEQUENCE[0].delay); // 3000ms, consistent with initial pause
          }
        });
        return;
      }

      var item = HERO_SEQUENCE[seqIndex];
      seqIndex++;

      // Apply dynamic font size for longer phrases
      var style = getScrambleStyle(item.text);
      if (style.fontSize) {
        heroScrambleEl.style.fontSize = style.fontSize;
      } else {
        heroScrambleEl.style.fontSize = '';
      }

      scrambleText(heroScrambleEl, item.text, {
        cycleDuration: 800,
        charStagger: 100,
        cycleSpeed: 50,
        onComplete: function() {
          setTimeout(runNext, item.delay);
        }
      });
    }

    runNext();
  }

  // Hover replay — re-scramble on mouseenter
  if (heroScrambleEl) {
    heroScrambleEl.addEventListener('mouseenter', () => {
      if (!scrambleAnimating) {
        scrambleText(heroScrambleEl, SCRAMBLE_FINAL, {
          cycleDuration: 600,
          charStagger: 120,
          cycleSpeed: 50,
        });
      }
    });
  }


  // ─── SMOOTH ANCHOR SCROLL ───
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });


  // ─── PARALLAX GRID LINES ───
  const gridLines = document.querySelectorAll('.hero__vline');

  function updateGridParallax() {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.hero').offsetHeight;

    if (scrollY < heroHeight) {
      const progress = scrollY / heroHeight;
      gridLines.forEach((line, i) => {
        const offset = progress * (10 + i * 5);
        line.style.transform = `translateY(${offset}px)`;
        line.style.opacity = 1 - progress * 0.5;
      });
    }
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateGridParallax);
  });


  // ─── PROJECT IMAGE HOVER EFFECT ───
  document.querySelectorAll('.project__image').forEach((img) => {
    img.addEventListener('mouseenter', function () {
      this.querySelector('.project__image-inner').style.transform = 'scale(1.03)';
      this.querySelector('.project__image-inner').style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    img.addEventListener('mouseleave', function () {
      this.querySelector('.project__image-inner').style.transform = 'scale(1)';
    });
  });



  // ─── SECTION OBSERVER ───
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section--active');
        }
      });
    },
    { threshold: 0.05 }
  );

  document.querySelectorAll('.section').forEach((section) => {
    sectionObserver.observe(section);
  });

  // ─── DYNAMIC TITLE WIDTH FOR DESCRIPTION ───
  const heroWolfim = document.getElementById('hero-wolfim');
  function syncWolfimWidth() {
    if (heroWolfim) {
      const width = heroWolfim.getBoundingClientRect().width;
      document.documentElement.style.setProperty('--wolfim-width', width + 'px');
    }
  }
  window.addEventListener('resize', syncWolfimWidth);
  document.fonts.ready.then(syncWolfimWidth);
  syncWolfimWidth();

  // ─── RANDOM ALTERNATING VIDEO EFFECTS ───
  const heroVideo = document.querySelector('.hero__scene-video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => {
      // If autoplay fails, we just silently ignore to prevent console spam, 
      // but enforcing muted = true above often fixes it.
    });
  }

  let nextEffectIsZoom = true;

  function triggerRandomEffect() {
    const videoCont = document.querySelector('.hero__scene');
    if (!videoCont) return;

    // 15% chance for the rare mega effect
    const isRareEffect = Math.random() < 0.15;

    if (isRareEffect) {
      videoCont.classList.add('scene-mega-drop');
      setTimeout(() => {
        videoCont.classList.remove('scene-mega-drop');
        scheduleNextEffect();
      }, 2000);
    } else {
      if (nextEffectIsZoom) {
        videoCont.classList.add('scene-zoomed');
        setTimeout(() => {
          videoCont.classList.remove('scene-zoomed');
          scheduleNextEffect();
        }, 3000);
      } else {
        videoCont.classList.add('scene-dropped');
        setTimeout(() => {
          videoCont.classList.remove('scene-dropped');
          scheduleNextEffect();
        }, 3000);
      }
      nextEffectIsZoom = !nextEffectIsZoom;
    }
  }

  function scheduleNextEffect() {
    const nextRandomTime = Math.random() * 10000 + 5000; // Between 5 and 15s
    setTimeout(triggerRandomEffect, nextRandomTime);
  }

  // Start the cycle a few seconds after initial load
  setTimeout(triggerRandomEffect, Math.random() * 5000 + 3000);

  // ─── ANALYTICS EVENT TRACKING ───
  function trackEvent(name, params) {
    if (typeof gtag === 'function') {
      gtag('event', name, params || {});
    }
  }

  // WhatsApp clicks
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('whatsapp_click', { location: link.closest('.contact__links') ? 'contact_section' : 'sticky_button' });
    });
  });

  // Pricing section view
  const pricingSection = document.getElementById('pricing');
  if (pricingSection && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackEvent('view_pricing');
        }
      });
    }, { threshold: 0.5 }).observe(pricingSection);
  }

  // ─── LAZY LOAD PROJECT VIDEOS ───
  const projectVideos = document.querySelectorAll('.project__video');
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.setAttribute('preload', 'auto');
          video.play().catch(() => {});
          videoObserver.unobserve(video);
        }
      });
    }, { rootMargin: '200px 0px' });

    projectVideos.forEach(video => {
      video.removeAttribute('autoplay');
      videoObserver.observe(video);
    });
  } else {
    // Fallback: just play all videos
    projectVideos.forEach(video => {
      video.setAttribute('preload', 'auto');
      video.play().catch(() => {});
    });
  }

})();
