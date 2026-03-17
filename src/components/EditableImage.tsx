import React, { useRef } from 'react';

interface EditableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  isAdmin?: boolean;
  onImageChange?: (newUrl: string) => void;
}

export function EditableImage({ isAdmin, onImageChange, className, alt, ...props }: EditableImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (isAdmin && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      try {
        // Subida directa a nuestra API
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
          method: 'POST',
          body: file,
        });

        if (!response.ok) throw new Error('Error al subir imagen');
        
        const blob = await response.json();
        onImageChange(blob.url); // Actualizamos el estado con la nueva URL
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error al subir la imagen. Verifica tu conexión.");
      }
    }
  };

  return (
    <div className={`relative ${isAdmin ? 'cursor-pointer group' : ''}`} onClick={handleClick}>
      <img className={className} alt={alt} {...props} />
      
      {isAdmin && (
        <>
          <div className="absolute inset-0 bg-accent/20 border-2 border-accent border-dashed opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all rounded-[inherit] z-50">
            <span className="text-black font-bold text-xs bg-accent px-3 py-1 rounded shadow-lg uppercase tracking-wider">Cambiar Imagen</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}