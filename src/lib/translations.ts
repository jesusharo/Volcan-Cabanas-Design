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
      tag: "DIÁLOGO CON LA NATURALEZA",
      title: "El Volcán a tus Pies, las Estrellas a tu Alcance.",
      subtitle: "Sin distracciones. Solo la arquitectura de la montaña y la pureza del entorno. Ven a vivir el privilegio de la simplicidad.",
      cta: "CONOCE NUESTRAS CABAÑAS",
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
      cta: "Ver Más",
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
      tag: "DIALOGUE WITH NATURE",
      title: "The Volcano at your Feet, the Stars within Reach.",
      subtitle: "No distractions. Only the mountain's architecture and the purity of the surroundings. Come experience the privilege of simplicity.",
      cta: "EXPLORE OUR CABINS",
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
      cta: "Learn More",
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
