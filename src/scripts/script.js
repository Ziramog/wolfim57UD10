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
      'hero.statement': 'Premium web design, digital catalogs and rebuilt sites that convert.',
      'hero.subtext': 'Custom websites, site reconstructions, visual catalogs and AI-powered production. For brands, properties, products and services.',
      'hero.tags': 'Web · Catalog · Rebuild · AI · SEO',
      'hero.cta_primary': 'Start my project',
      'hero.cta_secondary': 'Pricing',
      'hero.location': 'Buenos Aires <span class="hero__location-dot">●</span> Serving clients worldwide',
      'hero.cta_projects': 'View Work',
      'hero.cta_pricing': 'Pricing',
      'hero.scroll': 'Scroll',

      // Projects
      'projects.title': 'Selected<br>Work',
      'projects.subtitle': 'Websites and digital systems, built to perform',
      'projects.p1.title': 'Silvia Roggero<br>de Roma',
      'projects.p1.tag1': 'Immersive Web Reconstruction',
      'projects.p1.tag2': 'Real Estate',
      'projects.p1.desc': 'Complete redesign for a real estate company with existing presence. New site from scratch with premium aesthetics, video hero, property catalog, interactive maps, reviews and commercial tools to elevate brand perception and organize inquiries.',
      'projects.p2.title': 'S&amp;P<br>Cars',
      'projects.p2.tag1': 'Automotive Platform',
      'projects.p2.tag2': 'AI & Automation',
      'projects.p2.desc': 'High-performance digital platform for premium new and used car dealerships. AI-powered vehicle descriptions, advanced SEO architecture, side-by-side comparisons, and automated quoting — turning search traffic into closed sales.',
      'projects.p3.title': 'Construvial<br>S.A.',
      'projects.p3.tag1': 'Digital Commercial Catalog',
      'projects.p3.tag2': 'Construction & Machinery',
      'projects.p3.desc': 'Commercial catalog for a construction and machinery company. Organization of services, equipment, categories, images and technical data into a clear, professional visual piece ready to share via WhatsApp, email or PDF.',
      'projects.p4.title': 'KORANTIS<br>.COM',
      'projects.p4.tag1': 'AI Search Engine',
      'projects.p4.tag2': 'Web Platform',
      'projects.p4.desc': 'AI-powered restaurant and coffee shop search engine with conversational recommendations. Intelligent filtering, personalized suggestions, and a sleek interface that finds the perfect spot before you finish typing.',

      // Capabilities
      'capabilities.title': 'What We<br>Build',
      'capabilities.subtitle': 'Websites, systems, and everything between',
      'cap.a.title': 'Web Design & Development',
      'cap.a.desc': 'Premium custom-designed websites, fast, responsive and ready to convert visits into inquiries.',
      'cap.a.l1': 'Custom design',
      'cap.a.l2': 'Responsive development',
      'cap.a.l3': 'Content management',
      'cap.a.l4': 'Performance optimization',
      'cap.b.title': 'Web Reconstruction',
      'cap.b.desc': 'We transform old, generic or outdated websites into modern, visual and commercial digital experiences.',
      'cap.b.l1': 'Complete redesign',
      'cap.b.l2': 'New commercial structure',
      'cap.b.l3': 'Immersive hero',
      'cap.b.l4': 'Mobile first',
      'cap.c.title': 'Web Catalog',
      'cap.c.desc': 'Web catalogs to showcase properties, vehicles, lots, machinery or products with cards, filters and WhatsApp.',
      'cap.c.l1': 'Individual cards',
      'cap.c.l2': 'Filters & search',
      'cap.c.l3': 'Simple publishing panel',
      'cap.c.l4': 'WhatsApp per item',
      'cap.d.title': 'Express Catalog',
      'cap.d.desc': 'Commercial catalogs in HTML or PDF to present products, services or commercial lists in a clear and professional way.',
      'cap.d.l1': 'Visual design',
      'cap.d.l2': 'Categories & technical data',
      'cap.d.l3': 'PDF to share',
      'cap.d.l4': 'Fast delivery',
      'cap.e.title': 'AI Visual Production',
      'cap.e.desc': 'Using AI to enhance images, create background videos and visual pieces that elevate the presentation of properties, products or brands.',
      'cap.e.l1': 'Image enhancement',
      'cap.e.l2': 'Hero videos',
      'cap.e.l3': 'Social media pieces',
      'cap.e.l4': 'Before / after',
      'cap.f.title': 'SEO, Ads & Growth',
      'cap.f.desc': 'Technical SEO, campaigns and optimization so the website not only looks good, but starts generating opportunities.',
      'cap.f.l1': 'Technical SEO',
      'cap.f.l2': 'Google Ads',
      'cap.f.l3': 'Conversion & measurement',
      'cap.f.l4': 'Monthly reports',
      'cap.method.text': 'AI is not a separate layer: it runs through research, prototyping, visual production and optimization to build every service above with sharper decisions.',
      'cap.method.k1': 'Assisted research',
      'cap.method.k2': 'Prototyping',
      'cap.method.k3': 'Automation',
      'cap.method.k4': 'Optimization',

      // What You Get
      'systems.title': 'What You<br>Get',
      'systems.subtitle': 'Clear deliverables at the end of the project',
      'sys.a.title': 'Your<br>Website',
      'sys.a.desc': 'The final published website: responsive, fast, and ready for your business to receive inquiries from day one.',
      'sys.b.title': 'Content<br>System',
      'sys.b.desc': 'CMS access to update pages, publish content, and handle simple edits without needing a developer for every change.',
      'sys.c.title': 'Configured<br>Dashboard',
      'sys.c.desc': 'Access to your configured Google Analytics dashboard, with basic events and key metrics ready to review.',
      'sys.d.title': 'Credentials<br>& Access',
      'sys.d.desc': 'Admin users, access details, and hosting or domain references organized so you know what stays under your control.',
      'sys.e.title': 'Usage<br>Guide',
      'sys.e.desc': 'A basic guide for using the CMS, editing frequent content, and understanding which changes are better handled through support.',
      'sys.f.title': 'Ongoing<br>Support',
      'sys.f.desc': 'Post-launch support for adjustments, minor content changes, and operational questions once the site is in use.',

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
      'process.s3.desc': 'The design becomes a live website. Responsive development, CMS setup, technical structure, performance optimization, and the integrations your business needs. Tested thoroughly before launch.',
      'process.s3.duration': '2–4 Weeks',
      'process.s4.phase': 'Phase IV',
      'process.s4.title': 'Launch &amp;<br>Growth',
      'process.s4.desc': 'Your site goes live, stability is checked, access is organized, and the first adjustments are supported so the handoff is clear.',
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

      // Testimonials
      'testimonials.title': 'What our<br>clients say',
      'testimonials.subtitle': 'Real results, growing businesses',
      'testimonials.t1.quote': '"Silvia Roggero de Roma\'s site turned out impeccable. In 10 days we had a real estate platform with an integrated quoting tool, advanced SEO and direct Google Reviews connection. Leads increased from the first month."',
      'testimonials.t1.name': 'Silvia Roggero',
      'testimonials.t1.role': 'Real Estate Business, Buenos Aires',
      'testimonials.t2.quote': '"Wolfim understood exactly what we needed for S&P Cars. The platform loads in under 2 seconds, SEO is optimized and clients can compare vehicles side by side. Direct sales from the site."',
      'testimonials.t2.name': 'S&P Cars',
      'testimonials.t2.role': 'Premium car dealership, Buenos Aires',
      'testimonials.t3.quote': '"Korantis.com needed AI search that actually worked. Wolfim delivered a platform where users find restaurants in seconds, with conversational recommendations. User retention increased by 40%."',
      'testimonials.t3.name': 'Korantis',
      'testimonials.t3.role': 'AI search platform, Argentina',

      // Pricing
      'pricing.title': 'Clear Pricing.<br>No Surprises.',
      'pricing.subtitle': 'Base prices for standard or adaptable structures.',
      'pricing.setup': 'USD setup',
      'pricing.monthly': 'USD/mo',
      'pricing.terms': '50% upfront to begin',
      'pricing.p1.tag': 'Ideal to start',
      'pricing.p1.title': 'Landing',
      'pricing.p1.f1': 'Custom Design',
      'pricing.p1.f2': '1 Optimized Page',
      'pricing.p1.f3': 'Essential Business Sections',
      'pricing.p1.f4': 'WhatsApp + Contact Form',
      'pricing.p1.f5': 'Basic SEO',
      'pricing.p1.f6': 'Hosting + SSL Included',
      'pricing.p1.f7': '2 Weeks Delivery',
      'pricing.p1.note': 'Ideal for services, professionals, personal brands and businesses that need a simple presence.',
      'pricing.p2.tag': 'Most chosen',
      'pricing.p2.title': 'Professional',
      'pricing.p2.f1': 'Custom Design',
      'pricing.p2.f2': 'Up to 5 Pages',
      'pricing.p2.f3': 'Services, Company, Work & Contact',
      'pricing.p2.f4': 'Photo Gallery',
      'pricing.p2.f5': 'Optimized SEO',
      'pricing.p2.f6': 'Form + WhatsApp',
      'pricing.p2.f7': 'Hosting + SSL Included',
      'pricing.p2.f8': '2-3 Weeks Delivery',
      'pricing.p2.note': 'Ideal for companies, builders, studios, clinics, industries and businesses with more institutional content.',
      'pricing.p3.tag': 'For products & properties',
      'pricing.p3.title': 'Catalog',
      'pricing.p3.f1': 'Custom Design',
      'pricing.p3.f2': 'Adaptable Web Catalog',
      'pricing.p3.f3': 'Individual Cards',
      'pricing.p3.f4': 'Filters & Search',
      'pricing.p3.f5': 'WhatsApp per Item',
      'pricing.p3.f6': 'Simple Publishing Panel',
      'pricing.p3.f7': 'SEO per Card',
      'pricing.p3.f8': 'Hosting + SSL Included',
      'pricing.p3.f9': '3-4 Weeks Delivery',
      'pricing.p3.note': 'Ideal for real estate, car agencies, land developments, machinery, spare parts and businesses that need to show what they sell on their own website.',
      'pricing.p3.disclaimer': 'Base price applies to catalogs adapted over a replicable structure. Designs, filters, flows or different functionalities are quoted separately.',
      'pricing.p4.tag': 'Full online store',
      'pricing.p4.title': 'Ecommerce',
      'pricing.p4.f1': 'Custom Design',
      'pricing.p4.f2': 'Full Online Store',
      'pricing.p4.f3': 'Products, Cart & Checkout',
      'pricing.p4.f4': 'Payment Gateway',
      'pricing.p4.f5': 'Order Management',
      'pricing.p4.f6': 'Premium SEO',
      'pricing.p4.f7': 'Full Admin Panel',
      'pricing.p4.f8': 'Hosting + SSL Included',
      'pricing.p4.f9': '3-4 Weeks Delivery',
      'pricing.p4.note': 'Ideal for businesses that want to sell online with payments, cart and order management.',
      'pricing.p4.disclaimer': 'Final scope depends on products, payment methods, shipping and integrations.',
      'pricing.note': 'Monthly maintenance includes hosting, SSL, basic backups, technical support, security and minor changes according to plan. New sections, bulk content uploads, redesigns, integrations or additional functionalities are quoted separately.',
      'pricing.cta_button': 'Contact via WhatsApp',

      // Marquee
      'marquee.1': 'Custom Web',
      'marquee.2': 'Catalogs',
      'marquee.3': 'CMS',
      'marquee.4': 'Access',
      'marquee.5': 'Support',
      'marquee.6': 'Launch',

      // Contact
      'contact.title': 'Let\'s Build the Next<br>Digital Version of<br>Your Business',

      // Contact
      'contact.title': 'Let\'s Build the Next<br>Digital Version of<br>Your Business',
      'contact.desc': 'If you\'re looking for a website that reflects the real quality of your business — not a template with your logo on it — let\'s talk. I work directly with every client, from first conversation to launch.',
      'contact.schedule_label': 'Schedule',
      'contact.schedule_value': 'Book a free intro call',
      'contact.availability': 'Open agenda for new projects.',

      // Footer
      'footer.copy': '© ' + new Date().getFullYear() + ' — All rights reserved',
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
      'hero.statement': 'Diseño web premium para catálogos y sitios que venden mejor.',
      'hero.subtext': 'Diseño web a medida, rediseño de sitios, catálogos digitales y producción visual con IA para marcas, propiedades, productos y servicios.',
      'hero.tags': 'Web · Catálogo · Rediseño · IA · SEO',
      'hero.cta_primary': 'Empezar proyecto',
      'hero.cta_secondary': 'Ver trabajos',
      'hero.location': 'Buenos Aires <span class="hero__location-dot">●</span> Servicio remoto para clientes de todo el mundo',
      'hero.cta_projects': 'Ver Proyectos',
      'hero.cta_pricing': 'Precios',
      'hero.focus_label': 'Enfoque',
      'hero.focus_value': 'Diseño Web Premium &amp;<br>Sistemas Digitales',
      'hero.approach_label': 'Método',
      'hero.approach_value': 'Potenciado por IA &amp;<br>Orientado a Sistemas',
      'hero.scroll': 'Desplazar',

      // Projects
      'projects.title': 'Trabajos<br>recientes',
      'projects.subtitle': 'Sitios web y sistemas digitales construidos para rendir',
      'projects.p1.title': 'Silvia Roggero<br>de Roma',
      'projects.p1.tag1': 'Reconstrucción Web Inmersiva',
      'projects.p1.tag2': 'Real Estate',
      'projects.p1.desc': 'Rediseño completo para una inmobiliaria con presencia previa. Nuevo sitio desde cero con estética premium, hero en video, catálogo de propiedades, mapas interactivos, reseñas y herramientas comerciales para elevar la percepción de marca y ordenar las consultas.',
      'projects.p2.title': 'S&amp;P<br>Cars',
      'projects.p2.tag1': 'Plataforma automotriz',
      'projects.p2.tag2': 'IA y automatización',
      'projects.p2.desc': 'Plataforma digital de alto rendimiento para agencia de autos premium nuevos y usados. Descripciones de vehículos potenciadas por IA, arquitectura SEO avanzada, comparativas lado a lado y presupuestos automatizados para convertir tráfico de búsqueda en ventas.',
      'projects.p3.title': 'Construvial<br>S.A.',
      'projects.p3.tag1': 'Catálogo Comercial Digital',
      'projects.p3.tag2': 'Construcción & Maquinaria',
      'projects.p3.desc': 'Catálogo comercial para empresa de construcción y maquinaria. Organización de servicios, equipos, categorías, imágenes y datos técnicos en una pieza visual clara, profesional y lista para compartir por WhatsApp, email o PDF.',
      'projects.p4.title': 'KORANTIS<br>.COM',
      'projects.p4.tag1': 'Buscador con IA',
      'projects.p4.tag2': 'Plataforma web',
      'projects.p4.desc': 'Motor de búsqueda de restaurantes y cafeterías con recomendaciones conversacionales potenciadas por IA. Filtros inteligentes, sugerencias personalizadas e interfaz precisa para encontrar el lugar ideal antes de terminar de escribir.',

      // Capabilities
      'capabilities.title': 'Qué<br>construimos',
      'capabilities.subtitle': 'Sitios web, catálogos digitales y sistemas comerciales',
      'cap.a.title': 'Diseño web a medida',
      'cap.a.desc': 'Sitios web premium diseñados a medida, rápidos, responsivos y preparados para convertir visitas en consultas reales.',
      'cap.a.l1': 'Diseño personalizado',
      'cap.a.l2': 'Desarrollo responsivo',
      'cap.a.l3': 'Gestión de contenido',
      'cap.a.l4': 'Optimización de rendimiento',
      'cap.b.title': 'Reconstrucción Web',
      'cap.b.desc': 'Transformamos webs antiguas, genéricas o desactualizadas en experiencias digitales modernas, visuales y comerciales.',
      'cap.b.l1': 'Rediseño de sitio web',
      'cap.b.l2': 'Nueva estructura comercial',
      'cap.b.l3': 'Hero inmersivo',
      'cap.b.l4': 'Mobile first',
      'cap.c.title': 'Catálogo digital',
      'cap.c.desc': 'Catálogos digitales para propiedades, vehículos, lotes, maquinaria o productos, con fichas individuales, filtros, buscador y consultas por WhatsApp.',
      'cap.c.l1': 'Fichas individuales',
      'cap.c.l2': 'Filtros y buscador',
      'cap.c.l3': 'Panel simple de publicación',
      'cap.c.l4': 'WhatsApp por ítem',
      'cap.d.title': 'Catálogo Express',
      'cap.d.desc': 'Catálogos comerciales en HTML o PDF para presentar productos, servicios o listas comerciales de forma clara y profesional.',
      'cap.d.l1': 'Diseño visual',
      'cap.d.l2': 'Categorías y datos técnicos',
      'cap.d.l3': 'PDF para compartir',
      'cap.d.l4': 'Entrega rápida',
      'cap.e.title': 'Producción visual con IA',
      'cap.e.desc': 'Uso de IA para mejorar imágenes, crear videos de fondo y piezas visuales que elevan la presentación de propiedades, productos o marcas.',
      'cap.e.l1': 'Mejora de imágenes',
      'cap.e.l2': 'Videos para hero',
      'cap.e.l3': 'Piezas para redes',
      'cap.e.l4': 'Antes / después',
      'cap.f.title': 'SEO, Ads y crecimiento',
      'cap.f.desc': 'SEO técnico, campañas y optimización para que la web no solo se vea bien, sino que empiece a generar oportunidades.',
      'cap.f.l1': 'SEO técnico',
      'cap.f.l2': 'Google Ads',
      'cap.f.l3': 'Conversión y medición',
      'cap.f.l4': 'Reportes mensuales',
      'cap.method.text': 'La IA no aparece como una capa aparte: atraviesa investigación, prototipado, producción visual y optimización para construir mejor cada servicio de arriba.',
      'cap.method.k1': 'Investigación asistida',
      'cap.method.k2': 'Prototipado',
      'cap.method.k3': 'Automatización',
      'cap.method.k4': 'Optimización',

      // What You Get
      'systems.title': 'Qué<br>recibís',
      'systems.subtitle': 'Entregables claros al final del proyecto',
      'sys.a.title': 'Tu sitio<br>web',
      'sys.a.desc': 'El sitio final publicado, responsivo, rápido y preparado para que tu negocio pueda recibir consultas desde el primer día.',
      'sys.b.title': 'Sistema de<br>contenido',
      'sys.b.desc': 'Acceso al CMS para actualizar páginas, publicar contenido y hacer cambios simples sin depender de un desarrollador para cada ajuste.',
      'sys.c.title': 'Dashboard<br>configurado',
      'sys.c.desc': 'Acceso a tu dashboard de Google Analytics ya configurado, con eventos básicos y métricas clave listas para revisar.',
      'sys.d.title': 'Credenciales<br>y accesos',
      'sys.d.desc': 'Usuarios, accesos de administración y referencias de hosting o dominio ordenados para que sepas qué queda bajo tu control.',
      'sys.e.title': 'Guía<br>de uso',
      'sys.e.desc': 'Una guía básica para usar el CMS, editar contenidos frecuentes y entender qué cambios conviene pedir como soporte.',
      'sys.f.title': 'Soporte<br>continuo',
      'sys.f.desc': 'Acompañamiento post-lanzamiento para resolver ajustes, cambios menores y dudas operativas cuando el sitio ya está en uso.',

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
      'process.title': 'Cómo<br>trabajamos',
      'process.subtitle': 'Proceso claro, sin sorpresas',
      'process.duration_label': 'Duración típica',
      'process.s1.phase': 'Fase I',
      'process.s1.title': 'Conversación &amp;<br>estrategia',
      'process.s1.desc': 'Hablamos. Entiendo tu negocio, tu audiencia y lo que realmente necesitás. Definimos alcance, objetivos y dirección antes de diseñar cualquier pantalla.',
      'process.s1.duration': '1 semana',
      'process.s2.phase': 'Fase II',
      'process.s2.title': 'Diseño &amp;<br>dirección',
      'process.s2.desc': 'La dirección visual, los layouts y el sistema de diseño toman forma. Ves cómo se va a sentir tu sitio antes de escribir una sola línea de código.',
      'process.s2.duration': '1-2 semanas',
      'process.s3.phase': 'Fase III',
      'process.s3.title': 'Construcción &amp;<br>ajuste',
      'process.s3.desc': 'El diseño se convierte en un sitio web real. Desarrollo responsivo, CMS, estructura técnica, optimización de rendimiento e integraciones necesarias, todo probado antes del lanzamiento.',
      'process.s3.duration': '2-4 semanas',
      'process.s4.phase': 'Fase IV',
      'process.s4.title': 'Lanzamiento &amp;<br>crecimiento',
      'process.s4.desc': 'El sitio sale en vivo, revisamos estabilidad, dejamos accesos ordenados y acompañamos los primeros ajustes para que la transición sea clara.',
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

      // Testimonials
      'testimonials.title': 'Lo que dicen<br>nuestros clientes',
      'testimonials.subtitle': 'Resultados reales, negocios que crecen',
      'testimonials.t1.quote': '"El sitio de Silvia Roggero de Roma quedó impecable. En 10 días teníamos una plataforma inmobiliaria con cotizador integrado, SEO avanzado y conexión directa con Google Reviews. Los leads aumentaron desde el primer mes."',
      'testimonials.t1.name': 'Silvia Roggero',
      'testimonials.t1.role': 'Negocios Inmobiliarios, Buenos Aires',
      'testimonials.t2.quote': '"Wolfim entendió exactamente lo que necesitábamos para S&P Cars. La plataforma carga en menos de 2 segundos, el SEO está optimizado y los clientes pueden comparar vehículos lado a lado. Ventas directas desde el sitio."',
      'testimonials.t2.name': 'S&P Cars',
      'testimonials.t2.role': 'Agencia de autos premium, Buenos Aires',
      'testimonials.t3.quote': '"Korantis.com necesitaba una búsqueda con IA que funcionara de verdad. Wolfim entregó una plataforma donde los usuarios encuentran restaurantes en segundos, con recomendaciones conversacionales. La retención de usuarios subió un 40%."',
      'testimonials.t3.name': 'Korantis',
      'testimonials.t3.role': 'Plataforma de búsqueda con IA, Argentina',

      // Pricing
      'pricing.title': 'Precios Claros.<br>Sin Sorpresas.',
      'pricing.subtitle': 'Precios base para estructuras estándar o adaptables.',
      'pricing.setup': 'USD setup',
      'pricing.monthly': 'USD/mes',
      'pricing.terms': '50% adelantado para empezar',
      'pricing.p1.tag': 'Ideal para empezar',
      'pricing.p1.title': 'Landing',
      'pricing.p1.f1': 'Diseño Personalizado',
      'pricing.p1.f2': '1 Página Optimizada',
      'pricing.p1.f3': 'Secciones Esenciales del Negocio',
      'pricing.p1.f4': 'WhatsApp + Formulario',
      'pricing.p1.f5': 'SEO Básico',
      'pricing.p1.f6': 'Hosting + SSL Incluido',
      'pricing.p1.f7': 'Entrega en 2 Semanas',
      'pricing.p1.note': 'Ideal para servicios, profesionales, marcas personales y negocios que necesitan presencia simple.',
      'pricing.p2.tag': 'El más elegido',
      'pricing.p2.title': 'Profesional',
      'pricing.p2.f1': 'Diseño Personalizado',
      'pricing.p2.f2': 'Hasta 5 Páginas',
      'pricing.p2.f3': 'Servicios, Empresa, Trabajos y Contacto',
      'pricing.p2.f4': 'Galería de Fotos',
      'pricing.p2.f5': 'SEO Optimizado',
      'pricing.p2.f6': 'Formulario + WhatsApp',
      'pricing.p2.f7': 'Hosting + SSL Incluido',
      'pricing.p2.f8': 'Entrega en 2-3 Semanas',
      'pricing.p2.note': 'Ideal para empresas, constructoras, estudios, clínicas, industrias y negocios con más contenido institucional.',
      'pricing.p3.tag': 'Para productos y propiedades',
      'pricing.p3.title': 'Catálogo',
      'pricing.p3.f1': 'Diseño Personalizado',
      'pricing.p3.f2': 'Web Catálogo Adaptable',
      'pricing.p3.f3': 'Fichas Individuales',
      'pricing.p3.f4': 'Filtros y Buscador',
      'pricing.p3.f5': 'WhatsApp por Ítem',
      'pricing.p3.f6': 'Panel Simple de Publicación',
      'pricing.p3.f7': 'SEO por Ficha',
      'pricing.p3.f8': 'Hosting + SSL Incluido',
      'pricing.p3.f9': 'Entrega en 3-4 Semanas',
      'pricing.p3.note': 'Ideal para inmobiliarias, agencias de autos, loteos, maquinaria, repuestos y negocios que necesitan mostrar lo que venden en una web propia.',
      'pricing.p3.disclaimer': 'El precio base aplica sobre una estructura replicable. Diseños, filtros, flujos o funcionalidades diferentes se cotizan aparte.',
      'pricing.p4.tag': 'Tienda online completa',
      'pricing.p4.title': 'Ecommerce',
      'pricing.p4.f1': 'Diseño Personalizado',
      'pricing.p4.f2': 'Tienda Online Completa',
      'pricing.p4.f3': 'Productos, Carrito y Checkout',
      'pricing.p4.f4': 'Pasarela de Pagos',
      'pricing.p4.f5': 'Gestión de Pedidos',
      'pricing.p4.f6': 'SEO Premium',
      'pricing.p4.f7': 'Panel Admin Completo',
      'pricing.p4.f8': 'Hosting + SSL Incluido',
      'pricing.p4.f9': 'Entrega en 3-4 Semanas',
      'pricing.p4.note': 'Ideal para negocios que quieren vender online con pagos, carrito y gestión de pedidos.',
      'pricing.p4.disclaimer': 'El alcance final depende de productos, medios de pago, envíos e integraciones.',
      'pricing.note': 'El mantenimiento mensual incluye hosting, SSL, backups básicos, soporte técnico, seguridad y cambios menores según el plan. Nuevas secciones, carga masiva de contenido, rediseños, integraciones o funcionalidades adicionales se cotizan aparte.',
      'pricing.cta_button': 'Consultar por WhatsApp',

      // Marquee
      'marquee.1': 'Web a medida',
      'marquee.2': 'Catálogos',
      'marquee.3': 'CMS',
      'marquee.4': 'Accesos',
      'marquee.5': 'Soporte',
      'marquee.6': 'Lanzamiento',

      // Contact
      'contact.title': 'Construyamos la Próxima<br>Versión Digital de tu<br>Negocio',
      'contact.desc': 'Si buscás una web que refleje la calidad real de tu negocio — no una plantilla con tu logo — hablemos. Trabajo directamente con cada cliente, desde la primera conversación hasta el lanzamiento.',
      'contact.schedule_label': 'Agendar',
      'contact.schedule_value': 'Reservar una llamada introductoria gratuita',
      'contact.availability': 'Agenda abierta para nuevos proyectos.',

      // Footer
      'footer.copy': '© ' + new Date().getFullYear() + ' — Todos los derechos reservados',
    },
  };

  const metadata = {
    es: {
      title: 'Diseño web premium y catálogos digitales | Wolfim Studio',
      description: 'Diseño web premium a medida, rediseño de sitios, catálogos digitales, SEO y Google Ads para marcas, inmobiliarias, agencias de autos y negocios.',
      keywords: 'diseño web premium, diseño web a medida, rediseño de sitio web, catálogo digital de productos, catálogo online inmobiliaria, SEO para sitios web, Google Ads, sitios web para agencias de autos',
      ogTitle: 'Wolfim Studio — Diseño web premium y catálogos digitales',
      ogDescription: 'Sitios web a medida, rediseños, catálogos online y SEO para negocios que necesitan una presencia digital clara, rápida y comercial.',
      canonical: 'https://wolfim.com/',
    },
    en: {
      title: 'Premium Web Design and Digital Catalogs | Wolfim Studio',
      description: 'Premium custom web design, website redesigns, digital catalogs, SEO and Google Ads for brands, real estate firms, car dealerships and growing businesses.',
      keywords: 'premium web design, custom web design, website redesign, digital product catalog, real estate online catalog, SEO for websites, Google Ads, websites for car dealerships',
      ogTitle: 'Wolfim Studio — Premium web design and digital catalogs',
      ogDescription: 'Custom websites, redesigns, online catalogs and SEO for businesses that need a clear, fast and commercial digital presence.',
      canonical: 'https://wolfim.com/?lang=en',
    },
  };

  let currentLang = 'es';

  function setMeta(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute(attr, value);
    }
  }

  function updateMetadata(lang) {
    const meta = metadata[lang] || metadata.es;
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[name="keywords"]', 'content', meta.keywords);
    setMeta('meta[property="og:title"]', 'content', meta.ogTitle);
    setMeta('meta[property="og:description"]', 'content', meta.ogDescription);
    setMeta('meta[property="og:url"]', 'content', meta.canonical);
    setMeta('link[rel="canonical"]', 'href', meta.canonical);
  }

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
    updateMetadata(lang);

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

  // Restore URL language, saved preference, or default to Spanish
  try {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('lang');
    const saved = localStorage.getItem('wolfim-lang');
    if (requested && translations[requested]) {
      setLanguage(requested);
    } else if (saved && translations[saved]) {
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

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;
  let glowVisible = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!glowVisible) {
      glowX = mouseX;
      glowY = mouseY;
      glowVisible = true;
      glow.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
    glowVisible = false;
  });

  const heroContent = document.querySelector('.hero__content');
  const heroGridLines = document.querySelector('.hero__grid-lines');
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  });

  let cursorX = 0, cursorY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function animateCursor() {
    cursorX += (targetX - cursorX) * 0.12;
    cursorY += (targetY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    if (glowVisible) {
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
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
      // Open: snap to burger rect, then animate to full screen
      const r = menuBtn.getBoundingClientRect();
      const inset = `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px)`;
      mobileMenu.style.clipPath = inset;
      mobileMenu.style.transition = 'none';
      mobileMenu.classList.add('active');
      menuBtn.classList.add('open');

      setTimeout(() => {
        mobileMenu.style.transition = '';
        mobileMenu.style.clipPath = 'inset(0px 0px 0px 0px)';
      }, 30);
    } else {
      // Close: animate from full screen to burger rect
      mobileMenu.style.clipPath = 'inset(0px 0px 0px 0px)';
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
      mobileMenu.style.clipPath = 'inset(0px 0px 0px 0px)';
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
      mobileMenu.style.clipPath = 'inset(0px 0px 0px 0px)';
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

      // Also animate mobile scramble element
      const heroScrambleMobile = document.getElementById('hero-scramble-mobile');
      if (heroScrambleMobile) {
        heroScrambleMobile.classList.remove('hero__coded--waiting');
        scrambleText(heroScrambleMobile, SCRAMBLE_FINAL, {
          cycleDuration: 800,
          charStagger: 180,
          cycleSpeed: 60,
          onComplete: function() {
            setTimeout(function() {
              startMobileHeroSequence();
            }, 3000);
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

    // 3000ms: Scroll cipher animation begins
    setTimeout(() => {
      const scrollCipherEl = document.getElementById('scroll-cipher');
      if (scrollCipherEl) {
        scrambleText(scrollCipherEl, 'SCROLL', {
          cycleDuration: 600,
          charStagger: 120,
          cycleSpeed: 50,
          onComplete: function() {
            // After SCROLL resolves, restart scramble loop every 5s
            setInterval(function() {
              if (!scrambleAnimating) {
                scrambleText(scrollCipherEl, 'SCROLL', {
                  cycleDuration: 600,
                  charStagger: 120,
                  cycleSpeed: 50
                });
              }
            }, 5000);
          }
        });
      }
    }, 3000);

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
    { text: 'VIBE', delay: 3000 },
    { text: 'SYSTEMS', delay: 3000 },
    { text: 'ADS', delay: 3000 },
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

  // Mobile hero sequence — same words but on mobile element
  function startMobileHeroSequence() {
    var seqIndex = 0;
    var mobileEl = document.getElementById('hero-scramble-mobile');
    if (!mobileEl) return;

    function runNext() {
      if (seqIndex >= HERO_SEQUENCE.length) {
        seqIndex = 0;
        mobileEl.style.fontSize = '';
        scrambleText(mobileEl, SCRAMBLE_FINAL, {
          cycleDuration: 800,
          charStagger: 180,
          cycleSpeed: 60,
          onComplete: function() {
            setTimeout(runNext, HERO_SEQUENCE[0].delay);
          }
        });
        return;
      }

      var item = HERO_SEQUENCE[seqIndex];
      seqIndex++;

      var style = getScrambleStyle(item.text);
      if (style.fontSize) {
        mobileEl.style.fontSize = style.fontSize;
      } else {
        mobileEl.style.fontSize = '';
      }

      scrambleText(mobileEl, item.text, {
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

  var mobileScrambleEl = document.getElementById('hero-scramble-mobile');
  if (mobileScrambleEl) {
    mobileScrambleEl.addEventListener('mouseenter', () => {
      if (!scrambleAnimating) {
        scrambleText(mobileScrambleEl, SCRAMBLE_FINAL, {
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

  // ─── PROCESS STACKING CARDS ───
  const processCards = document.querySelectorAll('.process-card');
  const PROCESS_TOP = 100;
  const MAX_SCALE_LOSS = 0.06;

  function updateProcessStack() {
    processCards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const distFromTop = rect.top - PROCESS_TOP;
      if (distFromTop <= 0 && i < processCards.length - 1) {
        const nextCards = processCards.length - 1 - i;
        const overlap = Math.min(1, Math.abs(distFromTop) / card.offsetHeight);
        const scale = 1 - (overlap * MAX_SCALE_LOSS * nextCards * 0.25);
        card.style.transform = `scale(${Math.max(0.88, scale)})`;
        card.style.opacity = Math.max(0.5, 1 - overlap * 0.4);
      } else {
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
      }
    });
  }

  window.addEventListener('scroll', updateProcessStack, { passive: true });
  updateProcessStack();

})();
