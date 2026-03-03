import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

export default function Inventionem() {
  const { t } = useLanguage();

  const handleWhatsAppClick = (customMessage?: string) => {
    const message = encodeURIComponent(customMessage || "Hola, me interesa información sobre Inventionem.");
    window.open(`https://wa.me/523121500516?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#1a1a1a]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80" 
            alt="Inventionem Hero" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 text-shadow-lg">
            {t.inventionem.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
            {t.inventionem.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-accent">
              {t.inventionem.title}
            </h2>
            <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
              <p>
                {t.inventionem.description}
              </p>
              <p>
                Explora nuestra propuesta culinaria donde cada ingrediente tiene un propósito y cada plato cuenta una historia.
              </p>
            </div>
            <Button 
              className="bg-accent text-black font-bold hover:bg-accent/90 px-10 py-8 rounded-xl uppercase tracking-widest text-lg"
              onClick={() => handleWhatsAppClick("Hola, me gustaría ver el menú de Inventionem.")}
            >
              {t.inventionem.cta}
            </Button>
          </div>
          <div className="rounded-[32px] overflow-hidden shadow-2xl h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80" 
              alt="Platillo Gourmet" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
