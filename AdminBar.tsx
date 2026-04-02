import React from 'react';

interface AdminBarProps {
  onSave: () => void;
  onCancel: () => void;
  onLogout: () => void;
}

const AdminBar: React.FC<AdminBarProps> = ({ onSave, onCancel, onLogout }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-14 bg-stone-900 text-stone-100 flex items-center justify-between px-6 z-[9999] shadow-2xl border-b border-stone-700">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        <span className="font-bold tracking-tight uppercase text-[10px] sm:text-xs">Modo Edición Activo</span>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onCancel}
          className="text-stone-400 hover:text-white text-xs font-medium transition-colors px-2 py-1"
        >
          Cancelar
        </button>
        <button 
          onClick={onSave}
          className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-1.5 px-4 rounded transition-all shadow-lg shadow-green-900/20"
        >
          Guardar Cambios
        </button>
        <div className="w-px h-6 bg-stone-700 mx-1 hidden sm:block" />
        <button 
          onClick={onLogout}
          className="bg-stone-800 hover:bg-red-900/40 text-stone-300 hover:text-red-200 text-xs py-1.5 px-3 rounded border border-stone-700 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminBar;