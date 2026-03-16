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

const DESC_TRUNCATE_LENGTH = 200;

function CabinSection({ cabin, index, onWhatsApp }: { cabin: Cabin; index: number; onWhatsApp: (msg: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { t } = useLanguage();
  const descText = cabin.detailedDescription || cabin.description;
  const needsTruncation = descText.length > DESC_TRUNCATE_LENGTH;

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setCurrentImageIndex((prev) => (prev + 1) % (cabin.images?.length || 1));
    } else if (isRightSwipe) {
      setCurrentImageIndex((prev) => (prev - 1 + (cabin.images?.length || 1)) % (cabin.images?.length || 1));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    if (!cabin.images || cabin.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % cabin.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [cabin.images]);

  return (
    <article
      id={`cabin-detail-${cabin.id}`}
      className={`w-full pt-12 ${index % 2 !== 0 ? 'bg-muted/50' : 'bg-background'}`}
    >
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-0">
        <div 
          className="w-full max-w-5xl mx-auto h-[40vh] md:h-[55vh] overflow-hidden relative rounded-[32px] shadow-2xl cursor-grab active:cursor-grabbing select-none touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative w-full h-full">
            {cabin.images?.map((img, i) => (
              <div 
                key={i} 
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  i === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={img}
                  alt={`${cabin.title} - imagen ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-none">
            {cabin.images?.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full shadow-sm transition-all duration-300 ${
                  i === currentImageIndex ? 'bg-white scale-125' : 'bg-white/40'
                }`} 
              />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-12 py-10 md:py-14">
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-8">{cabin.title}</h3>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            <div className="flex-1 space-y-6">
              <div className="flex flex-wrap gap-6 py-4 border-b border-border/40">
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="p-2 rounded-xl bg-primary/10"><Users className="w-5 h-5" /></div>
                  <div>
                    <span className="font-semibold text-sm block">{cabin.capacity} {t.cabins.capacity}</span>
                    <span className="text-xs text-muted-foreground">{t.cabins.max}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="p-2 rounded-xl bg-primary/10"><BedDouble className="w-5 h-5" /></div>
                  <div>
                    <span className="font-semibold text-sm block">{cabin.rooms} {t.cabins.rooms}</span>
                    <span className="text-xs text-muted-foreground">{cabin.bedsDetail}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="p-2 rounded-xl bg-primary/10"><Bath className="w-5 h-5" /></div>
                  <div>
                    <span className="font-semibold text-sm block">{cabin.bathrooms} {cabin.bathrooms === 1 ? t.cabins.bathrooms : t.cabins.bathroomsPlural}</span>
                    <span className="text-xs text-muted-foreground">{t.cabins.equipped}</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className={`space-y-3 ${!expanded && needsTruncation ? 'max-h-[6.5rem] overflow-hidden' : ''}`}>
                  {descText.split(/\n\n|\n/).filter(Boolean).map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-base text-muted-foreground leading-relaxed">{paragraph.trim()}</p>
                  ))}
                </div>
                {needsTruncation && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex mt-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors items-center gap-1"
                  >
                    {expanded ? t.cabins.readLess : t.cabins.readMore}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
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

function ExclusiveSection({ t, onWhatsApp, exclusiveData }: { t: typeof translations.es; onWhatsApp: (msg: string) => void; exclusiveData: Cabin | null }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (!exclusiveData || !exclusiveData.images || exclusiveData.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % exclusiveData.images.length);
    }, 30000);
    return () => clearInterval(interval);
  }, [exclusiveData]);

  if (!exclusiveData) return null;
  const images = exclusiveData.images && exclusiveData.images.length > 0 ? exclusiveData.images : [exclusiveData.imageUrl];

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden min-h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${idx === currentImgIndex ? "opacity-100" : "opacity-0"}`}
          >
            <div className={`w-full h-full bg-cover bg-center ${idx === currentImgIndex ? "animate-ken-burns" : ""}`} style={{ backgroundImage: `url(${img})` }} />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>
      <div className="max-w-5xl mx-auto text-center relative z-20 space-y-6">
        <span className="uppercase tracking-widest text-accent font-bold text-sm">{t.exclusive.tag}</span>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white text-shadow-lg">{t.exclusive.title}</h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">{t.exclusive.subtitle}</p>
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-[32px] max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl mt-10">
          <div className="text-left">
            <p className="text-3xl font-bold text-accent mb-1">{t.exclusive.price} <span className="text-sm font-normal text-white/80 uppercase tracking-widest">{t.exclusive.currency}</span></p>
            <p className="font-medium text-white">{t.exclusive.duration}</p>
          </div>
          <div className="text-left">
            <p className="font-semibold text-white text-lg flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-accent"/> {t.exclusive.capacity}</p>
            <p className="text-white/70 text-sm mt-1">{t.exclusive.facilities}</p>
          </div>
          <Button className="bg-accent text-black font-bold hover:bg-accent/90 border-0 px-8 py-6 rounded-xl uppercase tracking-widest" onClick={() => onWhatsApp("Hola, me interesa la reserva exclusiva.")}>
            {t.exclusive.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { language, t } = useLanguage();
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [safariImage, setSafariImage] = useState("/assets/images/safari-hero.jpg");
  const [exclusiveImages, setExclusiveImages] = useState<string[]>([]);
  const [exclusiveData, setExclusiveData] = useState<Cabin | null>(null);

  const scrollProgress = Math.min(scrollY / 800, 1);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    getCabins().then(setCabins);
    getTours().then(setTours);
    getExclusiveRental().then((data) => {
      setExclusiveData(data);
      if (data?.images?.length) {
        setExclusiveImages(data.images);
        if (data.images.length >= 2) setSafariImage(data.images[1]);
      }
    });
  }, []);

  const handleWhatsAppClick = (msg?: string) => {
    window.open(`https://wa.me/523121500516?text=${encodeURIComponent(msg || "Hola")}`, '_blank');
  };

  const heroData = SITE_DATA?.hero?.[language as 'es' | 'en'] || { tag: "BIENVENIDO", titulo: "Cabañas del Volcán", subtítulo: "Experiencia única.", boton: "RESERVAR" };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <div className="fixed inset-0 pointer-events-none bg-noise z-50 mix-blend-overlay"></div>
      <Header />

      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => handleWhatsAppClick()} className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all"><MessageCircle className="w-7 h-7" /></button>
      </div>

      <section id="hospedaje" className="relative h-[150vh] w-full bg-background">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Night Volcano Layer */}
          <div className="absolute inset-0 z-15 pointer-events-none" style={{ opacity: scrollProgress }}>
            <img src="/assets/images/volcan.jpg" alt="Vista Nocturna" className="w-full h-full object-cover" />
          </div>

          {/* Day Volcano Layer */}
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ opacity: 1 - scrollProgress }}>
            <img 
              src="/assets/images/volcan.jpg" 
              alt="Vista Diurna" 
              className="w-full h-full object-cover"
              style={{ filter: `brightness(${1 - (scrollProgress * 0.7)}) saturate(${1 - (scrollProgress * 0.2)})` }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 pointer-events-none" />
          <div className="relative z-30 h-full flex flex-col justify-end items-center px-6 pb-10 text-center">
            <span className="text-[#C0CE00] tracking-[0.3em] font-bold uppercase text-xs mb-4">{heroData.tag}</span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">{heroData.titulo}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-12">{heroData.subtítulo}</p>
            <button className="text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: '#C0CE02' }} onClick={() => document.getElementById('nuestras-cabanas')?.scrollIntoView({ behavior: 'smooth' })}>
              {heroData.boton} <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      <section id="nuestras-cabanas" className="w-full bg-background relative z-10">
        <div className="py-20 px-6 max-w-7xl mx-auto text-center">
          <span className="uppercase tracking-widest text-accent font-bold text-sm">{t.nav.hospedaje}</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-4 mb-6">{t.cabins.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.cabins.subtitle}</p>
        </div>
        <div className="flex flex-col w-full">
          {cabins.filter(c => c.title && c.title !== "Sin nombre").map((cabin, index) => (
            <CabinSection key={cabin.id} cabin={cabin} index={index} onWhatsApp={handleWhatsAppClick} />
          ))}
        </div>
      </section>

      <ExclusiveSection t={t} onWhatsApp={handleWhatsAppClick} exclusiveData={exclusiveData} />

      {/* Tours Section */}
      <section id="experiencias" className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-xs">{t.tours.tag}</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">{t.tours.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map((tour, idx) => (
              <div key={tour.id} className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleWhatsAppClick(`Hola, me interesa: ${tour.title}`)}>
                <img src={tour.imageUrl} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 z-10" />
                <div className="absolute bottom-0 p-6 z-20">
                  <h3 className="text-xl font-serif font-bold text-white mb-2">{tour.title}</h3>
                  <span className="text-accent text-xs font-bold uppercase flex items-center gap-1">{t.tours.learnMore} <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-24 px-6 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-background p-8 rounded-[32px] border border-border/50 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary"><Users className="w-6 h-6" /></div>
            <h3 className="text-xl font-bold mb-4 font-serif">{language === 'es' ? 'Equipamiento' : 'Equipment'}</h3>
            <p className="text-muted-foreground text-sm">Totalmente Equipada: Refrigerador, cocineta, parrilla y cristalería completa.</p>
          </div>
          <div className="bg-background p-8 rounded-[32px] border border-border/50 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary"><BedDouble className="w-6 h-6" /></div>
            <h3 className="text-xl font-bold mb-4 font-serif">{language === 'es' ? 'Comodidades' : 'Amenities'}</h3>
            <p className="text-muted-foreground text-sm">Confort: Agua caliente, sábanas limpias y cobertores adicionales.</p>
          </div>
          <div className="bg-background p-8 rounded-[32px] border border-border/50 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary"><PawPrint className="w-6 h-6" /></div>
            <h3 className="text-xl font-bold mb-4 font-serif">{language === 'es' ? 'Mascotas' : 'Pets'}</h3>
            <p className="text-muted-foreground text-sm">Pet Friendly: Tus perros son bienvenidos ($100 c/u).</p>
          </div>
          <div className="bg-background p-8 rounded-[32px] border border-border/50 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary"><ShieldCheck className="w-6 h-6" /></div>
            <h3 className="text-xl font-bold mb-4 font-serif">{language === 'es' ? 'Seguridad' : 'Security'}</h3>
            <p className="text-muted-foreground text-sm">Seguridad Máxima: Ubicadas en sitio con doble cercado y vigilancia.</p>
          </div>
        </div>
      </section>

      {/* Navigation Banners */}
      <section className="flex flex-col md:flex-row w-full h-[600px] overflow-hidden">
        <a href="/inventionem" className="relative flex-1 group flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url(/assets/images/2.webp)' }} />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 z-10" />
          <div className="relative z-20 text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-widest">INVENTIONEM</h2>
            <div className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg uppercase text-sm">{t.inventionem.cta}</div>
          </div>
        </a>
        <a href="/organicos" className="relative flex-1 group flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url(/assets/images/frescos.webp)' }} />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 z-10" />
          <div className="relative z-20 text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-widest">ORGÁNICOS</h2>
            <div className="inline-block px-8 py-4 bg-accent text-black font-bold rounded-lg uppercase text-sm">{t.organicos.cta}</div>
          </div>
        </a>
      </section>

      {/* Safari Section */}
      <section id="safari" className="py-24 px-4 bg-muted">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <img src={safariImage} alt="Safari" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">{t.safari.title}</h2>
            <p className="text-muted-foreground text-lg">{t.safari.description}</p>
            <Button className="bg-primary text-black font-bold px-8 py-6 rounded-xl" onClick={() => handleWhatsAppClick("Info Safari")}>{t.safari.cta}</Button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="como-llegar" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">{language === 'es' ? '¿Cómo llegar?' : 'How to get there?'}</h2>
          <p className="text-muted-foreground">Kilometro 0.5 de la brecha de la Yerbabuena al Volcán, Colima, México.</p>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          <div className="flex-1 h-[400px] rounded-[32px] overflow-hidden shadow-2xl">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.500000000000!2d-103.7!3d19.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI0JzAwLjAiTiAxMDPCsDQyJzAwLjAiVw!5e0!3m2!1ses!2smx!4v1600000000000" width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
          </div>
          <div className="flex-1 h-[400px] rounded-[32px] overflow-hidden shadow-2xl bg-black">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/LphJLjIws7k" title="Video" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}