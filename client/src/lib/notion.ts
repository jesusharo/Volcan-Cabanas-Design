// Mockup of a Notion API Client for Frontend Prototyping
// In a full-stack version, this would fetch from a real backend that securely calls Notion.

export interface Cabin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  price?: number;
}

export interface Tour {
  id: string;
  title: string;
  duration: string;
  price: number;
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
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      title: "Cabaña del Bosque",
      description: "Sumérgete en la tranquilidad de los árboles con vistas panorámicas increíbles.",
      imageUrl: "/src/assets/images/cabana_1.jpg",
      slug: "cabana-del-bosque",
      price: 1500
    },
    {
      id: "2",
      title: "Refugio del Volcán",
      description: "Despierta con la vista majestuosa del volcán en una cabaña rústica y moderna.",
      imageUrl: "/src/assets/images/cabana_2.jpg",
      slug: "refugio-del-volcan",
      price: 1800
    },
    {
      id: "3",
      title: "Cabaña Familiar",
      description: "Espacio amplio diseñado para crear recuerdos inolvidables en familia.",
      imageUrl: "/src/assets/images/cabana_3.jpg",
      slug: "cabana-familiar",
      price: 2500
    }
  ];
};

export const getTours = async (): Promise<Tour[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return [
    {
      id: "t1",
      title: "Ascenso al Cráter",
      duration: "6 horas",
      price: 800,
      imageUrl: "/src/assets/images/volcano-tour_1.jpg"
    },
    {
      id: "t2",
      title: "Caminata Botánica",
      duration: "3 horas",
      price: 450,
      imageUrl: "/src/assets/images/volcano-tour_2.jpg"
    }
  ];
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  return [
    { id: "1", author: "Ana L.", quote: "Una experiencia mágica, la cabaña era súper acogedora.", rating: 5 },
    { id: "2", author: "Carlos M.", quote: "El tour al volcán fue increíble, los guías muy expertos.", rating: 5 },
    { id: "3", author: "Sofia R.", quote: "El mejor lugar para desconectarse de la ciudad y conectar con la naturaleza.", rating: 5 }
  ];
};