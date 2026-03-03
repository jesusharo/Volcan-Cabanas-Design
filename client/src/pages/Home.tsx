import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCabins, getTours, getTestimonials, type Cabin, type Tour, type Testimonial } from "@/lib/notion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, MessageCircle, CheckCircle2, Calendar, PawPrint, ShieldCheck, Clock, Users, BedDouble, Bath, ChevronDown } from "lucide-react";
import { ReservationCalculator } from "@/components/ReservationCalculator";
import heroStarsImg from "@assets/image_1772517939070.png";

const DESC_TRUNCATE_LENGTH = 200;

function CabinSection({ cabin, index, onWhatsApp }: { cabin: Cabin; index: number; onWhatsApp: (msg: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const descText = cabin.detailedDescription || cabin.description;
  const needsTruncation = descText.length > DESC_TRUNCATE_LENGTH;

  return (
    <article
      id={`cabin-detail-${cabin.id}`}
      data-testid={`cabin-section-${cabin.id}`}
      className={`w-full ${index % 2 !== 0 ? 'bg-muted/50' : 'bg-background'}`}
    >
      <div className="w-full h-[40vh] md:h-[55vh] overflow-hidden relative">
        <div className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {cabin.images?.map((img, i) => (
            <div key={i} className="w-full h-full flex-[0_0_100%] snap-center shrink-0 relative">
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
            <div key={i} className="w-2 h-2 rounded-full bg-white/70 shadow-sm" />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 md:left-12 z-10">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-lg">{cabin.title}</h3>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-12 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap gap-6 py-4 border-b border-border/40">
              <div className="flex items-center gap-2.5 text-primary">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-sm block">{cabin.capacity} Personas</span>
                  <span className="text-xs text-muted-foreground">Máximo</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-primary">
                <div className="p-2 rounded-xl bg-primary/10">
                  <BedDouble className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-sm block">{cabin.rooms} Habitaciones</span>
                  <span className="text-xs text-muted-foreground">{cabin.bedsDetail}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-primary">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-sm block">{cabin.bathrooms} {cabin.bathrooms === 1 ? 'Baño' : 'Baños'}</span>
                  <span className="text-xs text-muted-foreground">Equipados</span>
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
                  {expanded ? 'Leer menos' : 'Leer más…'}
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
    </article>
  );
}

export default function Home() {
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Mensaje dinámico para WhatsApp basado en la sección visible o interactuada
  const [waMessage, setWaMessage] = useState("Hola, me interesa información general sobre hospedaje y tours.");

  useEffect(() => {
    const handleWindowScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const slideIndex = Math.round(target.scrollLeft / target.clientWidth);
    if (slideIndex !== currentSlide && cabins[slideIndex]) {
      setCurrentSlide(slideIndex);
      setWaMessage(`Hola, me interesa disponibilidad para: ${cabins[slideIndex].title}`);
    }
  };

  const scrollToSlide = (index: number) => {
    const container = document.getElementById('hero-scroll-container');
    if (container) {
      container.scrollTo({
        left: index * container.clientWidth,
        behavior: 'smooth'
      });
    }
  };

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

      {/* Hero Section - Parallax Stars */}
      <section id="hospedaje" className="relative h-[100vh] w-full overflow-hidden bg-black">
        <div
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <img
            src={heroStarsImg}
            alt="Cielo estrellado sobre el Volcán de Fuego"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[45%] z-[5]"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#232323] via-[#232323]/95 to-transparent" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#232323] via-transparent to-transparent z-10 pointer-events-none" />

        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 w-full">
          <div className="max-w-7xl mx-auto w-full">
            <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold mb-4 inline-block">
              Colima, México
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight text-shadow-md">
              Cabañas del Volcán
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl mb-8 text-shadow-sm">
              Eco-hospedaje con vistas al Volcán de Fuego. Desconéctate bajo las estrellas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-accent text-white hover:bg-accent/90 text-base px-8 border-0"
                onClick={() => {
                  const el = document.getElementById('nuestras-cabanas');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Ver Cabañas
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10 text-base px-8"
                onClick={() => handleWhatsAppClick()}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contactar
              </Button>
            </div>
          </div>
        </div>

        {cabins.length > 0 && (
          <div className="absolute bottom-8 left-0 right-0 px-6 md:px-16 z-30">
            <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {cabins.map((cabin, index) => (
                <button
                  key={cabin.id}
                  onClick={() => {
                    const el = document.getElementById(`cabin-detail-${cabin.id}`);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all border border-white/20 text-white/70 hover:text-white hover:border-white/50 bg-white/5 backdrop-blur-sm"
                >
                  {cabin.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>


      {/* Sección Detallada de Cabañas */}
      <section id="nuestras-cabanas" className="w-full bg-background relative z-10">
        <div className="py-20 px-6 md:px-16 max-w-7xl mx-auto text-center">
          <span className="uppercase tracking-widest text-accent font-bold text-sm">Hospedaje</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-4 mb-6">Nuestras Cabañas</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestros espacios diseñados para integrarse armónicamente con el entorno natural, ofreciendo confort y vistas inigualables.
          </p>
        </div>

        <div className="flex flex-col w-full">
          {cabins.map((cabin, index) => (
            <CabinSection key={cabin.id} cabin={cabin} index={index} onWhatsApp={handleWhatsAppClick} />
          ))}
        </div>
      </section>

      {/* Sección Exclusividad "Todo el Sitio" */}
      <section className="py-16 px-4 md:px-8 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <span className="uppercase tracking-widest text-accent font-bold text-sm">Reserva Exclusiva</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold">Todo el Sitio para tu Evento</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Disfruta de privacidad total. Ideal para retiros, retiros corporativos o reuniones familiares grandes.
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="text-left">
              <p className="text-3xl font-bold text-accent mb-1">$7,500 <span className="text-sm font-normal text-white/80 uppercase tracking-widest">MXN</span></p>
              <p className="font-medium text-white">2 Días / 1 Noche</p>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block"></div>
            <div className="text-left">
              <p className="font-semibold text-white text-lg flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-accent"/> Hasta 25 Personas</p>
              <p className="text-white/70 text-sm mt-1">Acceso a todas las instalaciones</p>
            </div>
            <Button 
              className="bg-accent text-accent-foreground hover:bg-accent/90 w-full md:w-auto border-0"
              onClick={() => handleWhatsAppClick("Hola, me interesa la reserva exclusiva de Todo el Sitio para 25 personas.")}
            >
              Consultar Fechas
            </Button>
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
                Tour X Volcán®
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Aventura y Ecoturismo</h2>
              <p className="text-muted-foreground text-lg">Experimenta el volcán desde su corazón. Actividades diseñadas para conectar con la naturaleza a través de la adrenalina y la contemplación.</p>
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
                    Saber más <ArrowRight className="w-3 h-3" />
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
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Safari Fotográfico</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Únete a nuestras expediciones especializadas para fotógrafos aficionados y profesionales. Captura la majestuosidad de las erupciones controladas, los paisajes nevados y la fauna endémica en sus mejores momentos de luz.
            </p>
            <ul className="space-y-3 pt-4">
              {['Guías expertos en locaciones de luz', 'Acceso a miradores exclusivos', 'Transporte seguro al amanecer/atardecer'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Button 
              className="mt-6 bg-primary text-white hover:bg-primary/90"
              onClick={() => handleWhatsAppClick("Hola, quiero información sobre el Safari Fotográfico.")}
            >
              Agendar Safari
            </Button>
          </div>
        </div>
      </section>

      {/* Logística y Mascotas */}
      <section id="logistica" className="py-24 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Información Importante</h2>
            <p className="text-muted-foreground">Todo lo que necesitas saber antes de tu visita.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Pet Friendly",
                desc: "Tus mejores amigos son bienvenidos. Aplica una tarifa de limpieza de $100 MXN por mascota.",
                icon: <PawPrint className="w-10 h-10" />
              },
              {
                title: "Seguridad Total",
                desc: "Ubicación segura y cercada. Tranquilidad garantizada durante toda tu estadía en el bosque.",
                icon: <ShieldCheck className="w-10 h-10" />
              },
              {
                title: "Horarios",
                desc: "Check-in a partir de las 3:00 PM. El check-out de visitas (no hospedados) es a las 10:00 PM.",
                icon: <Clock className="w-10 h-10" />
              }
            ].map((info, i) => (
              <div key={i} className="p-8 rounded-2xl bg-muted text-white text-center">
                <div className="mb-4 flex justify-center opacity-80">{info.icon}</div>
                <h3 className="text-xl font-bold mb-2 font-serif">{info.title}</h3>
                <p className="opacity-70 text-sm">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}