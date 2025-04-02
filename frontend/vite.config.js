import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Default output directory
    // Other build options...
  },
  base: '/', // Default base URL
  server: {
    // Development server options (won't affect Vercel production)
  }
});
