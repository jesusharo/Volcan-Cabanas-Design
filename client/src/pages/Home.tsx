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
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-0">
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
  const { language, t } = useLanguage();
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [safariImage, setSafariImage] = useState("/assets/safari-hero.jpg");
  const [exclusiveImages, setExclusiveImages] = useState<string[]>([]);

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
    getExclusiveRental().then((data) => {
      if (data && data.images && data.images.length > 0) {
        setExclusiveImages(data.images);
        if (data.images.length >= 2) {
          setSafariImage(data.images[1]);
        }
      }
    });
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

      <div className="fixed bottom-6 right-6 z-50 flex gap-4 items-center">
        <button 
          onClick={() => window.open("https://www.tripadvisor.es/Hotel_Review-g1744419-d12877799-Reviews-Cabanas_del_Volcan-Comala_Pacific_Coast.html?m=19905", "_blank")}
          className="bg-[#34E0A1] text-black p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
          aria-label="Ver en TripAdvisor"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-current">
            <path d="M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0zm0 21c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9zM7.5 9c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm9 0c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zM12 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"/>
          </svg>
        </button>

        <button 
          onClick={() => window.open("https://www.airbnb.mx/rooms/31803875?guests=1&adults=1&s=67&unique_share_id=3a57641b-0421-4812-bca8-a685f213dbf4", "_blank")}
          className="bg-[#FF5A5F] text-white p-3 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center justify-center w-[56px] h-[56px]"
          aria-label="Reservar en Airbnb"
        >
          <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M31.3834 15.2957C31.0667 15.119 30.6577 14.9993 30.001 15C29.3431 15.0007 28.9333 15.1205 28.6161 15.2972C28.2879 15.48 27.9809 15.7661 27.5851 16.238C25.6874 18.8951 22.937 23.8224 20.5658 28.52C19.3798 30.8694 18.2982 33.1425 17.4758 35.0194C16.6374 36.9329 16.1111 38.3404 15.9776 39.0083C15.6881 40.4558 16.2426 42.0296 17.3801 43.2287C18.5126 44.4225 20.1318 45.1438 21.8128 44.9757C23.4052 44.8164 25.1148 43.7594 26.5665 42.5402C28.3292 41.0592 29.3032 39.5447 30.001 37.9575C30.6987 39.5447 31.6727 41.0592 33.4354 42.5402C34.8871 43.7594 36.5967 44.8164 38.1891 44.9757C39.8701 45.1438 41.4893 44.4225 42.6219 43.2287C43.7593 42.0296 44.3138 40.4558 44.0243 39.0083C43.8908 38.3404 43.3645 36.9329 42.5261 35.0194C41.7037 33.1425 40.6221 30.8694 39.4361 28.52C37.0649 23.8224 34.3145 18.8951 32.4168 16.238C32.021 15.7661 31.7116 15.4773 31.3834 15.2957ZM30.001 32.4045C30.9388 32.4045 31.6995 31.6438 31.6995 30.706C31.6995 29.7682 30.9388 29.0075 30.001 29.0075C29.0632 29.0075 28.3025 29.7682 28.3025 30.706C28.3025 31.6438 29.0632 32.4045 30.001 32.4045ZM30.001 35.0232C28.0535 35.0232 26.3117 33.4795 26.3117 31.026C26.3117 28.5724 28.0535 27.0287 30.001 27.0287C31.9484 27.0287 33.6902 28.5724 33.6902 31.026C33.6902 33.4795 31.9484 35.0232 30.001 35.0232ZM30.001 17.5252C29.4348 17.5259 29.1363 17.7024 28.8475 18.0645C27.1352 20.4616 24.5204 25.1408 22.2514 29.6373C21.1215 31.8761 20.0933 34.0372 19.3248 35.7924C18.6656 37.2974 18.2599 38.3129 18.1718 38.7554C18.0195 39.5168 18.3377 40.288 18.8927 40.873C19.4503 41.4605 20.2522 41.8361 21.0118 41.7602C22.0396 41.6575 23.2796 40.8926 24.3941 39.9546C26.0468 38.5633 27.6975 36.4389 28.4526 34.1953C28.7247 33.3867 29.3524 32.9038 30.001 32.9038C30.6495 32.9038 31.2772 33.3867 31.5493 34.1953C32.3044 36.4389 33.9551 38.5633 35.6078 39.9546C36.7223 40.8926 37.9623 41.6575 38.9901 41.7602C39.7497 41.8361 40.5516 41.4605 41.1092 40.873C41.6642 40.288 41.9824 39.5168 41.8301 38.7554C41.742 38.3129 41.3363 37.2974 40.6771 35.7924C39.9086 34.0372 38.8804 31.8761 37.7505 29.6373C35.4815 25.1408 32.8667 20.4616 31.1544 18.0645C30.8656 17.7024 30.5671 17.5259 30.001 17.5252Z" fill="white"/>
          </svg>
        </button>

        <button 
          onClick={() => handleWhatsAppClick()}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>

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
          {cabins
            .filter(cabin => cabin.title && cabin.title !== "Sin nombre" && cabin.slug !== "sin-nombre")
            .map((cabin, index) => (
            <CabinSection key={cabin.id} cabin={cabin} index={index} onWhatsApp={handleWhatsAppClick} />
          ))}
        </div>
      </section>

      <ExclusiveSection t={t} onWhatsApp={handleWhatsAppClick} />

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
            {tours.map((tour, idx) => (
              <div key={tour.id} className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
                   onClick={() => handleWhatsAppClick(`Hola, me gustaría reservar la experiencia: ${tour.title}`)}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <img 
                  src={exclusiveImages && exclusiveImages.length > 0 ? exclusiveImages[idx % exclusiveImages.length] : tour.imageUrl} 
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

      {/* Estadía y Comodidades */}
      <section className="py-24 px-6 md:px-16 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
              {language === 'es' ? 'Estadía y Comodidades' : 'Stay & Amenities'}
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Bloque 1: Cocina */}
            <div className="bg-background p-8 rounded-[32px] shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <Users className="w-6 h-6" /> 
              </div>
              <h3 className="text-xl font-bold mb-4 font-serif text-foreground">
                {language === 'es' ? 'Equipamiento' : 'Equipment'}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {language === 'es' 
                  ? 'Totalmente Equipada: Refrigerador, cocineta, parrilla y plancha eléctrica. Incluye licuadora, cafetera, ollas, sartenes y cristalería completa para el cupo de la cabaña.'
                  : 'Fully Equipped: Refrigerator, kitchenette, electric grill, and griddle. Includes blender, coffee maker, pots, pans, and full glassware for the cabin capacity.'}
              </p>
            </div>

            {/* Bloque 2: Confort */}
            <div className="bg-background p-8 rounded-[32px] shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <BedDouble className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-serif text-foreground">
                {language === 'es' ? 'Comodidades' : 'Amenities'}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {language === 'es'
                  ? 'Confort: Agua caliente, sábanas limpias y cobertores adicionales. Proporcionamos 2 toallas y papel higiénico por estancia.'
                  : 'Comfort: Hot water, clean linens, and extra blankets. We provide 2 towels and toilet paper per stay.'}
              </p>
            </div>

            {/* Bloque 3: Mascotas */}
            <div className="bg-background p-8 rounded-[32px] shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <PawPrint className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-serif text-foreground">
                {language === 'es' ? 'Mascotas (Reglas)' : 'Pets (Rules)'}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {language === 'es'
                  ? 'Pet Friendly: Tus perros son bienvenidos ($100 c/u). Visitas permitidas hasta las 10:00 PM ($100 p/p).'
                  : 'Pet Friendly: Dogs are welcome ($100 fee per pet). Visitors allowed until 10:00 PM ($100 fee per person).'}
              </p>
            </div>

            {/* Bloque 4: Seguridad */}
            <div className="bg-background p-8 rounded-[32px] shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-serif text-foreground">
                {language === 'es' ? 'Seguridad' : 'Security'}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {language === 'es'
                  ? 'Seguridad Máxima: Ubicadas en sitio de ecoturismo extremo con doble cercado. Un lugar mágico, seguro y tranquilo para el descanso o convivencia.'
                  : 'Maximum Security: Located in an extreme ecotourism site with double fencing. A magical, safe, and quiet place for rest or gathering.'}
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button 
              size="lg"
              className="bg-accent text-black hover:bg-accent/90 px-12 py-7 rounded-2xl font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              onClick={() => {
                const element = document.getElementById('nuestras-cabanas');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {language === 'es' ? 'Reserva Ahora' : 'Book Now'}
            </Button>
          </div>
        </div>
      </section>

      {/* Banners 50/50 Navigation */}
      <section className="flex flex-col md:flex-row w-full h-[600px] overflow-hidden">
        {/* Lado Izquierdo: Inventionem */}
        <a 
          href="/inventionem" 
          className="relative flex-1 group overflow-hidden flex items-center justify-center border-r border-white/10"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: 'url(/assets/images/sitio-completo/2.webp)' }} // Using site image as fallback for banner-inv.jpg
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 z-10" />
          <div className="relative z-20 text-center space-y-6 px-8">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-widest uppercase text-shadow-lg">
              {language === 'es' ? 'INVENTIONEM' : 'INVENTIONEM'}
            </h2>
            <div className="inline-block px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 rounded-lg shadow-xl">
              {t.inventionem.cta}
            </div>
          </div>
        </a>

        {/* Lado Derecho: Frescos y Orgánicos */}
        <a 
          href="/organicos" 
          className="relative flex-1 group overflow-hidden flex items-center justify-center"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: 'url(/assets/images/comida/frescos.webp)' }} // Using food image for banner-org.jpg
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 z-10" />
          <div className="relative z-20 text-center space-y-6 px-8">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-widest uppercase text-shadow-lg">
              {language === 'es' ? 'FRESCOS Y ORGÁNICOS' : 'FRESH & ORGANIC'}
            </h2>
            <div className="inline-block px-8 py-4 bg-accent text-black font-bold uppercase tracking-widest text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 rounded-lg shadow-xl">
              {t.organicos.cta}
            </div>
          </div>
        </a>
      </section>

      {/* Safari Fotográfico */}
      <section id="safari" className="py-24 px-4 md:px-8 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-muted">
            <img 
              src={safariImage} 
              alt="Safari Fotográfico" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
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

      {/* Sección 'Cómo llegar' */}
      <section id="como-llegar" className="py-24 px-6 md:px-16 bg-muted/30 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
              {language === 'es' ? '¿Cómo llegar?' : 'How to get there?'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {language === 'es' 
                ? 'Nos encontramos en el Kilometro 0.5 de la brecha de la Yerbabuena al Volcán en el Ejido San Antonio, Comala, Colima, México'
                : 'We are located at Kilometer 0.5 of the Yerbabuena to Volcano road in Ejido San Antonio, Comala, Colima, Mexico'}
            </p>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-stretch h-auto md:h-[450px]">
            {/* Columna Izquierda: Mapa */}
            <div className="flex-1 min-h-[350px] md:min-h-0 rounded-[32px] overflow-hidden shadow-2xl border border-border/50">
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

            {/* Columna Derecha: Video */}
            <div className="flex-1 min-h-[350px] md:min-h-0 rounded-[32px] overflow-hidden shadow-2xl border border-border/50 bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/LphJLjIws7k"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}