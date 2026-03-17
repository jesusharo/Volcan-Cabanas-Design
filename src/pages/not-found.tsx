import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#111111] text-white p-4 font-sans">
      <div className="flex flex-col items-center gap-6 text-center max-w-md animate-in fade-in zoom-in duration-500">
        <div className="p-6 bg-white/5 rounded-full border border-white/10 shadow-2xl">
          <AlertTriangle className="h-12 w-12 text-[#C0CE00]" />
        </div>
        
        <h1 className="text-6xl font-serif font-bold text-white tracking-tight">404</h1>
        
        <div className="space-y-3">
          <h2 className="text-xl font-medium tracking-wide">Página no encontrada</h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
            Lo sentimos, la ruta que buscas no existe o ha cambiado de lugar.
          </p>
        </div>

        <Link href="/" className="mt-6 px-8 py-4 bg-[#C0CE00] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-[#C0CE00]/90 transition-all hover:scale-105 shadow-lg shadow-[#C0CE00]/20">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}