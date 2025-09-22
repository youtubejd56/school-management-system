import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// If you set VITE_BASE in env, that will be used.
// Otherwise in production we use '/school-management-system/', in dev we use '/'
const BASE = process.env.VITE_BASE || (process.env.NODE_ENV === 'production' ? '/school-management-system/' : '/')

export default defineConfig({
  base: BASE,
  plugins: [
    react(),

    // PWA config
    VitePWA({
      registerType: 'autoUpdate',
      // files placed in /public — list things that must always be copied
      includeAssets: ['ths_logo.jpg', 'favicon.ico', 'robots.txt', 'mobile.png', 'desktop.png'],

      // web app manifest (icons must live in public/)
      manifest: {
        name: 'My Django React App',
        short_name: 'MyApp',
        description: 'A PWA built with Vite + React + Django backend',
        start_url: BASE,
        scope: BASE,
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: 'mobile.png', sizes: '128x128', type: 'image/png', purpose: 'any' },
          { src: 'desktop.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },

      // Workbox options. We:
      //  - exclude source maps and specific large images from the precache (globIgnores)
      //  - allow a larger file limit (so if you really must precache large files it won't error)
      //  - add runtimeCaching rules so images and API calls are cached at runtime instead of precached.
      workbox: {
        // patterns to precache (do not include map files)
        globPatterns: ['**/*.{js,css,html,png,webp,svg,json}'],

        // skip precaching very large or unwanted files (adjust the glob to match your heavy assets)
        globIgnores: ['**/*.map', '**/assets/**images_side-*.jpg', '**/assets/***large*.*'],

        // increase this if you intentionally want to precache big files (default is 2 MiB)
        // set high enough for your largest desired precached bundle (here 25 MiB).
        maximumFileSizeToCacheInBytes: 25 * 1024 * 1024,

        // runtime caching rules (Workbox-style)
        runtimeCaching: [
          {
            // cache images requested at runtime, use StaleWhileRevalidate for UX
            urlPattern: /^.*\.(?:png|jpg|jpeg|webp|svg|gif)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }, // 30 days
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // cache API calls with NetworkFirst so the app still works offline with last success
            urlPattern: /^\/api\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ],

  // dev server + proxy (explicit port so manifest/dev port mismatch issues are easier to debug)
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },

  // small build tweaks
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // disable sourcemaps in production builds to avoid accidentally precaching .map files
    sourcemap: false
  }
})
