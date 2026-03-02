import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Globe, Menu, ChevronDown, Phone } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full fixed top-0 z-50 transition-all duration-300">
      {/* Subheader / Brand Switcher */}
      <div className="bg-foreground text-background text-xs py-2 px-4 md:px-8 hidden md:flex justify-between items-center opacity-95">
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
        className={`w-full px-4 md:px-8 py-4 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md shadow-sm py-3 border-b border-border/50" 
            : "bg-gradient-to-b from-black/60 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className={`text-2xl font-serif font-bold tracking-tight ${isScrolled ? 'text-primary' : 'text-white text-shadow-md'}`}>
              Cabañas del Volcán<span className="text-accent text-3xl leading-none">.</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Hospedaje", path: "#hospedaje" },
              { label: "Experiencias", path: "#experiencias" },
              { label: "Safari Fotográfico", path: "#safari" },
              { label: "Logística", path: "#logistica" },
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

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center gap-1 cursor-pointer text-sm font-medium ${isScrolled ? 'text-foreground hover:text-accent' : 'text-white hover:text-white/80'} transition-colors`}>
              <Globe className="w-4 h-4" />
              <span>ES</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            
            <Button 
              className={`${
                isScrolled 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-white text-primary hover:bg-white/90"
              } font-semibold px-6 shadow-lg`}
            >
              Ver Disponibilidad
            </Button>
            
            <button className={`md:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}