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

export interface Tour {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  author: string;
  quote: string;
  rating: number;
}

const PLACEHOLDER_IMAGES = [
  "/src/assets/images/cabana_1.jpg",
  "/src/assets/images/cabana_2.jpg",
  "/src/assets/images/cabana_3.jpg",
  "/src/assets/images/krakatoa.jpg",
];

export const getCabins = async (): Promise<Cabin[]> => {
  try {
    const response = await fetch("/api/cabins");
    if (!response.ok) throw new Error("API error");
    const data: Cabin[] = await response.json();
    
    return data
      .filter((cabin) => cabin.slug !== "renta-todo-el-sitio")
      .reverse()
      .map((cabin, index) => ({
        ...cabin,
        imageUrl: cabin.imageUrl || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length],
        images: cabin.images.length > 0
          ? cabin.images
          : [PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]],
      }));
  } catch (error) {
    console.error("Error fetching cabins from API, using fallback:", error);
    return getFallbackCabins();
  }
};

export const getExclusiveRental = async (): Promise<Cabin | null> => {
  try {
    const response = await fetch("/api/cabins");
    if (!response.ok) throw new Error("API error");
    const data: Cabin[] = await response.json();
    const rental = data.find((cabin) => cabin.slug === "renta-todo-el-sitio");
    return rental || null;
  } catch {
    return null;
  }
};

function getFallbackCabins(): Cabin[] {
  return [
    {
      id: "1",
      title: "Casa de Campo",
      description: "Vista espectacular al volcán, con amplios espacios ideales para familias.",
      detailedDescription: "Hospedaje premium de montaña con las mejores vistas al Volcán de Fuego. Amplias terrazas, chimenea y espacios diseñados para el descanso familiar en plena naturaleza.",
      capacity: "8",
      rooms: 3,
      bathrooms: 2,
      bedsDetail: "1 King size, 3 matrimoniales",
      imageUrl: "/src/assets/images/cabana_1.jpg",
      images: ["/src/assets/images/cabana_1.jpg", "/src/assets/images/cabana_2.jpg", "/src/assets/images/cabana_3.jpg"],
      slug: "casa-de-campo",
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
      imageUrl: "/src/assets/images/cabana_2.jpg",
      images: ["/src/assets/images/cabana_2.jpg", "/src/assets/images/cabana_1.jpg", "/src/assets/images/krakatoa.jpg"],
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
      imageUrl: "/src/assets/images/cabana_3.jpg",
      images: ["/src/assets/images/cabana_3.jpg", "/src/assets/images/krakatoa.jpg", "/src/assets/images/cabana_1.jpg"],
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
      imageUrl: "/src/assets/images/krakatoa.jpg",
      images: ["/src/assets/images/krakatoa.jpg", "/src/assets/images/cabana_3.jpg", "/src/assets/images/cabana_2.jpg"],
      slug: "refugio-krakatoa",
      tieredPricing: [{persons:2,price:500}]
    }
  ];
}

export const getTours = async (): Promise<Tour[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return [
    {
      id: "t1",
      title: "Sendero Aéreo",
      description: "Tirolesas extremas cruzando el dosel del bosque.",
      imageUrl: "/src/assets/images/zipline.jpg"
    },
    {
      id: "t2",
      title: "Caminata al Coloso",
      description: "Recorrido de 5 a 8 horas cruzando 3 ecosistemas únicos.",
      imageUrl: "/src/assets/images/hiking.jpg"
    },
    {
      id: "t3",
      title: "Paseos a Caballo",
      description: "Rutas tranquilas explorando los alrededores del volcán.",
      imageUrl: "/src/assets/images/horseback.jpg"
    },
    {
      id: "t4",
      title: "Ciclismo de Montaña",
      description: "Rutas de adrenalina y resistencia por los senderos del bosque.",
      imageUrl: "/src/assets/images/biking.jpg"
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
