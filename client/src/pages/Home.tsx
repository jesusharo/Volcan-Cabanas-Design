import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCabins, getTours, getTestimonials, type Cabin, type Tour, type Testimonial } from "@/lib/notion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, MessageCircle } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export default function Home() {
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Load mock data from "Notion"
    getCabins().then(setCabins);
    getTours().then(setTours);
    getTestimonials().then(setTestimonials);
  }, []);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const handleWhatsAppClick = (section: string) => {
    const message = encodeURIComponent(`Hola, me interesa información sobre ${section}.`);
    window.open(`https://wa.me/521234567890?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      {/* Floating WhatsApp Button */}
      <button 
        onClick={() => handleWhatsAppClick("reservaciones generales")}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Hero Section - Dynamic Slider */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-background">
        {cabins.length > 0 ? (
          <div className="w-full h-full relative" ref={emblaRef}>
            <div className="flex h-full">
              {cabins.map((cabin) => (
                <div key={cabin.id} className="relative flex-[0_0_100%] h-full">
                  <div className="absolute inset-0 bg-black/40 z-10" />
                  <img 
                    src={cabin.imageUrl} 
                    alt={cabin.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto">
                    <span className="text-accent uppercase tracking-[0.2em] text-sm md:text-base font-medium mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      Bienvenido a la Naturaleza
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight max-w-2xl text-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-1000">
                      {cabin.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10 text-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                      {cabin.description}
                    </p>
                    <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                      <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-base px-8">
                        Ver Detalles
                      </Button>
                      <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
                        Explorar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Slider Controls */}
            <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
              {cabins.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Ir a diapositiva ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </section>

      {/* Historia & Valores */}
      <section id="historia" className="py-24 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Nuestro Origen en el Bosque</h2>
            <div className="w-20 h-1 bg-primary rounded"></div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Nacimos de un sueño profundo: crear un santuario donde la arquitectura moderna y la naturaleza salvaje coexistan en perfecta armonía. Cabañas del Volcán no es solo alojamiento, es una pausa en el tiempo.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Diseñamos cada espacio utilizando materiales de la región, respetando el entorno y ofreciendo una experiencia inmersiva que rejuvenece el espíritu.
            </p>
          </div>
          <div className="relative aspect-square md:aspect-auto md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            {cabins[0] && (
              <img src={cabins[0].imageUrl} alt="Cabañas exterior" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </section>

      {/* Sección de Tours (Experiencias) */}
      <section id="tours" className="py-24 px-4 md:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-primary font-medium tracking-widest uppercase text-sm">Experiencias</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Conecta con el Entorno</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-card rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={tour.imageUrl} 
                    alt={tour.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    ${tour.price} MXN
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold">{tour.title}</h3>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    onClick={() => handleWhatsAppClick(tour.title)}
                  >
                    Consultar Disponibilidad <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-4 md:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12">Lo que dicen nuestros huéspedes</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {testimonials.map((testi) => (
              <div key={testi.id} className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-4 italic text-white/90">"{testi.quote}"</p>
                <p className="font-semibold text-accent">{testi.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logística & FAQ breve */}
      <section id="ubicacion" className="py-24 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Cómo Llegar</h2>
            <p className="text-muted-foreground">
              Estamos ubicados en las faldas del volcán, a solo 45 minutos del centro de la ciudad. El camino es accesible para cualquier vehículo.
            </p>
            <div className="bg-card p-6 rounded-xl shadow-sm border">
              <h4 className="font-semibold mb-2">Dirección</h4>
              <p className="text-muted-foreground text-sm">Carretera al Volcán Km 15, Bosque Alto, México.</p>
            </div>
            <Button size="lg" className="w-full md:w-auto">
              Ver Mapa en Google Maps
            </Button>
          </div>
          
          <div className="bg-muted rounded-2xl h-[400px] flex items-center justify-center border border-border">
            {/* Placeholder for actual Interactive Map */}
            <div className="text-center text-muted-foreground space-y-2">
              <MapPin className="w-12 h-12 mx-auto opacity-50" />
              <p>Mapa Interactivo</p>
              <p className="text-sm">(Integración con Google Maps)</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}