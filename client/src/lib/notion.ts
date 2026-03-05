import notionData from "./notion_data.json";

export interface TieredPrice {
  persons: number;
  price: number;
}

export interface Cabin {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  imageUrl: string;
  images: string[];
  capacity: string;
  rooms: number;
  bathrooms: number;
  bedsDetail: string;
  slug: string;
  price?: number;
  tieredPricing: TieredPrice[];
}

export const getCabins = async (): Promise<Cabin[]> => {
  const data = (notionData as any[]).filter(c => c.slug !== 'renta-todo-el-sitio');
  if (data.length > 0) return data;
  return getFallbackCabins();
};

export const getExclusiveRental = async (): Promise<Cabin | null> => {
  const rental = (notionData as any[]).find(c => c.slug === 'renta-todo-el-sitio');
  return rental || getExclusiveFallback();
};

function getExclusiveFallback(): Cabin {
  return {
    id: "exclusive",
    title: "Renta Todo el Sitio",
    description: "Experiencia exclusiva con acceso a todas las cabañas y áreas del complejo.",
    detailedDescription: "Renta completa del complejo ecoturístico para eventos privados, retiros corporativos o celebraciones familiares. Incluye acceso a todas las cabañas, áreas comunes, senderos y actividades.",
    capacity: "25",
    rooms: 4,
    bathrooms: 4,
    bedsDetail: "Todas las camas del complejo",
    imageUrl: "/assets/images/cabana_1.jpg",
    images: [
      "/assets/images/cabana_1.jpg",
      "/assets/images/cabana_2.jpg",
      "/assets/images/cabana_3.jpg",
      "/assets/images/krakatoa.jpg",
      "/assets/images/hiking.jpg",
      "/assets/images/horseback.jpg",
      "/assets/images/biking.jpg",
      "/assets/images/zipline.jpg",
      "/assets/images/volcano-tour_1.jpg",
      "/assets/images/volcano-tour_2.jpg",
    ],
    slug: "renta-todo-el-sitio",
    tieredPricing: [{persons: 25, price: 7500}]
  };
}

function getFallbackCabins(): Cabin[] {
  return [
    {
      id: "1",
      title: "Casa de Campo Volcán",
      description: "Vista espectacular al volcán, con amplios espacios ideales para familias.",
      detailedDescription: "Hospedaje premium de montaña con las mejores vistas al Volcán de Fuego. Amplias terrazas, chimenea y espacios diseñados para el descanso familiar en plena naturaleza.",
      capacity: "8",
      rooms: 3,
      bathrooms: 2,
      bedsDetail: "1 King size, 3 matrimoniales",
      imageUrl: "/assets/images/cabana_1.jpg",
      images: ["/assets/images/cabana_1.jpg", "/assets/images/cabana_2.jpg", "/assets/images/cabana_3.jpg"],
      slug: "casa-de-campo-volcan",
      tieredPricing: [{persons:2,price:800},{persons:4,price:900},{persons:6,price:1000},{persons:8,price:1100}]
    },
    {
      id: "2",
      title: "Cabaña Santa Helena",
      description: "Sostenibilidad y calidez en un ambiente que respeta la naturaleza.",
      detailedDescription: "Cabaña sostenible y familiar ideal para turismo de naturaleza. Diseño en madera con ático acogedor para niños y espacios cálidos que respetan el entorno.",
      capacity: "7",
      rooms: 2,
      bathrooms: 1,
      bedsDetail: "2 matrimoniales, 3 individuales",
      imageUrl: "/assets/images/cabana_2.jpg",
      images: ["/assets/images/cabana_2.jpg", "/assets/images/cabana_1.jpg", "/assets/images/krakatoa.jpg"],
      slug: "cabana-santa-helena",
      tieredPricing: [{persons:2,price:700},{persons:4,price:800},{persons:7,price:900}]
    },
    {
      id: "3",
      title: "Monte Etna",
      description: "Rústica y acogedora en el corazón profundo del bosque.",
      detailedDescription: "Cabaña rústica de madera y bambú para grupos de aventura. Un refugio entre pinos con acabados naturales y la energía del bosque profundo.",
      capacity: "4",
      rooms: 1,
      bathrooms: 1,
      bedsDetail: "1 King size, 1 sofá cama",
      imageUrl: "/assets/images/cabana_3.jpg",
      images: ["/assets/images/cabana_3.jpg", "/assets/images/krakatoa.jpg", "/assets/images/cabana_1.jpg"],
      slug: "monte-etna",
      tieredPricing: [{persons:2,price:600},{persons:4,price:700}]
    },
    {
      id: "4",
      title: "Refugio Krakatoa",
      description: "Experiencia térmica de piedra y mirador elevado hacia el coloso.",
      detailedDescription: "Glamping de piedra y ecoturismo para desconexión total. Construcción térmica con mirador elevado único hacia el volcán y noches estrelladas.",
      capacity: "2",
      rooms: 1,
      bathrooms: 1,
      bedsDetail: "1 King size",
      imageUrl: "/assets/images/krakatoa.jpg",
      images: ["/assets/images/krakatoa.jpg", "/assets/images/cabana_3.jpg", "/assets/images/cabana_2.jpg"],
      slug: "refugio-krakatoa",
      tieredPricing: [{persons:2,price:500}]
    }
  ];
}

export const getTours = async (): Promise<Tour[]> => {
  return [
    {
      id: "t1",
      title: "Sendero Aéreo",
      description: "Tirolesas extremas cruzando el dosel del bosque.",
      imageUrl: "/assets/images/zipline.jpg"
    },
    {
      id: "t2",
      title: "Caminata al Coloso",
      description: "Recorrido de 5 a 8 horas cruzando 3 ecosistemas únicos.",
      imageUrl: "/assets/images/hiking.jpg"
    },
    {
      id: "t3",
      title: "Paseos a Caballo",
      description: "Rutas tranquilas explorando los alrededores del volcán.",
      imageUrl: "/assets/images/horseback.jpg"
    },
    {
      id: "t4",
      title: "Ciclismo de Montaña",
      description: "Rutas de adrenalina y resistencia por los senderos del bosque.",
      imageUrl: "/assets/images/biking.jpg"
    }
  ];
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  return [
    { id: "1", author: "Ana L.", quote: "Una experiencia mágica, la Casa de Campo era súper acogedora y la vista impresionante.", rating: 5 },
    { id: "2", author: "Carlos M.", quote: "La caminata al coloso fue desafiante pero increíble. Los guías, de lo mejor.", rating: 5 },
    { id: "3", author: "Sofia R.", quote: "Poder traer a mi perrito y estar seguros en un entorno tan hermoso no tiene precio.", rating: 5 }
  ];
};
