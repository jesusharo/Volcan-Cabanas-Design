import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCabins, getTours, getTestimonials, getExclusiveRental, type Cabin, type Tour, type Testimonial } from "@/lib/notion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, CheckCircle2, PawPrint, ShieldCheck, Users, BedDouble, Bath, ChevronDown } from "lucide-react";
import { ReservationCalculator } from "@/components/ReservationCalculator";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_DATA } from "@/lib/config";
import { translations } from "@/lib/translations";

// --- CONFIGURACIÓN DE IMÁGENES (Vercel Blob URLs) ---
// Nota: Una vez subas las fotos a Vercel Blob, reemplazarás estas URLs 
// por las que te asigne el dashboard de Vercel.
const BLOB_IMAGES = {
  volcanHero: "/assets/images/volcan.jpg", // Fallback local mientras subes a Blob
  safariHero: "/assets/images/safari-hero.jpg",
  inventionem: "/assets/images/2.webp",
  organicos: "/assets/images/frescos.webp"
};

const DESC_TRUNCATE_LENGTH = 200;

function CabinSection({ cabin, index, onWhatsApp }: { cabin: Cabin; index: number; onWhatsApp: (msg: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();
  const descText = cabin.detailedDescription || cabin.description;
  const needsTruncation = descText.length > DESC_TRUNCATE_LENGTH;

  useEffect(() => {
    if (!cabin.images || cabin.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % cabin.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [cabin.images]);

  return (
    <article className={`w-full pt-12 ${index % 2 !== 0 ? 'bg-muted/50' : 'bg-background'}`}>
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-0">
        <div className="w-full max-w-5xl mx-auto h-[40vh] md:h-[55vh] overflow-hidden relative rounded-[32px] shadow-2xl">
          <div className="relative w-full h-full">
            {(cabin.images || [cabin.imageUrl]).map((img, i) => (
              <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <img src={img} alt={cabin.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {cabin.images?.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === currentImageIndex ? 'bg-white scale-125' : 'bg-white/40'}`} />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-12 py-10">
          <h3 className="text-3xl md:text-5xl font-serif font-bold mb-8">{cabin.title}</h3>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            <div className="flex-1 space-y-6">
              <div className="flex flex-wrap gap-6 py-4 border-b border-border/40">
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="p-2 rounded-xl bg-primary/10"><Users className="w-5 h-5" /></div>
                  <span className="font-semibold text-sm">{cabin.capacity} {t.cabins.capacity}</span>
                </div>
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="p-2 rounded-xl bg-primary/10"><BedDouble className="w-5 h-5" /></div>
                  <span className="font-semibold text-sm">{cabin.rooms} {t.cabins.rooms}</span>
                </div>
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="p-2 rounded-xl bg-primary/10"><Bath className="w-5 h-5" /></div>
                  <span className="font-semibold text-sm">{cabin.bathrooms} {t.cabins.bathrooms}</span>
                </div>
              </div>
              <div className="relative">
                <div className={`space-y-3 ${!expanded && needsTruncation ? 'max-h-[6.5rem] overflow-hidden' : ''}`}>
                  {descText.split(/\n\n|\n/).filter(Boolean).map((p, i) => (
                    <p key={i} className="text-base text-muted-foreground leading-relaxed">{p.trim()}</p>
                  ))}
                </div>
                {needsTruncation && (
                  <button onClick={() => setExpanded(!expanded)} className="mt-2 text-sm font-semibold text-accent flex items-center gap-1">
                    {expanded ? t.cabins.readLess : t.cabins.readMore} <ChevronDown className={`w-3.5 h-3.5 ${expanded ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            </div>
            <div className="w-full lg:w-[340px] shrink-0">
              <ReservationCalculator cabin={cabin} onWhatsApp={onWhatsApp} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const { language, t } = useLanguage();
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [scrollY, setScrollY] = useState(0);

  const scrollProgress = Math.min(scrollY / 800, 1);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    getCabins().then(setCabins);
    getTours().then(setTours);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppClick = (msg?: string) => window.open(`https://wa.me/523121500516?text=${encodeURIComponent(msg || "Hola")}`, '_blank');
  const heroData = SITE_DATA?.hero?.[language as 'es' | 'en'] || { tag: "BIENVENIDO", titulo: "Cabañas del Volcán", subtítulo: "Experiencia única.", boton: "RESERVAR" };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <Header />

      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => handleWhatsAppClick()} className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all"><MessageCircle className="w-7 h-7" /></button>
      </div>

      {/* Hero Section con Scroll Effect */}
      <section className="relative h-[150vh] bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <img 
            src={BLOB_IMAGES.volcanHero} 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: `brightness(${1 - (scrollProgress * 0.7)}) saturate(${1 - (scrollProgress * 0.2)})` }}
          />
          <div className="absolute inset-0 bg-[#1a1c2c] mix-blend-multiply" style={{ opacity: scrollProgress * 0.6 }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-20" />
          
          <div className="relative z-30 h-full flex flex-col justify-end items-center px-6 pb-24 text-center">
            <span className="text-accent tracking-[0.3em] font-bold uppercase text-xs mb-4">{heroData.tag}</span>
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">{heroData.titulo}</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-12">{heroData.subtítulo}</p>
            <button className="text-accent font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={() => document.getElementById('nuestras-cabanas')?.scrollIntoView({ behavior: 'smooth' })}>
              {heroData.boton} <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* Sección Cabañas */}
      <section id="nuestras-cabanas" className="w-full bg-background relative z-10 py-20">
        <div className="px-6 max-w-7xl mx-auto text-center mb-16">
          <span className="uppercase tracking-widest text-accent font-bold text-sm">{t.nav.hospedaje}</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mt-4">{t.cabins.title}</h2>
        </div>
        <div className="flex flex-col w-full">
          {cabins.filter(c => c.title && c.title !== "Sin nombre").map((cabin, index) => (
            <CabinSection key={cabin.id} cabin={cabin} index={index} onWhatsApp={handleWhatsAppClick} />
          ))}
        </div>
      </section>

      {/* Banners Navegación 50/50 */}
      <section className="flex flex-col md:flex-row w-full h-[600px] overflow-hidden bg-black">
        <a href="/inventionem" className="relative flex-1 group flex items-center justify-center">
          <img src={BLOB_IMAGES.inventionem} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
          <h2 className="relative z-20 text-4xl font-serif font-bold text-white tracking-widest">INVENTIONEM</h2>
        </a>
        <a href="/organicos" className="relative flex-1 group flex items-center justify-center">
          <img src={BLOB_IMAGES.organicos} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
          <h2 className="relative z-20 text-4xl font-serif font-bold text-white tracking-widest">ORGÁNICOS</h2>
        </a>
      </section>

      {/* Safari Section */}
      <section id="safari" className="py-24 px-4 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <img src={BLOB_IMAGES.safariHero} alt="Safari" className="rounded-[32px] shadow-2xl h-[500px] w-full object-cover" />
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold">{t.safari.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.safari.description}</p>
            <Button className="bg-primary text-black font-bold px-8 py-6 rounded-xl" onClick={() => handleWhatsAppClick("Info Safari")}>{t.safari.cta}</Button>
          </div>
        </div>
      </section>

      {/* Comodidades Corto */}
      <section className="py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <PawPrint className="w-8 h-8 mx-auto text-primary" />
            <h4 className="font-bold">Pet Friendly</h4>
          </div>
          <div className="text-center space-y-2">
            <ShieldCheck className="w-8 h-8 mx-auto text-primary" />
            <h4 className="font-bold">Seguridad 24/7</h4>
          </div>
          <div className="text-center space-y-2">
            <Users className="w-8 h-8 mx-auto text-primary" />
            <h4 className="font-bold">Eventos</h4>
          </div>
          <div className="text-center space-y-2">
            <BedDouble className="w-8 h-8 mx-auto text-primary" />
            <h4 className="font-bold">Confort Total</h4>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}