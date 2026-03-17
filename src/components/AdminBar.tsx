import React, { useState } from 'react';
import type { ContentData } from '@/lib/content-types';
import { Save, Edit3, X } from 'lucide-react';

interface AdminBarProps {
  content: ContentData | null;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export function AdminBar({ content, isAdmin, onToggleAdmin }: AdminBarProps) {
  const [saving, setSaving] = useState(false);

  const handlePublish = async () => {
    if (!content) return;
    
    const confirm = window.confirm("¿Estás seguro de que quieres publicar los cambios en el sitio web?");
    if (!confirm) return;

    setSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (!response.ok) throw new Error('Error al guardar');
      
      alert('¡Cambios publicados con éxito!');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al guardar los cambios.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-3">
      {isAdmin && (
        <button
          onClick={handlePublish}
          disabled={saving}
          className="flex items-center gap-2 bg-accent text-black px-6 py-3 rounded-full shadow-2xl hover:bg-accent/90 hover:scale-105 transition-all font-bold uppercase tracking-widest text-xs disabled:opacity-50 disabled:scale-100"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Publicando...' : 'Publicar Cambios'}
        </button>
      )}
      
      <button 
        onClick={onToggleAdmin}
        className={`p-3 rounded-full shadow-xl transition-all hover:scale-110 ${isAdmin ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'}`}
        title={isAdmin ? "Salir del modo edición" : "Entrar en modo edición"}
      >
        {isAdmin ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
      </button>
    </div>
  );
}