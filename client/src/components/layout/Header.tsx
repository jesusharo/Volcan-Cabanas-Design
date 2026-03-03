import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full fixed top-0 z-50 transition-all duration-500">
      {/* Subheader / Brand Switcher */}
      <div className={`bg-foreground text-background text-xs py-2 px-4 md:px-8 hidden md:flex justify-between items-center transition-all duration-500 opacity-95`}>
        <div className="flex gap-6 items-center">
          <span className="opacity-50 text-[10px] uppercase tracking-[0.2em] font-bold">Ecosistema</span>
          <a href="#" className="text-accent font-semibold tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            Cabañas del Volcán® / Tour X Volcán®
          </a>
          <span className="opacity-20">|</span>
          <a href="#" className="opacity-60 hover:opacity-100 hover:text-white transition-all font-medium">Inventionem® <span className="font-normal opacity-70">(Escuela de Bosque)</span></a>
          <span className="opacity-20">|</span>
          <a href="#" className="opacity-60 hover:opacity-100 hover:text-white transition-all font-medium">Frescos y Orgánicos®</a>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider opacity-80 hover:opacity-100 transition-opacity">
          <Phone className="w-3 h-3 text-accent" />
          <a href="tel:3121500516">312 150 0516</a>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`w-full px-4 md:px-8 transition-all duration-500 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md shadow-sm py-2 border-b border-border/50" 
            : "bg-gradient-to-b from-black/60 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          
          {/* Left: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: t.nav.hospedaje, path: "#hospedaje" },
              { label: t.nav.experiencias, path: "#experiencias" },
              { label: t.nav.safari, path: "#safari" },
              { label: t.nav.logistica, path: "#logistica" },
            ].map((item) => (
              <a 
                key={item.label}
                href={item.path}
                className={`text-sm font-medium hover:text-accent transition-colors ${
                  isScrolled ? 'text-foreground' : 'text-white text-shadow-sm'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500">
            <Link href="/" className="flex flex-col items-center group">
              <div className={`transition-all duration-500 flex items-center justify-center overflow-hidden w-[160px] h-[160px]`}>
                <img 
                  src={isScrolled ? "/assets/logo-small.png" : "/assets/logo.png"} 
                  alt="Cabañas del Volcán Logo" 
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            </Link>
          </div>

          {/* Right: Actions (Language) */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setLanguage('es')}
                className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                  language === 'es' 
                    ? 'bg-white text-black' 
                    : isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/20'
                }`}
              >
                ES
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                  language === 'en' 
                    ? 'bg-white text-black' 
                    : isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/20'
                }`}
              >
                EN
              </button>
            </div>
            
            <button className={`md:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
