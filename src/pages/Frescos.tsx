import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import { Users, ShieldCheck, Star } from "lucide-react";

export default function Frescos() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#fdfdfd]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#e8f5e9]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80" 
            alt="Frescos y Orgánicos Hero" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#232323] mb-6">
            {t.frescos.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            {t.frescos.description}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: t.frescos.items[0].title, 
                desc: t.frescos.items[0].desc, 
                icon: <div className="w-20 h-20 bg-[#e8f5e9] rounded-[24px] flex items-center justify-center mb-8"><Users className="text-[#2e7d32] w-10 h-10"/></div>
              },
              { 
                title: t.frescos.items[1].title, 
                desc: t.frescos.items[1].desc, 
                icon: <div className="w-20 h-20 bg-[#e8f5e9] rounded-[24px] flex items-center justify-center mb-8"><ShieldCheck className="text-[#2e7d32] w-10 h-10"/></div>
              },
              { 
                title: t.frescos.items[2].title, 
                desc: t.frescos.items[2].desc, 
                icon: <div className="w-20 h-20 bg-[#e8f5e9] rounded-[24px] flex items-center justify-center mb-8"><Star className="text-[#2e7d32] w-10 h-10"/></div>
              }
            ].map((item, idx) => (
              <div key={idx} className="p-12 bg-white border border-border/40 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-300">
                {item.icon}
                <h3 className="text-3xl font-serif font-bold text-[#232323] mb-6">{item.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Section - visual */}
      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-[40px] overflow-hidden shadow-2xl h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80" 
              alt="Huerto Orgánico" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#232323]">Sostenibilidad en cada paso</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nuestro compromiso con el medio ambiente va más allá de la siembra. Utilizamos técnicas de riego eficientes, compostaje local y rotación de cultivos para mantener la salud del suelo y la biodiversidad del Ejido San Antonio.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
