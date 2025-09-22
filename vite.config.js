import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Use VITE_BASE to control base path from environment (recommended for Render/GH-Pages)
// Fallback: in production use '/school-management-system/' but in dev use '/'.
const BASE = process.env.VITE_BASE || (process.env.NODE_ENV === 'production' ? '/school-management-system/' : '/')

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    // NOTE: don't try to use `tailwindcss()` as a Vite plugin here.
    // Tailwind should be configured via postcss.config.js (see notes).

    VitePWA({
      registerType: 'autoUpdate',
      // assets that live in `public/` and should be copied to the build
      includeAssets: ['ths_logo.jpg', 'favicon.ico', 'robots.txt'],
      manifest: {
        name: 'My Django React App',
        short_name: 'MyApp',
        description: 'A PWA built with Vite + React + Django backend',
        // start_url and scope should match your `base` when deploying under a subpath
        start_url: BASE,
        scope: BASE,
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: 'mobile.png', sizes: '128x128', type: 'image/png' },
          { src: 'desktop.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      // ensure the service worker precaches the typical assets
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,json}']
      }
    })
  ],

  server: {
    // use object form for proxy so you can set changeOrigin/secure etc.
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        // rewrite is optional — keep the /api prefix unless your backend expects differently
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
