import { useLanguage } from "@/lib/LanguageContext";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#0a0a0a] text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <h4 className="font-semibold mb-4 uppercase tracking-wider text-xs opacity-60">Sobre Nosotros</h4>
          <p className="text-sm opacity-80 max-w-xs">
            Naturaleza, confort y vistas inigualables.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-4 uppercase tracking-wider text-xs opacity-60">{t.nav.hospedaje}</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li><a href="#hospedaje" className="hover:text-accent transition-colors">{t.nav.hospedaje}</a></li>
            <li><a href="#experiencias" className="hover:text-accent transition-colors">{t.nav.experiencias}</a></li>
            <li><a href="#safari" className="hover:text-accent transition-colors">{t.nav.safari}</a></li>
            <li><a href="#logistica" className="hover:text-accent transition-colors">{t.nav.logistica}</a></li>
          </ul>
        </div>

        {/* Legal & Contact */}
        <div>
          <h4 className="font-semibold mb-4 uppercase tracking-wider text-xs opacity-60">Soporte</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> <a href="tel:3121500516">312 150 0516</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Políticas de Privacidad</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Términos y Condiciones</a></li>
          </ul>
        </div>

        {/* Social Proof & Trust */}
        <div>
          <h4 className="font-semibold mb-4 uppercase tracking-wider text-xs opacity-60">Social</h4>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-xs opacity-60 flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Cabañas del Volcán. Todos los derechos reservados.</p>
        <p className="mt-2 md:mt-0">Parte de Grupo Inovationem</p>
      </div>
    </footer>
  );
}