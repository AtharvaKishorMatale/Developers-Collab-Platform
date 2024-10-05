import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/login/oauth/access_token': {
        target: 'https://github.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/user': {
        target: 'https://api.github.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      

      // Proxy for GitHub emails API request
      '/user/emails': {
        target: 'https://api.github.com',
        changeOrigin: true,  // To prevent host header issues
        secure: true,        // Use HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove `/api` prefix
      },
      '/api': {
        target: 'http://localhost:5000',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
