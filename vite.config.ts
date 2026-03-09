import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // 1. Quitamos root: 'client' para que busque el index.html en la raíz
  build: {
    outDir: 'dist', // 2. El outDir ahora es simplemente 'dist'
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      // 3. Ajustamos el alias para que encuentre la carpeta src correctamente
      '@': path.resolve(process.cwd(), 'src'), 
    },
  },
});