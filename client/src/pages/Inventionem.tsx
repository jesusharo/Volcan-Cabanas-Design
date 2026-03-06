import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import { CheckCircle2, BookOpen, FlaskConical, GraduationCap, Video, CalendarPlus, Building2, Leaf, Droplets, Lightbulb, MessageCircle } from "lucide-react";

const tabIcons: Record<string, React.ReactNode> = {
  primary: <BookOpen className="w-5 h-5" />,
  secondary: <FlaskConical className="w-5 h-5" />,
  highschool: <GraduationCap className="w-5 h-5" />,
};

const expertiseIcons = [
  <Building2 className="w-8 h-8" />,
  <Lightbulb className="w-8 h-8" />,
  <Leaf className="w-8 h-8" />,
  <Droplets className="w-8 h-8" />,
];

export default function InventionemPage() {
  const { t } = useLanguage();
  const inv = t.inventionem as any;
  const [activeTab, setActiveTab] = useState<string>("primary");

  const tabs = inv.tabs || {};
  const currentTab = tabs[activeTab] || tabs.primary || {};

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white selection:bg-[#C0CE00] selection:text-black">
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
          onClick={() => window.open("https://wa.me/523121500516?text=Hola, me interesa información sobre Inventionem Escuela de Bosque.", "_blank")}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>

      <main className="flex-grow pt-28">

        {/* 1. Credentials Banner */}
        <section className="bg-[#1B3022] text-white py-16 px-6">
          <div className="max-w-6xl mx-auto text-center space-y-6">
            <span className="text-[#C0CE00] tracking-[0.3em] font-black uppercase text-xs block">{inv.credentials?.tag}</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">{inv.credentials?.title}</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">{inv.credentials?.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {inv.credentials?.areas?.map((area: string, i: number) => (
                <span key={i} className="px-5 py-2.5 border border-white/20 rounded-full text-sm font-semibold bg-white/5 hover:bg-white/10 transition-colors">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Hero subtitle */}
        <section className="bg-[#111111] py-16 px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">{inv.title}</h2>
            <p className="text-lg text-white/60 font-medium">{inv.subtitle}</p>
            <div className="w-20 h-1 bg-white/15 mx-auto rounded-full mt-6" />
          </div>
        </section>

        {/* 2. Tabs por Niveles Educativos */}
        <section className="bg-[#1a1a1a] py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:border-b-2 border-white/10 mb-12">
              {Object.keys(tabs).map((key) => {
                const tab = tabs[key];
                return (
                  <button
                    key={key}
                    data-testid={`tab-${key}`}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-3 px-6 py-4 sm:py-5 font-bold text-sm uppercase tracking-widest transition-all rounded-t-xl sm:rounded-t-xl sm:rounded-b-none ${
                      activeTab === key
                        ? "bg-[#C0CE00] text-black shadow-lg sm:border-b-2 sm:border-[#C0CE00]"
                        : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {tabIcons[key]}
                    <div className="text-left">
                      <div>{tab.label}</div>
                      <div className={`text-[10px] font-normal normal-case tracking-normal ${activeTab === key ? 'text-black/50' : 'text-white/30'}`}>
                        {tab.sublabel}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-4xl font-serif font-bold text-white">{currentTab.label}</h3>
                  <p className="text-white/50 text-lg">{currentTab.description}</p>
                </div>
                <span className="shrink-0 px-5 py-2 bg-[#C0CE00] text-black text-sm font-bold rounded-full uppercase tracking-wider">
                  {currentTab.duration}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {currentTab.subjects?.map((subject: any, i: number) => (
                  <div key={i} data-testid={`subject-${activeTab}-${i}`} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 bg-[#C0CE00]/15 rounded-xl flex items-center justify-center text-[#C0CE00]">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-1">{subject.title}</h4>
                        <p className="text-white/50 text-sm leading-relaxed">{subject.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Educación Abierta y Transparente */}
        <section className="bg-[#1B3022] text-white py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-16">{inv.openEducation?.title}</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-[#C0CE00]/20 rounded-2xl flex items-center justify-center mb-6">
                  <CalendarPlus className="w-7 h-7 text-[#C0CE00]" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{inv.openEducation?.flexTitle}</h3>
                <p className="text-white/70 leading-relaxed text-base">{inv.openEducation?.flexDesc}</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Video className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{inv.openEducation?.youtubeTitle}</h3>
                <p className="text-white/70 leading-relaxed text-base">{inv.openEducation?.youtubeDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Costos e Inversión */}
        <section className="bg-[#111111] py-20 px-6">
          <div className="max-w-6xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">{inv.pricing?.title}</h2>
            <p className="text-lg text-white/50">{inv.pricing?.subtitle}</p>
            <div className="w-20 h-1 bg-white/15 mx-auto rounded-full" />
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {inv.pricing?.cards?.map((card: any, i: number) => (
              <div
                key={i}
                data-testid={`pricing-card-${i}`}
                className={`rounded-3xl p-8 transition-all hover:shadow-xl ${
                  card.highlight
                    ? "bg-[#C0CE00] text-black shadow-2xl scale-[1.02]"
                    : "bg-white/5 text-white border border-white/10 shadow-md"
                }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${card.highlight ? 'text-black' : 'text-white'}`}>{card.name}</h3>
                <div className="mb-1">
                  <span className="text-4xl font-black">{card.price}</span>
                  <span className={`text-sm ml-2 ${card.highlight ? 'text-black/50' : 'text-white/40'}`}>{card.period}</span>
                </div>
                <p className={`text-sm mb-8 ${card.highlight ? 'text-black/40' : 'text-white/30'}`}>{card.monthly}</p>
                <ul className="space-y-3">
                  {card.features?.map((feature: string, j: number) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${card.highlight ? 'text-black/60' : 'text-[#C0CE00]'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => window.open(`https://wa.me/523121500516?text=Hola, me interesa el plan "${card.name}" de Inventionem.`, "_blank")}
                  className={`w-full mt-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${
                    card.highlight
                      ? "bg-black text-white hover:bg-black/80"
                      : "bg-[#C0CE00] text-black hover:bg-[#C0CE00]/90"
                  }`}
                >
                  {t.calculator?.consult || "Consultar"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Grid de Áreas de Experticia */}
        <section className="bg-[#1a1a1a] py-20 px-6">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">{inv.expertise?.title}</h2>
            <div className="w-20 h-1 bg-white/15 mx-auto rounded-full mt-6" />
          </div>

          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {inv.expertise?.areas?.map((area: any, i: number) => (
              <div key={i} data-testid={`expertise-${i}`} className="group bg-white/5 p-8 rounded-3xl text-center border border-white/10 hover:border-white/20 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#C0CE00] group-hover:bg-[#C0CE00] group-hover:text-black transition-colors">
                  {expertiseIcons[i]}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">{area.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Footer de Alianzas */}
        <section className="bg-[#0a0a0a] text-white py-16 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center space-y-10">
            <h3 className="text-2xl md:text-3xl font-serif font-bold">{inv.alliances?.title}</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {inv.alliances?.partners?.map((partner: string, i: number) => (
                <div key={i} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                  <GraduationCap className="w-6 h-6 text-[#C0CE00]" />
                  <span className="text-sm md:text-base font-medium tracking-wide">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
