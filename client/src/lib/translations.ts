export type Language = 'es' | 'en';

export const translations = {
  es: {
    nav: {
      hospedaje: "Hospedaje",
      experiencias: "Experiencias",
      safari: "Safari Fotográfico",
      logistica: "Logística",
    },
    hero: {
      tag: "Eco-Turismo de Montaña",
      title: "Cabañas del Volcán",
      subtitle: "Naturaleza, confort y vistas inigualables.",
      cta: "Explorar Cabañas",
      scrollHint: "Haz scroll para que anochezca",
    },
    cabins: {
      title: "Nuestras Cabañas",
      subtitle: "Descubre nuestros espacios diseñados para integrarse armónicamente con el entorno natural, ofreciendo confort y vistas inigualables.",
      capacity: "Personas",
      max: "Máximo",
      rooms: "Habitaciones",
      bathrooms: "Baño",
      bathroomsPlural: "Baños",
      equipped: "Equipados",
      readMore: "Leer más…",
      readLess: "Leer menos",
    },
    exclusive: {
      tag: "Reserva Exclusiva",
      title: "Todo el Sitio para tu Evento",
      subtitle: "Disfruta de privacidad total. Ideal para retiros, retiros corporativos o reuniones familiares grandes.",
      price: "$7,500",
      currency: "MXN",
      duration: "2 Días / 1 Noche",
      capacity: "Hasta 25 Personas",
      facilities: "Acceso a todas las instalaciones",
      cta: "Consultar Fechas",
    },
    tours: {
      tag: "Tour X Volcán®",
      title: "Aventura y Ecoturismo",
      subtitle: "Experimenta el volcán desde su corazón. Actividades diseñadas para conectar con la naturaleza a través de la adrenalina y la contemplación.",
      learnMore: "Saber más",
    },
    safari: {
      title: "Safari Fotográfico",
      description: "Únete a nuestras expediciones especializadas para fotógrafos aficionados y profesionales. Captura la majestuosidad de las erupciones controladas, los paisajes nevados y la fauna endémica en sus mejores momentos de luz.",
      items: [
        "Guías expertos en locaciones de luz",
        "Acceso a miradores exclusivos",
        "Transporte seguro al amanecer/atardecer"
      ],
      cta: "Agendar Safari",
    },
    info: {
      title: "Información Importante",
      subtitle: "Todo lo que necesitas saber antes de tu visita.",
      pets: {
        title: "Pet Friendly",
        desc: "Tus mejores amigos son bienvenidos. Aplica una tarifa de limpieza de $100 MXN por mascota.",
      },
      security: {
        title: "Seguridad Total",
        desc: "Ubicación segura y cercada. Tranquilidad garantizada durante toda tu estadía en el bosque.",
      },
      hours: {
        title: "Horarios",
        desc: "Check-in a partir de las 3:00 PM. El check-out de visitas (no hospedados) es a las 10:00 PM.",
      }
    },
    calculator: {
      title: "¿Cuántas personas nos visitan?",
      pets: "¿Traes mascotas? (+$100)",
      total: "Total estimado",
      night: "por noche",
      cta: "Reservar por WhatsApp",
      consult: "Consultar por WhatsApp",
    },
    inventionem: {
      tag: "Escuela de Bosque",
      title: "Inventionem: Escuela de Bosque",
      subtitle: "Educación científica en un entorno natural único.",
      description: "Inventionem no es solo un restaurante, es un laboratorio de sentidos. Aquí, la fuerza del fuego volcánico se traduce en técnicas de vanguardia y emplatados que honran la geometría de la naturaleza.",
      cta: "Ver Más",
      credentials: {
        tag: "ACREDITACIÓN CIENTÍFICA",
        title: "Registro RENIECYT · CONACYT",
        subtitle: "Centro de investigación acreditado con capacidad en:",
        areas: ["Ingeniería", "Industria", "Energía", "Sustentabilidad Ambiental"],
      },
      tabs: {
        primary: {
          label: "Primaria",
          sublabel: "Educación Básica",
          duration: "5–7 años",
          description: "Formación integral basada en inteligencias múltiples, donde el bosque es el aula y la curiosidad es el motor del aprendizaje.",
          subjects: [
            { title: "Inteligencias Múltiples", desc: "Desarrollo cognitivo personalizado según las fortalezas de cada alumno." },
            { title: "Defensa Personal", desc: "Disciplina, autoconfianza y conciencia corporal desde temprana edad." },
            { title: "Supervivencia Básica", desc: "Habilidades prácticas en entornos naturales: orientación, fuego, refugio y agua." },
            { title: "Agroecología", desc: "Cultivo orgánico, compostaje y respeto por los ciclos de la tierra." },
          ],
        },
        secondary: {
          label: "Secundaria",
          sublabel: "Educación Media Básica",
          duration: "3 años",
          description: "Profundización académica combinada con saberes ancestrales y ciencias aplicadas al bienestar.",
          subjects: [
            { title: "Materias Base", desc: "Matemáticas, Español, Historia, Geografía y Ciencias Naturales." },
            { title: "Física y Química", desc: "Laboratorio vivo en el bosque: experimentos con materiales del entorno." },
            { title: "Plantas Medicinales", desc: "Etnobotánica aplicada: identificación, cultivo y preparación de remedios naturales." },
            { title: "Teoría de la Felicidad", desc: "Filosofía práctica del bienestar emocional y la inteligencia emocional." },
            { title: "Economía", desc: "Fundamentos de economía sostenible, comercio justo y emprendimiento social." },
          ],
        },
        highschool: {
          label: "Bachillerato",
          sublabel: "Educación Media Superior",
          duration: "3 años",
          description: "Preparación avanzada para la formación de capital intelectual y desarrollo de propiedad industrial.",
          subjects: [
            { title: "Propiedad Intelectual", desc: "Registro de patentes, marcas y derechos de autor como herramientas de innovación." },
            { title: "Modelos de Utilidad", desc: "Diseño y protección legal de invenciones prácticas con impacto real." },
            { title: "Simulación con Métodos Numéricos", desc: "Modelado computacional para resolver problemas de ingeniería y ciencias." },
            { title: "Análisis de Ciclo de Vida", desc: "Evaluación del impacto ambiental de productos y procesos desde la cuna hasta la tumba." },
          ],
        },
      },
      openEducation: {
        title: "Educación Abierta y Transparente",
        flexTitle: "Inscripción Flexible",
        flexDesc: "Los alumnos pueden incorporarse en cualquier momento del año escolar. Nuestro modelo adaptativo permite la integración inmediata.",
        youtubeTitle: "Monitoreo en Tiempo Real",
        youtubeDesc: "Los padres pueden observar a sus hijos aprender en locaciones de bosque, campo y ciudad a través de nuestro canal de YouTube en vivo.",
      },
      pricing: {
        title: "Inversión Educativa",
        subtitle: "Planes diseñados para diferentes necesidades y presupuestos.",
        cards: [
          {
            name: "Estudiante de Bosque",
            price: "$24,995",
            period: "anual",
            monthly: "o parcialidades de $2,850/mes",
            features: [
              "Hospedaje completo",
              "Tutoría personalizada",
              "Material didáctico incluido",
              "Campamentos de investigación gratuitos",
            ],
            highlight: true,
          },
          {
            name: "Externos / Campamentos",
            price: "$9,000",
            period: "por persona",
            monthly: "programa completo",
            features: [
              "Vida agreste guiada",
              "Alimentación incluida",
              "Materiales didácticos",
              "Certificado de participación",
            ],
            highlight: false,
          },
          {
            name: "Empresas",
            price: "Cotización",
            period: "personalizada",
            monthly: "consultoría especializada",
            features: [
              "Evaluadores CONACYT certificados",
              "Desarrollo de nuevos productos",
              "Procesos amigables con el ambiente",
              "Asesoría en propiedad intelectual",
            ],
            highlight: false,
          },
        ],
      },
      expertise: {
        title: "Áreas de Experticia",
        areas: [
          { title: "Arquitectura Bioclimática", desc: "Diseño de espacios que aprovechan las condiciones naturales del clima." },
          { title: "Innovación Disruptiva", desc: "Metodologías para crear soluciones que transforman industrias." },
          { title: "Agrobiotecnología", desc: "Aplicación de biotecnología en sistemas agrícolas sostenibles." },
          { title: "Gestión de Ríos", desc: "Manejo integral de cuencas hidrológicas y conservación del agua." },
        ],
      },
      alliances: {
        title: "Alianzas Académicas",
        partners: [
          "Universidad de Colima",
          "Tecnológico de Colima",
          "UNPI",
          "Pontificia Universidad Católica de Valparaíso",
        ],
      },
    },
    organicos: {
      tag: "Del Campo a tu Mesa",
      title: "Frescos y Orgánicos: Del Campo a tu Ser",
      subtitle: "Nutrición consciente cultivada en tierra volcánica.",
      description: "Creemos que la verdadera salud comienza en el suelo. En nuestra huerta del Ejido San Antonio, cultivamos ingredientes libres de químicos, respetando los tiempos de la tierra y la pureza del agua de montaña. Sabor honesto, cosecha real.",
      cta: "Ver Más",
    },
    frescos: {
      title: "Del Campo a tu Mesa",
      description: "Creemos en la pureza. Todos nuestros ingredientes son cultivados de manera orgánica en el Ejido San Antonio, garantizando frescura total y respeto por el medio ambiente.",
      items: [
        { title: "Cosecha Local", desc: "Ingredientes frescos recolectados diariamente de nuestras tierras." },
        { title: "Sin Pesticidas", desc: "Cultivos 100% orgánicos, libres de químicos y respetuosos con la salud." },
        { title: "Apoyo al Productor", desc: "Fomentamos el comercio justo y el crecimiento de nuestra comunidad local." }
      ]
    },
    howToGet: "¿Cómo llegar?",
    howToGetDesc: "Kilometro 0.5 de la brecha de la Yerbabuena al Volcán en el Ejido San Antonio, Comala, Colima, México",
  },
  en: {
    nav: {
      hospedaje: "Lodging",
      experiencias: "Experiences",
      safari: "Photo Safari",
      logistica: "Logistics",
    },
    hero: {
      tag: "Mountain Eco-Tourism",
      title: "Volcano Cabins",
      subtitle: "Nature, comfort, and unparalleled views.",
      cta: "Explore Cabins",
      scrollHint: "Scroll to make it night",
    },
    cabins: {
      title: "Our Cabins",
      subtitle: "Discover our spaces designed to integrate harmoniously with the natural environment, offering comfort and unique views.",
      capacity: "People",
      max: "Maximum",
      rooms: "Bedrooms",
      bathrooms: "Bathroom",
      bathroomsPlural: "Bathrooms",
      equipped: "Equipped",
      readMore: "Read more…",
      readLess: "Read less",
    },
    exclusive: {
      tag: "Exclusive Booking",
      title: "Entire Site for Your Event",
      subtitle: "Enjoy total privacy. Ideal for retreats, corporate events, or large family gatherings.",
      price: "$7,500",
      currency: "MXN",
      duration: "2 Days / 1 Night",
      capacity: "Up to 25 People",
      facilities: "Access to all facilities",
      cta: "Check Dates",
    },
    tours: {
      tag: "Volcano Tour®",
      title: "Adventure & Eco-tourism",
      subtitle: "Experience the volcano from its heart. Activities designed to connect with nature through adrenaline and contemplation.",
      learnMore: "Learn more",
    },
    safari: {
      title: "Photo Safari",
      description: "Join our specialized expeditions for amateur and professional photographers. Capture the majesty of controlled eruptions, snowy landscapes, and endemic fauna in their best light moments.",
      items: [
        "Expert guides in lighting locations",
        "Access to exclusive viewpoints",
        "Safe transport at sunrise/sunset"
      ],
      cta: "Schedule Safari",
    },
    info: {
      title: "Important Information",
      subtitle: "Everything you need to know before your visit.",
      pets: {
        title: "Pet Friendly",
        desc: "Your best friends are welcome. A $100 MXN cleaning fee per pet applies.",
      },
      security: {
        title: "Total Security",
        desc: "Safe and fenced location. Peace of mind guaranteed throughout your stay in the forest.",
      },
      hours: {
        title: "Schedules",
        desc: "Check-in from 3:00 PM. Visitor check-out (non-guests) is at 10:00 PM.",
      }
    },
    calculator: {
      title: "How many people are visiting?",
      pets: "Bringing pets? (+$100)",
      total: "Estimated total",
      night: "per night",
      cta: "Book via WhatsApp",
      consult: "Inquire via WhatsApp",
    },
    inventionem: {
      tag: "Forest School",
      title: "Inventionem: Forest School",
      subtitle: "Scientific education in a unique natural environment.",
      description: "Inventionem is not just a restaurant; it's a laboratory of the senses. Here, the power of volcanic fire translates into avant-garde techniques and plating that honors the geometry of nature.",
      cta: "Learn More",
      credentials: {
        tag: "SCIENTIFIC ACCREDITATION",
        title: "RENIECYT Registry · CONACYT",
        subtitle: "Accredited research center with capabilities in:",
        areas: ["Engineering", "Industry", "Energy", "Environmental Sustainability"],
      },
      tabs: {
        primary: {
          label: "Elementary",
          sublabel: "Basic Education",
          duration: "5–7 years",
          description: "Comprehensive training based on multiple intelligences, where the forest is the classroom and curiosity drives learning.",
          subjects: [
            { title: "Multiple Intelligences", desc: "Personalized cognitive development based on each student's strengths." },
            { title: "Self-Defense", desc: "Discipline, self-confidence, and body awareness from an early age." },
            { title: "Basic Survival", desc: "Practical skills in natural environments: navigation, fire, shelter, and water." },
            { title: "Agroecology", desc: "Organic farming, composting, and respect for the earth's cycles." },
          ],
        },
        secondary: {
          label: "Middle School",
          sublabel: "Basic Secondary Education",
          duration: "3 years",
          description: "Academic deepening combined with ancestral knowledge and applied sciences for well-being.",
          subjects: [
            { title: "Core Subjects", desc: "Mathematics, Language Arts, History, Geography, and Natural Sciences." },
            { title: "Physics & Chemistry", desc: "Living laboratory in the forest: experiments with materials from the environment." },
            { title: "Medicinal Plants", desc: "Applied ethnobotany: identification, cultivation, and preparation of natural remedies." },
            { title: "Theory of Happiness", desc: "Practical philosophy of emotional well-being and emotional intelligence." },
            { title: "Economics", desc: "Fundamentals of sustainable economy, fair trade, and social entrepreneurship." },
          ],
        },
        highschool: {
          label: "High School",
          sublabel: "Upper Secondary Education",
          duration: "3 years",
          description: "Advanced preparation for intellectual capital formation and industrial property development.",
          subjects: [
            { title: "Intellectual Property", desc: "Patent, trademark, and copyright registration as innovation tools." },
            { title: "Utility Models", desc: "Design and legal protection of practical inventions with real impact." },
            { title: "Numerical Methods Simulation", desc: "Computational modeling to solve engineering and science problems." },
            { title: "Life Cycle Analysis", desc: "Environmental impact assessment of products and processes from cradle to grave." },
          ],
        },
      },
      openEducation: {
        title: "Open & Transparent Education",
        flexTitle: "Flexible Enrollment",
        flexDesc: "Students can join at any time during the school year. Our adaptive model allows immediate integration.",
        youtubeTitle: "Real-Time Monitoring",
        youtubeDesc: "Parents can observe their children learning in forest, field, and city locations through our live YouTube channel.",
      },
      pricing: {
        title: "Educational Investment",
        subtitle: "Plans designed for different needs and budgets.",
        cards: [
          {
            name: "Forest Student",
            price: "$24,995",
            period: "annual",
            monthly: "or installments of $2,850/month",
            features: [
              "Full accommodation",
              "Personalized tutoring",
              "Teaching materials included",
              "Free research camps",
            ],
            highlight: true,
          },
          {
            name: "External / Camps",
            price: "$9,000",
            period: "per person",
            monthly: "complete program",
            features: [
              "Guided wilderness experience",
              "Meals included",
              "Teaching materials",
              "Certificate of participation",
            ],
            highlight: false,
          },
          {
            name: "Enterprises",
            price: "Custom",
            period: "quote",
            monthly: "specialized consulting",
            features: [
              "Certified CONACYT evaluators",
              "New product development",
              "Eco-friendly processes",
              "Intellectual property advisory",
            ],
            highlight: false,
          },
        ],
      },
      expertise: {
        title: "Areas of Expertise",
        areas: [
          { title: "Bioclimatic Architecture", desc: "Design of spaces that harness natural climate conditions." },
          { title: "Disruptive Innovation", desc: "Methodologies for creating solutions that transform industries." },
          { title: "Agrobiotechnology", desc: "Application of biotechnology in sustainable agricultural systems." },
          { title: "River Management", desc: "Integrated watershed management and water conservation." },
        ],
      },
      alliances: {
        title: "Academic Alliances",
        partners: [
          "Universidad de Colima",
          "Tecnológico de Colima",
          "UNPI",
          "Pontificia Universidad Católica de Valparaíso",
        ],
      },
    },
    organicos: {
      tag: "Farm to Table",
      title: "Fresh & Organic: From Field to Being",
      subtitle: "Conscious nutrition grown in volcanic soil.",
      description: "We believe true health begins in the soil. In our orchard at Ejido San Antonio, we grow chemical-free ingredients, respecting the earth's cycles and the purity of mountain water. Honest flavor, real harvest.",
      cta: "Learn More",
    },
    frescos: {
      title: "From Farm to Table",
      description: "We believe in purity. All our ingredients are organically grown in Ejido San Antonio, guaranteeing total freshness and respect for the environment.",
      items: [
        { title: "Local Harvest", desc: "Fresh ingredients collected daily from our lands." },
        { title: "Pesticide Free", desc: "100% organic crops, free of chemicals and health-conscious." },
        { title: "Producer Support", desc: "We promote fair trade and the growth of our local community." }
      ]
    },
    howToGet: "How to get there?",
    howToGetDesc: "Kilometer 0.5 of the Yerbabuena to Volcano road, in Ejido San Antonio, Comala, Colima, Mexico.",
  }
};
