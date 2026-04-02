import React, { useState } from 'react';

interface EditableWrapperProps {
  isAdmin: boolean;
  isHidden?: boolean;
  onToggleVisibility: () => void;
  children: React.ReactNode;
}

export const EditableWrapper: React.FC<EditableWrapperProps> = ({ 
  isAdmin, 
  isHidden, 
  onToggleVisibility, 
  children 
}) => {
  if (!isAdmin) {
    if (isHidden) return null;
    return <>{children}</>;
  }

  return (
    <div className={`relative group border-2 ${isHidden ? 'border-red-400 opacity-60 grayscale-[0.5]' : 'border-transparent hover:border-blue-400/50'} transition-all duration-300`}>
      <div className="absolute top-4 right-4 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }}
          className={`${isHidden ? 'bg-red-600' : 'bg-blue-600'} text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xl uppercase tracking-wider`}
        >
          {isHidden ? 'Sección Oculta' : 'Visible'}
        </button>
      </div>
      {children}
    </div>
  );
};

interface EditableTextProps {
  isAdmin: boolean;
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  isAdmin, 
  value, 
  onChange, 
  className, 
  as: Component = 'span' 
}) => {
  if (!isAdmin) return <Component className={className}>{value}</Component>;

  return (
    <Component
      className={`${className} outline-none border-b border-dashed border-transparent hover:border-blue-400/50 focus:bg-blue-50/10 transition-colors cursor-text`}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const newValue = e.currentTarget.textContent || '';
        if (newValue !== value) onChange(newValue);
      }}
    >
      {value}
    </Component>
  );
};

interface EditableImageProps {
  isAdmin: boolean;
  src: string;
  onUpload: (file: File) => void;
  className?: string;
  alt?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ isAdmin, src, onUpload, className, alt = "" }) => {
  const [isUploading, setIsUploading] = useState(false);

  if (!isAdmin) return <img src={src} className={className} alt={alt} />;

  return (
    <div className={`relative group ${className}`}>
      <img src={src} className="w-full h-full object-cover" alt={alt} />
      <label className="absolute inset-0 bg-blue-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
        <span className="bg-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
          {isUploading ? 'Subiendo...' : 'Cambiar Imagen'}
        </span>
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              setIsUploading(true);
              try { await onUpload(file); } finally { setIsUploading(false); }
            }
          }} 
        />
      </label>
    </div>
  );
};