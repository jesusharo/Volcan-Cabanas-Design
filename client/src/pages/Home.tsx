import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCabins, getTours, getTestimonials, type Cabin, type Tour, type Testimonial } from "@/lib/notion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, MessageCircle, Camera, CheckCircle2, Calendar, PawPrint, ShieldCheck, Clock, Users, BedDouble, Bath } from "lucide-react";

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

      {/* Hero Section - Dynamic Slider */}
      <section id="hospedaje" className="relative h-[90vh] md:h-[95vh] w-full overflow-hidden bg-background">
        {cabins.length > 0 ? (
          <div className="w-full h-full relative">
            <div 
              id="hero-scroll-container"
              className="flex h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onScroll={handleScroll}
            >
              {cabins.map((cabin) => (
                <div key={cabin.id} className="relative w-full h-full flex-[0_0_100%] snap-center shrink-0 overflow-hidden">
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      transform: `translateY(${scrollY * 0.5}px)`,
                    }}
                  >
                    <img 
                      src={cabin.imageUrl} 
                      alt={cabin.title} 
                      className="absolute inset-0 w-full h-full object-cover scale-[1.1] animate-in fade-in duration-1000"
                    />
                  </div>
                  {/* Overlay Gradient fixed to slide boundaries */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10 pointer-events-none" />
                  
                  <div className="absolute inset-0 z-20 flex flex-col justify-end pb-32 px-6 md:px-16 w-full">
                    <div className="max-w-7xl mx-auto w-full">
                      <span className="text-accent uppercase tracking-[0.15em] text-xs font-bold mb-4 inline-block">
                        Hasta {cabin.capacity} personas
                      </span>
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight text-shadow-md">
                        {cabin.title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 text-shadow-sm font-medium">
                        {cabin.description}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Button 
                          size="lg" 
                          className="bg-accent text-white hover:bg-accent/90 text-base px-8 shadow-lg shadow-accent/20 border-0"
                          onClick={() => {
                            const element = document.getElementById(`cabin-detail-${cabin.id}`);
                            element?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          Ver Cabaña
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Slider Controls */}
            <div className="absolute bottom-12 left-0 right-0 px-6 md:px-16 z-30 flex justify-end gap-2 pointer-events-none">
              <div className="max-w-7xl mx-auto w-full flex justify-end gap-2 pointer-events-auto">
                {cabins.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSlide(index)}
                    className="h-1.5 rounded-full"
                    style={{
                      width: currentSlide === index ? '2.5rem' : '1rem',
                      backgroundColor: currentSlide === index ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.4)',
                      transition: 'width 800ms cubic-bezier(0.22,1,0.36,1), background-color 800ms cubic-bezier(0.22,1,0.36,1)',
                    }}
                    aria-label={`Ir a cabaña ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </section>

      {/* Sección Detallada de Cabañas (Vertical Scroll con Horizontal Gallery) */}
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
            <div 
              key={cabin.id}
              id={`cabin-detail-${cabin.id}`} 
              className={`min-h-[85vh] w-full flex flex-col lg:flex-row items-center justify-center py-16 px-4 md:px-12 lg:px-24 gap-12 lg:gap-20 ${
                index % 2 !== 0 ? 'bg-muted/50' : 'bg-background'
              }`}
            >
              {/* Carrusel Horizontal de Imágenes */}
              <div className={`w-full lg:w-3/5 h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl relative ${
                index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'
              }`}>
                <div className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {cabin.images?.map((img, i) => (
                    <div key={i} className="w-full h-full flex-[0_0_100%] snap-center shrink-0 relative">
                      <img 
                        src={img} 
                        alt={`${cabin.title} - imagen ${i + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    </div>
                  ))}
                </div>
                {/* Scroll hint indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-none">
                  {cabin.images?.map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-white/70 shadow-sm" />
                  ))}
                </div>
              </div>

              {/* Detalles Técnicos */}
              <div className={`w-full lg:w-2/5 flex flex-col justify-center space-y-8 ${
                index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'
              }`}>
                <div>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">{cabin.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{cabin.description}</p>
                  {cabin.price && (
                    <p className="text-2xl font-bold text-accent mt-4">
                      ${cabin.price.toLocaleString('es-MX')} <span className="text-sm font-normal text-muted-foreground uppercase tracking-widest">MXN / noche</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/50">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-primary">
                      <div className="p-2.5 rounded-xl bg-primary/10">
                        <Users className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-lg">{cabin.capacity} Personas</span>
                    </div>
                    <span className="text-sm text-muted-foreground ml-14">Capacidad máxima</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-primary">
                      <div className="p-2.5 rounded-xl bg-primary/10">
                        <BedDouble className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-lg">{cabin.rooms} Hab.</span>
                    </div>
                    <span className="text-sm text-muted-foreground ml-14">{cabin.bedsDetail}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-primary">
                      <div className="p-2.5 rounded-xl bg-primary/10">
                        <Bath className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-lg">{cabin.bathrooms} Baños</span>
                    </div>
                    <span className="text-sm text-muted-foreground ml-14">Completamente equipados</span>
                  </div>
                </div>

                <div className="pt-6 flex flex-wrap gap-4 items-center">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-accent text-white hover:bg-accent/90 text-lg px-8 py-6 rounded-xl shadow-lg shadow-accent/20 transition-all hover:scale-105"
                    onClick={() => handleWhatsAppClick(`Hola, me gustaría información detallada y reservar la cabaña: ${cabin.title}`)}
                  >
                    Ver Disponibilidad <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-[#FF5A5F] text-white hover:bg-[#FF5A5F]/90 text-lg px-6 py-6 rounded-xl shadow-lg shadow-[#FF5A5F]/20 transition-all hover:scale-105"
                  >
                    <svg viewBox="0 0 32 32" className="w-5 h-5 mr-2" fill="currentColor"><path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.268 3.42-6.414 3.615l-.28.019-.267.006C5.377 31 2.5 28.584 2.5 24.522l.005-.469c.026-.928.23-1.768.83-3.244l.216-.524c.966-2.298 5.033-10.998 7.028-14.84l.55-1.046C12.464 2.057 13.94 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.707l-.22.536c-.543 1.347-.7 2.067-.731 2.853l-.006.314c0 2.89 1.83 4.372 4.04 4.372 1.89 0 3.984-1.246 6.002-3.332l.288-.309.155-.176.103-.122c.677-.822 1.152-1.243 1.487-1.42l.334-.16c.382.162.883.61 1.583 1.458l.104.128.167.195.305.334c2.052 2.115 4.17 3.387 6.096 3.387 2.21 0 4.04-1.482 4.04-4.372l-.004-.302c-.035-.747-.197-1.478-.767-2.895l-.208-.507c-.96-2.254-5.076-10.9-7.01-14.685l-.547-1.052C18.067 3.538 17.251 3 16 3zm0 5.4c1.928 0 3.992 2.26 5.86 6.012l.142.293.125.267c.725 1.579 1.096 3.018 1.096 4.257 0 3.056-1.87 4.966-4.225 4.966-1.572 0-3.335-1.127-5.115-3.151l-.22-.24-.139-.156c-.663-.78-1.085-1.196-1.39-1.365l-.34-.176-.328.166c-.309.172-.733.593-1.408 1.385l-.146.164-.228.25c-1.782 2.025-3.545 3.153-5.118 3.153-2.355 0-4.225-1.91-4.225-4.966 0-1.239.371-2.678 1.096-4.257l.125-.267.142-.293C9.008 10.66 11.072 8.4 13 8.4h3zm0 2.2c-1.345 0-2.903 1.83-4.49 5.097l-.141.298-.12.26c-.524 1.157-.799 2.218-.799 3.14 0 1.895.962 2.966 2.225 2.966 1.085 0 2.456-.882 3.982-2.585l.135-.156.126-.148c.84-.962 1.458-1.527 2.015-1.802l.27-.123.275.126c.557.275 1.173.839 2.01 1.796l.128.15.132.155c1.528 1.706 2.9 2.59 3.984 2.59 1.263 0 2.225-1.071 2.225-2.966 0-.922-.275-1.983-.799-3.14l-.12-.26-.14-.298c-1.588-3.267-3.146-5.097-4.49-5.097z"></path></svg>
                    Airbnb
                  </Button>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-[#00AF87] text-white hover:bg-[#00AF87]/90 text-lg px-6 py-6 rounded-xl shadow-lg shadow-[#00AF87]/20 transition-all hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 mr-2" fill="currentColor"><path d="M473.4 114.7c-4-4.5-9.6-6.7-16-6.4-1.2 .1-2.3 .1-3.5 .2 3.6-7.8 5.7-16.1 5.9-24.6 .4-19-14-36.9-33-37.4-44.1-1.1-70.1 27.5-70.1 27.5-62.8-31-137.9-30.8-200.7 .3 0 0-26-28.7-70.1-27.5-19 .5-33.3 18.5-33 37.4 .2 8.5 2.3 16.8 5.9 24.6-1.2-.1-2.3-.2-3.5-.2-6.5-.3-12 1.9-16 6.4C30.2 121.7 32 143.1 32 143.1S64.4 238.9 146.1 251.6c-4.1 11.2-5.4 23.3-3.6 35.3 2.1 14.1 8 27.5 17 38.8-37.8 45.4-86 86.8-124 122.9-7.2 6.8-5.7 18.5 2.6 23.6 8.5 5.2 19.3 4 26.1-2.4 34.6-32.9 76.5-67.9 111.4-106.6 20.3 16 45.8 25.1 72 25.6h17.1c26.2-.5 51.7-9.5 72-25.6 34.9 38.6 76.8 73.7 111.4 106.6 6.8 6.5 17.6 7.6 26.1 2.4 8.3-5.1 9.8-16.8 2.6-23.6-38-36.1-86.2-77.5-124-122.9 8.9-11.3 14.9-24.7 17-38.8 1.8-12 .4-24.1-3.6-35.3 81.6-12.7 114.1-108.5 114.1-108.5s1.8-21.4-7.3-28.4zm-374.3 18.1c3.5-13.8 11.1-26.2 21.8-35.6-8.9 4.3-17.2 9.7-24.7 16.2 3.3 6.9 6.2 14.3 8.3 22 2.6-1 5.3-1.9 8.2-2.6h-13.6zM69.8 163.6c-2.3-11.4-2.8-23.2-1.3-35 8.1 4 16.6 7.2 25.3 9.4 6 15.6 15 29.8 26.4 41.8-14.7-6-28.5-13.6-41.2-22.5l-9.2 6.3zm55.3-52.9c-2.8-8.1-7.2-15.6-12.8-22.1-4.7 4.1-9.9 7.6-15.6 10.3 13.9 12.3 29.6 22.8 46.5 31.2-5.4-6.8-11.8-12.9-18.1-19.4zm54.5 98.4c-35-10.7-61.9-39.7-69.6-75.1-4.7-21.5-1.9-44 8-63.7 9.8-19.4 25.9-34.9 45.4-43.5 18.5-8.2 39.4-10.1 58.7-5.5 19 4.5 35.8 15.5 47.3 30.9 11.4 15.3 16.8 34.2 15.2 53.3-1.6 18.8-10.4 36.3-24.8 49-14.2 12.5-32.5 19.3-51.5 19.2 6.9 10.3 12.5 21.2 16.9 32.7 1.4 .1 2.8 .2 4.1 .4 11-3.6 21.3-8.8 30.5-15.3-25.1 27.2-61.3 43-99.7 43.1-23.1-.2-45.7-7-65.7-19.6 .8 .7 1.5 1.5 2.2 2.2 11.5-3.3 22.5-7.7 32.8-13.1-16.7-7.9-32.3-18.4-46.1-31.2 1.3 .7 2.6 1.4 3.9 2.1 10.9 6 22.5 10.5 34.5 13.5 12.6 3.1 25.8 4 38.8 2.5l-4-5.2-46.8-15.8zM256 160c-15.4-.1-27.8-12.6-27.8-28.1s12.5-28 27.9-28c15.4 .1 27.8 12.6 27.8 28.1 0 15.4-12.5 28-27.9 28zm101.9 114.7c15.7 6.4 32.6 9.6 49.6 9.4 12 .3 23.9-1.9 35-6.3-12.9 8.9-26.9 16.3-41.9 22.1 11.5-12 20.6-26.3 26.6-42l-9.5-6.6c-13.5 10.4-28.6 18.7-44.6 24.6 1.3-3.6 2.5-7.3 3.6-11 5.9 2.3 12.1 3.9 18.3 4.8 5.7-3.6 10.7-8 14.8-13.1l-10-6.1c-15 15.4-33.1 27.3-53 34.9 .9-3.7 1.6-7.5 2.1-11.4 8.7 3 17.7 5.2 26.9 6.4 7.6-5.8 14.3-12.6 19.8-20.2l-10.3-5.2c-15.8 19.3-35.3 34.7-57.1 45.4 .2-3.8 .2-7.5 .1-11.3 11 4.5 22.5 7.6 34.3 9.4 10.2-9 19.1-19.2 26.4-30.4l-10.4-4c-14.7 20-33 36.3-53.7 47.9-1.1-4.6-2.6-9.1-4.3-13.4 9.1-23.7 8.3-50.5-2.2-73.6-10.5-23-28.3-41.6-50.5-52.6-22.3-11-48-13.1-71.8-5.8-23.7 7.3-43.9 22.8-56.3 43.1-12.3 20.3-15.9 44.5-9.9 67.3 6 22.8 19.8 42.5 38.6 54.9-13.9 6.5-28.6 11-43.7 13.5-12.4 2-25.2 .5-37.1-4.2 .2-2.3 .3-4.6 .4-6.8l-10-3c9.3 10.5 20.2 19.5 32.3 26.5-11.3-4.5-22.1-10.3-32-17.3-5.7-4-10.9-8.6-15.6-13.7l-9.2 5.5c12.3 17.6 27.6 32.5 45.1 43.8-13.8-4-27-9.5-39.3-16.5-5.9-3.4-11.5-7.4-16.5-11.8l-8.6 6.3c14.6 20.4 32.9 37.6 54 50.5-14.6-2.5-28.8-6.9-42.2-13.1-6.9-3.3-13.5-7.1-19.6-11.4l-7.7 7.2c16.3 23.3 36.4 43.1 59.5 58.4-14.2-1.2-28.2-4.1-41.8-8.8-7.7-2.7-15.2-6-22.3-9.7l-6.8 8c16.3 24.3 36.5 45.2 59.4 61.6-12.5 .3-25-1-37.2-3.8-9.1-2.1-18-4.9-26.6-8.2l-5.6 9c16.1 23.2 35.8 43.2 58.2 58.9-8.4 .7-16.8 .7-25.2 0-26.7-2.3-52.7-10.2-76.4-23.2 5.4 6 11.2 11.7 17.3 16.9-20.7-9.9-39.4-23.5-55.2-40.1 7.2 6.5 14.8 12.6 22.8 18.2-19.1-11.8-36.2-26.6-50.6-43.8 8.6 6.6 17.6 12.7 27 18.2-17.6-14-33-30.5-45.5-49 9.8 6.4 20 12.1 30.6 17.1-13-11.4-24.5-24.4-34.1-38.7zm71.4-48c18.5 8.6 34.6 24.1 44.4 43.5 9.9 19.7 12.7 42.2 8 63.7-7.7 35.4-34.6 64.4-69.6 75.1-46.8 15.8-50.8 21-50.8 21 13 1.5 26.2 .6 38.8-2.5 12-3 23.6-7.5 34.5-13.5 1.3-.7 2.6-1.4 3.9-2.1-13.8 12.8-29.4 23.3-46.1 31.2 10.3 5.4 21.3 9.8 32.8 13.1 .7-.7 1.4-1.5 2.2-2.2-20 12.6-42.6 19.4-65.7 19.6-38.4-.1-74.6-15.9-99.7-43.1 9.2 6.5 19.5 11.7 30.5 15.3 1.3-.2 2.7-.3 4.1-.4 4.4-11.5 10-22.4 16.9-32.7-19 .1-37.3-6.7-51.5-19.2-14.4-12.7-23.2-30.2-24.8-49-1.6-19.1 3.8-38 15.2-53.3 11.5-15.4 28.3-26.4 47.3-30.9 19.3-4.6 40.2-2.7 58.7 5.5zm19.3-176.6c-5.7-2.7-10.9-6.2-15.6-10.3-5.6 6.5-10 14-12.8 22.1-6.3 6.5-12.7 12.6-18.1 19.4 16.9-8.4 32.6-18.9 46.5-31.2zm64.8 52.6c11.4-12 20.4-26.2 26.4-41.8 8.7-2.2 17.2-5.4 25.3-9.4 1.5 11.8 1 23.6-1.3 35h-13.6c-11.5 5.5-24 10.5-36.8 16.2zm11.9-52.6c2.1-7.7 5-15.1 8.3-22-7.5-6.5-15.8-11.9-24.7-16.2 10.7 9.4 18.3 21.8 21.8 35.6-1.8 .8-3.6 1.7-5.4 2.6zM151.7 309.2c-12 1.3-23.9 6.2-33.1 13.9-9.2 7.6-15.2 18-16.8 29.5-1.5 11.4 1.5 23 8.3 32.3 6.9 9.3 16.7 15.7 27.6 18 10.9 2.3 22.3 1.1 32.1-3.5 9.7-4.6 17.3-12.3 21.4-21.7 4-9.3 4.4-20 .9-29.9-3.5-9.9-10.4-18.3-19.4-23.7-6.5-4-13.8-6-21-5.9zm4.7 67c-9.1 .7-17.6-4.6-21.1-13-3.4-8.4-.7-17.8 6.7-23.5 7.4-5.6 17.4-6 24.9-1.1 7.6 4.9 11.5 14.5 9.5 23.6-1.9 9.1-10.9 14.7-20 14zm198.8-67c-12 1.3-23.9 6.2-33.1 13.9-9.2 7.6-15.2 18-16.8 29.5-1.5 11.4 1.5 23 8.3 32.3 6.9 9.3 16.7 15.7 27.6 18 10.9 2.3 22.3 1.1 32.1-3.5 9.7-4.6 17.3-12.3 21.4-21.7 4-9.3 4.4-20 .9-29.9-3.5-9.9-10.4-18.3-19.4-23.7-6.4-4-13.7-6-21-5.9zm4.6 67c-9.1 .7-17.6-4.6-21.1-13-3.4-8.4-.7-17.8 6.7-23.5 7.4-5.6 17.4-6 24.9-1.1 7.6 4.9 11.5 14.5 9.5 23.6-1.9 9.1-10.9 14.7-20 14z" /></svg>
                    TripAdvisor
                  </Button>
                </div>
              </div>
            </div>
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
              className="bg-white text-primary hover:bg-white/90 w-full md:w-auto"
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
            <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm text-primary mb-2">
              <Camera className="w-6 h-6" />
            </div>
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
                icon: <PawPrint className="w-10 h-10" />,
                color: "bg-orange-100 text-orange-800 border-orange-200"
              },
              {
                title: "Seguridad Total",
                desc: "Ubicación segura y cercada. Tranquilidad garantizada durante toda tu estadía en el bosque.",
                icon: <ShieldCheck className="w-10 h-10" />,
                color: "bg-green-100 text-green-800 border-green-200"
              },
              {
                title: "Horarios",
                desc: "Check-in a partir de las 3:00 PM. El check-out de visitas (no hospedados) es a las 10:00 PM.",
                icon: <Clock className="w-10 h-10" />,
                color: "bg-blue-100 text-blue-800 border-blue-200"
              }
            ].map((info, i) => (
              <div key={i} className={`p-8 rounded-2xl border ${info.color} bg-opacity-50`}>
                <div className="mb-4 text-current opacity-80">{info.icon}</div>
                <h3 className="text-xl font-bold mb-2 font-serif">{info.title}</h3>
                <p className="opacity-90">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}