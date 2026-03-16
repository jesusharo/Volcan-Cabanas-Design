import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import type { LocalizedString } from '@/lib/content-types';

interface EditableTextProps {
  value: LocalizedString;
  onChange: (newValue: LocalizedString) => void;
  isAdmin?: boolean;
  className?: string;
  multiline?: boolean;
  label?: string;
}

export function EditableText({
  value,
  onChange,
  isAdmin = false,
  className = "",
  multiline = false,
  label
}: EditableTextProps) {
  const { language } = useLanguage();

  // Si no es admin, solo renderizamos el texto en el idioma actual
  if (!isAdmin) {
    return <span className={className}>{value[language as 'es' | 'en']}</span>;
  }

  const handleChange = (lang: 'es' | 'en', text: string) => {
    onChange({
      ...value,
      [lang]: text
    });
  };

  const InputTag = multiline ? 'textarea' : 'input';

  return (
    <div className={`p-4 border-2 border-dashed border-accent/50 rounded-lg bg-black/40 backdrop-blur-sm ${className} my-2`}>
      {label && <p className="text-xs font-bold text-accent uppercase mb-3">{label}</p>}
      <div className="grid gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest pl-1">Español</label>
          <InputTag
            className="w-full p-2.5 rounded-md bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20"
            value={value.es}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange('es', e.target.value)}
            rows={multiline ? 3 : undefined}
            placeholder="Texto en español..."
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest pl-1">English</label>
          <InputTag
            className="w-full p-2.5 rounded-md bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20"
            value={value.en}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange('en', e.target.value)}
            rows={multiline ? 3 : undefined}
            placeholder="English text..."
          />
        </div>
      </div>
    </div>
  );
}