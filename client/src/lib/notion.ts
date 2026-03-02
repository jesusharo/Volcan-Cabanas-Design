// Mockup of a Notion API Client for Frontend Prototyping
// In a full-stack version, this would fetch from a real backend that securely calls Notion.

export interface Cabin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  images: string[];
  capacity: string;
  rooms: number;
  bathrooms: number;
  bedsDetail: string;
  slug: string;
  price?: number;
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

export const getCabins = async (): Promise<Cabin[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      title: "Casa de Campo",
      description: "Vista espectacular al volcán, con amplios espacios ideales para familias.",
      capacity: "8",
      rooms: 3,
      bathrooms: 2,
      bedsDetail: "1 King size, 3 matrimoniales",
      imageUrl: "/src/assets/images/cabana_1.jpg",
      images: [
        "/src/assets/images/cabana_1.jpg",
        "/src/assets/images/cabana_2.jpg",
        "/src/assets/images/cabana_3.jpg"
      ],
      slug: "casa-de-campo"
    },
    {
      id: "2",
      title: "Cabaña Santa Helena",
      description: "Sostenibilidad y calidez en un ambiente que respeta la naturaleza.",
      capacity: "7",
      rooms: 2,
      bathrooms: 1,
      bedsDetail: "2 matrimoniales, 3 individuales",
      imageUrl: "/src/assets/images/cabana_2.jpg",
      images: [
        "/src/assets/images/cabana_2.jpg",
        "/src/assets/images/cabana_1.jpg",
        "/src/assets/images/krakatoa.jpg"
      ],
      slug: "cabana-santa-helena"
    },
    {
      id: "3",
      title: "Monte Etna",
      description: "Rústica y acogedora en el corazón profundo del bosque.",
      capacity: "4",
      rooms: 1,
      bathrooms: 1,
      bedsDetail: "1 King size, 1 sofá cama",
      imageUrl: "/src/assets/images/cabana_3.jpg",
      images: [
        "/src/assets/images/cabana_3.jpg",
        "/src/assets/images/krakatoa.jpg",
        "/src/assets/images/cabana_1.jpg"
      ],
      slug: "monte-etna"
    },
    {
      id: "4",
      title: "Refugio Krakatoa",
      description: "Experiencia térmica de piedra y mirador elevado hacia el coloso.",
      capacity: "2",
      rooms: 1,
      bathrooms: 1,
      bedsDetail: "1 King size",
      imageUrl: "/src/assets/images/krakatoa.jpg",
      images: [
        "/src/assets/images/krakatoa.jpg",
        "/src/assets/images/cabana_3.jpg",
        "/src/assets/images/cabana_2.jpg"
      ],
      slug: "refugio-krakatoa"
    }
  ];
};

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