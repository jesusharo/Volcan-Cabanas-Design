'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/'); // Si entra, lo mandamos al inicio ya como admin
    } else {
      setError('Clave incorrecta. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1c2c] text-white p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-3xl font-serif font-bold">Panel de Control</h1>
        <p className="text-white/60">Cabañas del Volcán</p>
        <input 
          type="password" 
          placeholder="Ingresa la clave maestra"
          className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-accent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button className="w-full bg-accent text-black font-bold py-4 rounded-xl hover:scale-105 transition-transform">
          ENTRAR
        </button>
      </form>
    </div>
  );
}