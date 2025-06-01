import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/embeddablePortfolio.tsx',
      name: 'VisigencePortfolio',
      formats: ['iife'],
      fileName: () => 'visigence-portfolio.js',
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false,
    outDir: 'dist/embed',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});