import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? '/generate-lab/' : '/', // 🔥 OBLIGATORIO
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('three')) return 'three-vendor';
              if (id.includes('react') || id.includes('@react')) return 'react-vendor';
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
