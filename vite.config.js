import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Always use correct base for GitHub Pages
// Local dev = '/', Production (Pages) = '/school-management-system/'
const BASE =
  process.env.NODE_ENV === 'production'
    ? '/school-management-system/'
    : '/'

export default defineConfig({
  base: BASE,

  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      filename: 'manifest.json', // ✅ browsers expect manifest.json
      includeAssets: [
        'ths_logo.jpg',
        'favicon.ico',
        'robots.txt',
        'mobile.png',
        'desktop.png'
      ],

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
          {
            src: 'mobile.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'desktop.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,png,webp,svg,json}'],
        globIgnores: [
          '**/*.map',
          '**/assets/**/images_side-*.jpg',
          '**/assets/**/intro.mp4',
          '**/assets/**/large/*'
        ],
        maximumFileSizeToCacheInBytes: 25 * 1024 * 1024,

        runtimeCaching: [
          {
            urlPattern: /^.*\.(?:png|jpg|jpeg|webp|svg|gif)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
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

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
