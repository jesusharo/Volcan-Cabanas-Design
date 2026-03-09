import siteData from "./data.json";

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

export const getCabins = async (): Promise<Cabin[]> => {
  const data = (siteData.cabins as any[]).filter(
    c => c.slug !== 'renta-todo-el-sitio' && c.slug !== 'sin-nombre' && c.title !== 'Sin nombre'
  );
  const order = ["casa-de-campo-volcan", "cabana-santa-helena", "monte-etna", "refugio-krakatoa"];
  return data.sort((a, b) => {
    const ia = order.indexOf(a.slug);
    const ib = order.indexOf(b.slug);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
};

export const getExclusiveRental = async (): Promise<Cabin | null> => {
  const rental = (siteData.cabins as any[]).find(c => c.slug === 'renta-todo-el-sitio');
  return rental || null;
};

export const getInventionemData = async (): Promise<any> => {
  return siteData.inventionem;
};

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
