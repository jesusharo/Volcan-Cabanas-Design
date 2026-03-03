import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCabins, getTours, getTestimonials, getExclusiveRental, type Cabin, type Tour, type Testimonial } from "@/lib/notion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, MessageCircle, CheckCircle2, Calendar, PawPrint, ShieldCheck, Clock, Users, BedDouble, Bath, ChevronDown } from "lucide-react";
import { ReservationCalculator } from "@/components/ReservationCalculator";
import { useLanguage } from "@/lib/LanguageContext";

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
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, [cabin.images]);

  return (
    <article
      id={`cabin-detail-${cabin.id}`}
      data-testid={`cabin-section-${cabin.id}`}
      className={`w-full pt-12 ${index % 2 !== 0 ? 'bg-muted/50' : 'bg-background'}`}
    >
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="w-full max-w-5xl mx-auto h-[40vh] md:h-[55vh] overflow-hidden relative rounded-[32px] shadow-2xl">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-15 pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-12 py-10 md:py-14">
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-8">{cabin.title}</h3>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            <div className="flex-1 space-y-6">
              <div className="flex flex-wrap gap-6 py-4 border-b border-border/40">
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm block">{cabin.capacity} {t.cabins.capacity}</span>
                    <span className="text-xs text-muted-foreground">{t.cabins.max}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <BedDouble className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm block">{cabin.rooms} {t.cabins.rooms}</span>
                    <span className="text-xs text-muted-foreground">{cabin.bedsDetail}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Bath className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm block">{cabin.bathrooms} {cabin.bathrooms === 1 ? t.cabins.bathrooms : t.cabins.bathroomsPlural}</span>
                    <span className="text-xs text-muted-foreground">{t.cabins.equipped}</span>
                  </div>
                </div>
              </div>

              <div className="relative" data-testid={`cabin-description-${cabin.id}`}>
                <div className={`space-y-3 ${!expanded && needsTruncation ? 'max-h-[6.5rem] overflow-hidden' : ''}`}>
                  {descText.split(/\n\n|\n/).filter(Boolean).map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-base text-muted-foreground leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
                {!expanded && needsTruncation && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none"
                    style={{ background: `linear-gradient(to top, ${index % 2 !== 0 ? '#2b2b2b' : '#242424'}, transparent)` }}
                  />
                )}
                {needsTruncation && (
                  <button
                    data-testid={`btn-readmore-${cabin.id}`}
                    onClick={() => setExpanded(!expanded)}
                    className="mt-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
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

function ExclusiveSection({ t, onWhatsApp }: { t: any; onWhatsApp: (msg: string) => void }) {
  const [exclusiveData, setExclusiveData] = useState<Cabin | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    getExclusiveRental().then(setExclusiveData);
  }, []);

  useEffect(() => {
    if (!exclusiveData || !exclusiveData.images || exclusiveData.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % exclusiveData.images.length);
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [exclusiveData]);

  if (!exclusiveData) return null;

  const images = exclusiveData.images && exclusiveData.images.length > 0 
    ? exclusiveData.images 
    : [exclusiveData.imageUrl];

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden min-h-[600px] flex items-center justify-center">
      {/* Background Ken Burns Gallery */}
      <div className="absolute inset-0 z-0">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
              idx === currentImgIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div 
              className={`w-full h-full bg-cover bg-center ${idx === currentImgIndex ? "animate-ken-burns" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          </div>
        ))}
        {/* Overlay 000000 at 30% */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-20 space-y-6">
        <span className="uppercase tracking-widest text-accent font-bold text-sm">{t.exclusive.tag}</span>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white text-shadow-lg">{t.exclusive.title}</h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-shadow-md">
          {t.exclusive.subtitle}
        </p>
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-[32px] max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl mt-10">
          <div className="text-left">
            <p className="text-3xl font-bold text-accent mb-1">{t.exclusive.price} <span className="text-sm font-normal text-white/80 uppercase tracking-widest">{t.exclusive.currency}</span></p>
            <p className="font-medium text-white">{t.exclusive.duration}</p>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block"></div>
          <div className="text-left">
            <p className="font-semibold text-white text-lg flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-accent"/> {t.exclusive.capacity}</p>
            <p className="text-white/70 text-sm mt-1">{t.exclusive.facilities}</p>
          </div>
          <Button 
            className="bg-accent text-black font-bold hover:bg-accent/90 w-full md:w-auto border-0 px-8 py-6 rounded-xl uppercase tracking-widest"
            onClick={() => onWhatsApp("Hola, me interesa la reserva exclusiva de Todo el Sitio para 25 personas.")}
          >
            {t.exclusive.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Calculate scroll progress for the night effect (0 to 1) over first 800px
  const scrollProgress = Math.min(scrollY / 800, 1);

  useEffect(() => {
    const handleWindowScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Mensaje dinámico para WhatsApp basado en la sección visible o interactuada
  const [waMessage, setWaMessage] = useState("Hola, me interesa información general sobre hospedaje y tours.");

  useEffect(() => {
    getCabins().then((data) => {
      setCabins(data);
      if (data.length > 0) {
        setWaMessage(`Hola, me interesa disponibilidad para: ${data[0].title}`);
      }
    });
    getTours().then(setTours);
    getTestimonials().then(setTestimonials);
  }, []);

  const handleWhatsAppClick = (customMessage?: string) => {
    const message = encodeURIComponent(customMessage || waMessage);
    window.open(`https://wa.me/523121500516?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Texture overlay global */}
      <div className="fixed inset-0 pointer-events-none bg-noise z-50 mix-blend-overlay"></div>

      <Header />

      {/* Floating WhatsApp Button */}
      <button 
        onClick={() => handleWhatsAppClick()}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Hero Section - Scroll-based Dynamic Background */}
      <section id="hospedaje" className="relative h-[150vh] w-full bg-background">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Stars Background (Farthest layer) */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ 
              opacity: scrollProgress,
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
              backgroundImage: 'url(/assets/volcan-night.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'url(/assets/volcan-day.jpg)',
              maskSize: 'cover',
              maskPosition: 'center',
              WebkitMaskImage: 'url(/assets/volcan-day.jpg)',
              WebkitMaskSize: 'cover',
              WebkitMaskPosition: 'center',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'destination-out'
            }}
          />

          {/* Night Volcano Image Overlay */}
          <div className="absolute inset-0 z-15 pointer-events-none" style={{ opacity: scrollProgress }}>
            <img 
              src="/assets/volcan-night.jpg" 
              alt="Volcán de Noche" 
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center' }}
            />
          </div>

          {/* Volcano Image (Sticky Day) */}
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ opacity: 1 - scrollProgress }}>
            <img 
              src="/assets/volcan-day.jpg" 
              alt="Volcán de Fuego" 
              className="w-full h-full object-cover"
              style={{
                filter: `brightness(${1 - (scrollProgress * 0.7)}) contrast(${1 + (scrollProgress * 0.2)}) hue-rotate(${scrollProgress * 200}deg) saturate(${1 - (scrollProgress * 0.2)})`,
                objectPosition: 'center',
              }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 pointer-events-none" />

          <div className="relative z-30 h-full flex flex-col justify-end pb-32 px-6 md:px-16 max-w-7xl mx-auto w-full">
            <span className="text-accent uppercase tracking-[0.15em] text-xs font-bold mb-4 inline-block">
              {t.hero.tag}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight text-shadow-md">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 text-shadow-sm font-medium">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button 
                size="lg" 
                className="bg-accent text-black hover:bg-accent/90 text-sm py-6 px-8 rounded-xl shadow-none transition-all hover:scale-[1.02] border-0 font-bold uppercase tracking-widest"
                onClick={() => {
                  const element = document.getElementById('nuestras-cabanas');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t.hero.cta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Detallada de Cabañas */}
      <section id="nuestras-cabanas" className="w-full bg-background relative z-10">
        <div className="py-20 px-6 md:px-16 max-w-7xl mx-auto text-center">
          <span className="uppercase tracking-widest text-accent font-bold text-sm">{t.nav.hospedaje}</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-4 mb-6">{t.cabins.title}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.cabins.subtitle}
          </p>
        </div>

        <div className="flex flex-col w-full">
          {cabins.map((cabin, index) => (
            <CabinSection key={cabin.id} cabin={cabin} index={index} onWhatsApp={handleWhatsAppClick} />
          ))}
        </div>
      </section>

      <ExclusiveSection t={t} onWhatsApp={handleWhatsAppClick} />

      {/* Sección 'Cómo llegar' */}
      <section id="como-llegar" className="py-20 px-4 md:px-8 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Columna Izquierda: Mapa */}
          <div className="w-full h-[450px] rounded-[32px] overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15034.3315891361!2d-103.623405!3d19.495066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84246140396755d5%3A0x3d1d15205bfbcdd1!2sVolc%C3%A1n%20de%20Colima!5e0!3m2!1ses!2smx!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Columna Derecha: Contenido */}
          <div className="space-y-8">
            <h2 id="seccion-titulo" className="text-3xl md:text-5xl font-serif font-bold text-[#232323]">
              {t.howToGet}
            </h2>
            <p id="seccion-direccion" className="text-lg text-muted-foreground leading-relaxed">
              {t.howToGetDesc}
            </p>
            <div className="relative pt-[56.25%] w-full rounded-[32px] overflow-hidden shadow-2xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/LphJLjIws7k"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Tours (Experiencias X Volcán) */}
      <section id="experiencias" className="py-24 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="text-accent font-bold tracking-widest uppercase text-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                {t.tours.tag}
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">{t.tours.title}</h2>
              <p className="text-muted-foreground text-lg">{t.tours.subtitle}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <div key={tour.id} className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
                   onClick={() => handleWhatsAppClick(`Hola, me gustaría reservar la experiencia: ${tour.title}`)}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <img 
                  src={tour.imageUrl} 
                  alt={tour.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="text-xl font-serif font-bold text-white mb-2">{tour.title}</h3>
                  <p className="text-white/80 text-sm line-clamp-2 mb-4 group-hover:line-clamp-none transition-all duration-500">
                    {tour.description}
                  </p>
                  <span className="text-accent text-xs font-bold uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t.tours.learnMore} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safari Fotográfico */}
      <section id="safari" className="py-24 px-4 md:px-8 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <img src="/src/assets/images/photographer.jpg" alt="Safari Fotográfico" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent mix-blend-multiply"></div>
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">{t.safari.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.safari.description}
            </p>
            <ul className="space-y-3 pt-4">
              {t.safari.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Button 
              className="mt-6 bg-primary text-black hover:bg-primary/90 uppercase tracking-widest font-bold px-8 py-6 rounded-xl"
              onClick={() => handleWhatsAppClick("Hola, quiero información sobre el Safari Fotográfico.")}
            >
              {t.safari.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* Logística y Mascotas */}
      <section id="logistica" className="py-24 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">{t.info.title}</h2>
            <p className="text-muted-foreground">{t.info.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-muted text-white text-center">
              <div className="mb-4 flex justify-center opacity-80"><PawPrint className="w-10 h-10" /></div>
              <h3 className="text-xl font-bold mb-2 font-serif">{t.info.pets.title}</h3>
              <p className="opacity-70 text-sm">{t.info.pets.desc}</p>
            </div>
            <div className="p-8 rounded-2xl bg-muted text-white text-center">
              <div className="mb-4 flex justify-center opacity-80"><ShieldCheck className="w-10 h-10" /></div>
              <h3 className="text-xl font-bold mb-2 font-serif">{t.info.security.title}</h3>
              <p className="opacity-70 text-sm">{t.info.security.desc}</p>
            </div>
            <div className="p-8 rounded-2xl bg-muted text-white text-center">
              <div className="mb-4 flex justify-center opacity-80"><Clock className="w-10 h-10" /></div>
              <h3 className="text-xl font-bold mb-2 font-serif">{t.info.hours.title}</h3>
              <p className="opacity-70 text-sm">{t.info.hours.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}