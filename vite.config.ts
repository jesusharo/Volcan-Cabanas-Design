import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    // 2. El build se generará en la carpeta 'dist' en la raíz del proyecto
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      // 3. Ajustamos el alias para que apunte a 'client/src'
      '@': path.resolve(process.cwd(), 'src'), 
    },
  },
});