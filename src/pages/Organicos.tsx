import React from "react";
  import { Header } from "@/components/layout/Header";
  import { Footer } from "@/components/layout/Footer";
  import { useLanguage } from "@/lib/LanguageContext";

  export default function OrganicosPage() {
    const { t } = useLanguage();
    return (
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-grow pt-32 pb-24 px-6">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <span className="text-green-600 tracking-[0.3em] font-bold uppercase text-sm block">{t.organicos.tag}</span>
            <h1 className="text-4xl md:text-7xl font-sans font-black text-gray-900 leading-tight uppercase tracking-tighter">{t.organicos.title}</h1>
            <p className="text-xl md:text-2xl font-medium text-green-700/80">{t.organicos.subtitle}</p>
            <div className="w-24 h-1 bg-green-500 mx-auto my-12 rounded-full" />
            <p className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto font-normal">
              {t.organicos.description}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }