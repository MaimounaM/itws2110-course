import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { rollupOptions: { input: { main: 'index.html', micro: '00-micro.html' } } },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
});
