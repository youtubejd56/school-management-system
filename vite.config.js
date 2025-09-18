import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/school-management-system/', // ✅ ensure same path as GitHub Pages
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['ths_logo.jpg'], // 👈 if you want favicon in manifest too
      manifest: {
        name: 'My Django React App',
        short_name: 'MyApp',
        description: 'A PWA built with Vite + React + Django backend',
        start_url: '/school-management-system/', // 👈 important for PWA routing
        scope: '/school-management-system/',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'mobile.png', // 👈 must exist in /public
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'desktop.png', // 👈 must exist in /public
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})
