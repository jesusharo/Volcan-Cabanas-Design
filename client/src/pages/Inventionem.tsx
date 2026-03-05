import React from "react";
  import { Header } from "@/components/layout/Header";
  import { Footer } from "@/components/layout/Footer";
  import { useLanguage } from "@/lib/LanguageContext";

  export default function InventionemPage() {
    const { t } = useLanguage();
    return (
      <div className="min-h-screen flex flex-col bg-[#1a1a1a] text-white selection:bg-accent selection:text-black">
        <Header />
        <main className="flex-grow pt-32 pb-24 px-6">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <span className="text-accent tracking-[0.3em] font-bold uppercase text-sm block">{t.inventionem.tag}</span>
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-white leading-tight">{t.inventionem.title}</h1>
            <p className="text-xl md:text-2xl font-serif italic text-accent/80">{t.inventionem.subtitle}</p>
            <div className="w-24 h-px bg-accent/30 mx-auto my-12" />
            <p className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-3xl mx-auto font-light">
              {t.inventionem.description}
            </p>
            <div className="pt-12">
               <div className="inline-block p-1 border border-accent/20 rounded-full">
                 <div className="px-12 py-4 bg-accent text-black font-bold tracking-widest uppercase rounded-full">Coming Soon</div>
               </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }