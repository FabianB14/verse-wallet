import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
  define: {
    'process.env.REACT_APP_VERSE_API_URL': JSON.stringify(process.env.REACT_APP_VERSE_API_URL),
    'process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID': JSON.stringify(process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID),
    'process.env.REACT_APP_VERSE_CHAIN_ID': JSON.stringify(process.env.REACT_APP_VERSE_CHAIN_ID),
    'process.env.REACT_APP_API_KEY': JSON.stringify(process.env.REACT_APP_API_KEY),
  }
});