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
