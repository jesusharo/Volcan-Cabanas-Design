import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'wouter';

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  // Solo mostramos la navegación principal si estamos en la página de inicio.
  const showMainNavigation = location === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#hospedaje', label: t.nav.hospedaje },
    { href: '#experiencias', label: t.nav.experiencias },
    { href: '#safari', label: t.nav.safari },
    { href: '#como-llegar', label: t.nav.logistica },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {showMainNavigation && navItems.map(item => (
        <a
          key={item.label}
          href={item.href}
          onClick={() => isMobile && setIsOpen(false)}
          className="text-sm font-semibold uppercase tracking-widest transition-colors hover:text-accent"
        >
          {item.label}
        </a>
      ))}
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-24">
          <a href="/" className="text-xl font-bold font-serif text-white transition-opacity hover:opacity-80">
            Cabañas del Volcán
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <NavLinks />
            <button onClick={toggleLanguage} className="text-xs font-bold uppercase tracking-widest border px-3 py-1 rounded-full hover:bg-white hover:text-black transition-colors">
              {language === 'es' ? 'EN' : 'ES'}
            </button>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl absolute top-24 left-0 right-0 border-t border-white/10">
          <nav className="flex flex-col items-center gap-8 py-8">
            <NavLinks isMobile />
            <button onClick={toggleLanguage} className="text-xs font-bold uppercase tracking-widest border px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
              {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}