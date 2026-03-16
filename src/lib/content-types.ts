/**
 * Interfaces para el objeto content.json que se almacena en Vercel Blob.
 */

export interface LocalizedString {
  es: string;
  en: string;
}

export interface TieredPrice {
  persons: number;
  price: number;
}

export interface CabinContent {
  title: string;
  description: string;
  detailedDescription: string;
  bedsDetail: string;
}

export interface Cabin {
  id: string;
  slug: string;
  imageUrl: string;
  images: string[];
  capacity: number;
  rooms: number;
  bathrooms: number;
  price?: number;
  tieredPricing: TieredPrice[];
  es: CabinContent;
  en: CabinContent;
}

export interface Tour {
  id: string;
  imageUrl: string;
  es: {
    title: string;
    description: string;
  };
  en: {
    title: string;
    description: string;
  };
}

export interface Testimonial {
  id: string;
  rating: number;
  es: {
    author: string;
    quote: string;
  };
  en: {
    author:string;
    quote: string;
  };
}

export interface InventionemSubject {
  title: LocalizedString;
  desc: LocalizedString;
}

export interface InventionemTab {
  id: string;
  label: LocalizedString;
  sublabel: LocalizedString;
  duration: string;
  description: LocalizedString;
  subjects: InventionemSubject[];
}

export interface ContentData {
  hero: {
    es: {
      tag: string;
      titulo: string;
      subtítulo: string;
      boton: string;
    };
    en: {
      tag: string;
      titulo: string;
      subtítulo: string;
      boton: string;
    };
  };
  cabins: Cabin[];
  exclusiveRental: Cabin;
  tours: Tour[];
  testimonials: Testimonial[];
  inventionem: {
    precios: {
      anual: string;
      mensual: string;
      externo: string;
    };
    contacto: {
      whatsapp: string;
      email: string;
    };
    tabs: {
      primary: InventionemTab;
      secondary: InventionemTab;
      highschool: InventionemTab;
    };
  };
}