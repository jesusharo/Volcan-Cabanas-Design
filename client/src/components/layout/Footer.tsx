import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <h3 className="text-2xl font-serif font-bold text-accent">Cabañas del Volcán</h3>
          <p className="text-sm opacity-80 max-w-xs">
            Hospedaje ecológico y experiencias inmersivas en la naturaleza. Conecta con el entorno.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-4 uppercase tracking-wider text-xs opacity-60">Explorar</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li><a href="#cabanas" className="hover:text-accent transition-colors">Nuestras Cabañas</a></li>
            <li><a href="#tours" className="hover:text-accent transition-colors">Tours y Experiencias</a></li>
            <li><a href="#historia" className="hover:text-accent transition-colors">Nuestra Historia</a></li>
            <li><a href="#ubicacion" className="hover:text-accent transition-colors">Cómo Llegar</a></li>
          </ul>
        </div>

        {/* Legal & Contact */}
        <div>
          <h4 className="font-semibold mb-4 uppercase tracking-wider text-xs opacity-60">Soporte</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li><a href="#" className="hover:text-accent transition-colors">Preguntas Frecuentes</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Políticas de Privacidad</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Contacto</a></li>
          </ul>
        </div>

        {/* Social Proof & Trust */}
        <div>
          <h4 className="font-semibold mb-4 uppercase tracking-wider text-xs opacity-60">Reconocimientos</h4>
          <div className="flex gap-4 items-center opacity-80 grayscale">
            <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center font-bold text-xs">Airbnb</div>
            <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center font-bold text-[10px] text-center">Trip<br/>Advisor</div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-2 uppercase tracking-wider text-xs opacity-60">Pagos Seguros</h4>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white/10 rounded text-xs">Visa</span>
              <span className="px-2 py-1 bg-white/10 rounded text-xs">Mastercard</span>
              <span className="px-2 py-1 bg-white/10 rounded text-xs">Amex</span>
            </div>
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