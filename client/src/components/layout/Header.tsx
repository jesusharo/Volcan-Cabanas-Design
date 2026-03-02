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
      <div className="bg-foreground text-background text-xs py-1.5 px-4 md:px-8 hidden md:flex justify-between items-center opacity-90">
        <div className="flex gap-4 items-center">
          <span className="opacity-60 text-[10px] uppercase tracking-wider">Marcas Asociadas</span>
          <a href="#" className="hover:text-primary transition-colors font-medium">Cabañas del Volcán</a>
          <span className="opacity-30">|</span>
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Inovationem</a>
          <span className="opacity-30">|</span>
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Invernaderos Frescos</a>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3 h-3" />
          <span>+52 (123) 456 7890</span>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`w-full px-4 md:px-8 py-4 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md shadow-sm py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className={`text-2xl font-serif font-bold tracking-tight ${isScrolled ? 'text-primary' : 'text-primary md:text-white text-shadow-sm'}`}>
              Cabañas del Volcán
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Cabañas", path: "#cabanas" },
              { label: "Tours", path: "#tours" },
              { label: "Historia", path: "#historia" },
              { label: "Ubicación", path: "#ubicacion" },
            ].map((item) => (
              <a 
                key={item.label}
                href={item.path}
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  isScrolled ? 'text-foreground' : 'text-white text-shadow-sm'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center gap-1 cursor-pointer text-sm font-medium ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              <Globe className="w-4 h-4" />
              <span>ES</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            
            <Button 
              className={`${
                isScrolled 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-white text-primary hover:bg-white/90"
              }`}
            >
              Reservar
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