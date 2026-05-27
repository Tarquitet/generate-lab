import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Ahora manualChunks es una función, como exige Rolldown/Vite nuevo
        manualChunks(id) {
          // Todo lo que venga de node_modules se separa del código de tu app
          if (id.includes('node_modules')) {
            // Si es Three.js (muy pesado), lo metemos en su propio archivo
            if (id.includes('three')) {
              return 'three-vendor';
            }
            // Si es React, lo metemos en otro
            if (id.includes('react') || id.includes('@react')) {
              return 'react-vendor';
            }
            // Cualquier otra librería (como react-colorful)
            return 'vendor';
          }
        },
      },
    },
  },
});
