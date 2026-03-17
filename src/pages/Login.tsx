import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = '/'; // Correcto: Redirige a la página principal
      } else {
        if (res.status === 401) {
          setError('Contraseña incorrecta');
        } else if (res.status === 404) {
          setError('Error de conexión: API no encontrada (404)');
        } else {
          setError(`Error del servidor (${res.status}). Intenta más tarde.`);
        }
      }
    } catch (err) {
      setError('Error de conexión: No se pudo contactar al servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] text-white p-4 font-sans">
      <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-8 p-10 bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-serif font-bold text-center text-white">Admin Access</h1>
        
        <div className="space-y-4 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña Maestra"
            className="w-full p-4 pr-12 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C0CE00] transition-colors text-center tracking-widest"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {error && <p className="text-red-400 text-xs text-center uppercase tracking-widest font-bold">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#C0CE00] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-[#C0CE00]/90 transition-all disabled:opacity-50 hover:scale-[1.02]"
        >
          {loading ? 'Verificando...' : 'ENTRAR'}
        </button>
      </form>
    </div>
  );
}