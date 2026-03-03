import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.hospedaje, path: "#hospedaje" },
    { label: t.nav.experiencias, path: "#experiencias" },
    { label: t.nav.safari, path: "#safari" },
    { label: t.nav.logistica, path: "#logistica" },
  ];

  const scrollToSection = (path: string) => {
    const targetId = path.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="w-full fixed top-0 z-50 transition-all duration-500">
      {/* Subheader / Brand Switcher */}
      <div className={`bg-foreground text-background text-xs py-2 px-4 md:px-8 hidden md:flex justify-between items-center transition-all duration-500 opacity-95`}>
        <div className="flex gap-6 items-center">
          <span className="opacity-50 text-[10px] uppercase tracking-[0.2em] font-bold">Ecosistema</span>
          <Link href="/" className={`${location === '/' ? 'text-[#27AE60] font-semibold' : 'opacity-60 hover:opacity-100 hover:text-[#27AE60]'} tracking-wide flex items-center gap-2 transition-all`}>
            {location === '/' && <span className="w-1.5 h-1.5 rounded-full bg-[#27AE60] animate-pulse"></span>}
            Cabañas del Volcán® / Tour X Volcán®
          </Link>
          <span className="opacity-20">|</span>
          <Link href="/inventionem" className={`${location === '/inventionem' ? 'text-[#27AE60] font-semibold' : 'opacity-60 hover:opacity-100 hover:text-[#27AE60]'} transition-all font-medium`}>
            Inventionem® <span className="font-normal opacity-70">(Escuela de Bosque)</span>
          </Link>
          <span className="opacity-20">|</span>
          <Link href="/frescos" className={`${location === '/frescos' ? 'text-[#27AE60] font-semibold' : 'opacity-60 hover:opacity-100 hover:text-[#27AE60]'} transition-all font-medium`}>
            Frescos y Orgánicos®
          </Link>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider opacity-80 hover:opacity-100 transition-opacity font-bold">
          <Phone className="w-3 h-3 text-[#27AE60]" />
          <a href="tel:3121500516">312 150 0516</a>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`w-full px-4 md:px-8 transition-all duration-500 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md shadow-sm py-2 border-b border-border/50" 
            : "bg-gradient-to-b from-black/60 to-transparent py-4 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center relative h-12 md:h-16">
          
          {/* Left: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => (
              <a 
                key={item.label}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.path);
                }}
                className={`text-[11px] uppercase tracking-widest font-bold hover:text-[#27AE60] transition-colors ${
                  isScrolled ? 'text-foreground' : 'text-white text-shadow-sm'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button - Left */}
          <button 
            className={`md:hidden p-2 z-50 ${isScrolled ? 'text-foreground' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500">
            <Link href="/" className="flex flex-col items-center group">
              <div className={`transition-all duration-500 flex items-center justify-center overflow-hidden ${
                isScrolled 
                  ? 'h-10 md:h-16 w-[100px] md:w-[160px]' 
                  : 'h-24 md:h-40 w-[120px] md:w-[160px]'
              }`}>
                <img 
                  src={isScrolled ? "/assets/logo-small.png" : "/assets/logo.png"} 
                  alt="Cabañas del Volcán Logo" 
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            </Link>
          </div>

          {/* Right: Actions (Language) */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLanguage('es')}
              className={`text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-1 rounded-[8px] transition-colors ${
                language === 'es' 
                  ? 'bg-white text-black' 
                  : isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/20'
              }`}
            >
              ES
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-1 rounded-[8px] transition-colors ${
                language === 'en' 
                  ? 'bg-white text-black' 
                  : isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/20'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl md:hidden animate-in fade-in duration-300">
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6 text-center">
            {navLinks.map((item) => (
              <a 
                key={item.label}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.path);
                }}
                className="text-2xl font-serif font-bold text-foreground uppercase tracking-widest"
              >
                {item.label}
              </a>
            ))}
            <div className="w-full h-px bg-border/50 max-w-[200px] my-4" />
            <div className="flex flex-col gap-4">
              <Link href="/inventionem" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium opacity-70">Inventionem®</Link>
              <Link href="/frescos" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium opacity-70">Frescos y Orgánicos®</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
