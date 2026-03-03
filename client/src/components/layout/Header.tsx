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
      <div className={`bg-foreground text-background text-xs py-2 px-4 md:px-8 hidden md:flex justify-between items-center transition-all duration-500 ${isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden' : 'opacity-95'}`}>
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
              <div className={`transition-all duration-500 flex items-center justify-center ${isScrolled ? 'w-10 h-10' : 'w-20 h-20 mb-1'}`}>
                <svg viewBox="0 0 112 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                  <path d="M55.9053 13C59.0904 13 62.2842 13.8207 65.1396 15.4697L89.5752 29.5762C95.2767 32.868 98.8105 38.9894 98.8105 45.5723V83.7598C98.8104 90.3424 95.2771 96.4644 89.5752 99.7559L65.1406 113.863C59.4399 117.155 52.3704 117.155 46.6699 113.863L22.2354 99.7559C16.5335 96.4644 13.0001 90.3424 13 83.7598V45.5723C13 38.9893 16.5338 32.868 22.2354 29.5762L46.6709 15.4688C49.5264 13.8197 52.7203 13 55.9053 13Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M95.7128 67.9699C95.7121 67.1435 95.5904 66.3184 95.3511 65.515L95.4751 60.2373L95.4721 59.8829L95.2231 59.6386C94.9193 59.3401 94.8172 59.2407 88.0516 59.3654L88.0118 59.3664C85.6666 56.9507 82.4212 55.5725 79.0486 55.5725H78.2159L78.2402 66.8383L33.416 67.0511L33.537 46.5778L38.6984 43.8833H27.3578C24.6539 41.674 21.3112 40.3826 17.8335 40.1944C17.5396 40.1789 16.0458 44.5863 16.0458 44.5863V83.7598C16.0458 89.2526 19.0009 94.3711" fill="#0B251C" />
                  {/* Rest of SVG paths simplified for the example, but the logic remains */}
                  <path d="M55.905 17.8483C53.5499 17.8483 51.1947 18.4546 49.0945 19.6676L24.6592 33.7752C20.4579 36.2008 17.8484 40.7209 17.8484 45.5718V83.7597C17.8484 88.6106 20.4579 93.1311 24.6592 95.5563L49.0945 109.664C53.2946 112.09 58.5151 112.09 62.7158 109.664L87.1511 95.5563C91.3525 93.1311 93.9619 88.6106 93.9619 83.7597V45.5718C93.9619 40.7209 91.3525 36.2008 87.1511 33.7752L62.7158 19.6676C60.6156 18.4546 58.2605 17.8483 55.905 17.8483Z" fill="#0B251C" opacity="0.1" />
                  <path d="M31.9833 74.4949C32.7286 74.4949 33.3173 74.6923 33.8272 75.1274L33.8661 75.0879V73.862C33.3565 73.49 32.7286 73.3477 31.9833 73.3477C30.3834 73.3477 29.081 74.6451 29.081 76.235C29.081 77.8246 30.3834 79.122 31.9833 79.122C32.7286 79.122 33.3565 78.9794 33.8661 78.6078V77.3819L33.8272 77.3423C33.3173 77.7774 32.7286 77.9749 31.9833 77.9749C31.0423 77.9749 30.297 77.1841 30.297 76.235C30.297 75.2857 31.0423 74.4949 31.9833 74.4949Z" fill="#0B251C"/>
                </svg>
              </div>
              <span className={`font-serif font-bold tracking-tight transition-all duration-500 whitespace-nowrap ${
                isScrolled ? 'opacity-0 h-0 scale-0' : 'text-xl text-white text-shadow-md'
              }`}>
                Cabañas del Volcán
              </span>
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
