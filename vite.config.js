import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react({
      // Faster React refresh in dev
      fastRefresh: true,
      // babel optimizations
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'icons/*.svg'],
      manifest: {
        name: 'SalaPro',
        short_name: 'SalaPro',
        description: 'App professionale per gestione sala ristorante e club',
        theme_color: '#7C6EF5',
        background_color: '#0E1118',
        display: 'standalone',
        orientation: 'any',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
          { src: 'icons/icon-144.png', sizes: '144x144', type: 'image/png' },
          { src: 'icons/icon-96.png',  sizes: '96x96',  type: 'image/png' }
        ],
        shortcuts: [
          { name: 'Prenotazioni', url: '/?section=prenotazioni' },
          { name: 'Guest List',   url: '/?section=guestlist' },
          { name: 'Tally',        url: '/?section=tally' }
        ]
      },
      workbox: {
        // Cache all static assets aggressively
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // Runtime caching strategy
        runtimeCaching: [
          {
            // Google Fonts
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ],
        // Skip waiting so updates apply immediately
        skipWaiting: true,
        clientsClaim: true,
      }
    })
  ],
  build: {
    outDir: 'dist',
    // Target modern browsers only (smaller bundles)
    target: 'es2020',
    // Enable minification
    minify: 'esbuild',
    // CSS code splitting
    cssCodeSplit: true,
    // Source maps only in dev
    sourcemap: false,
    // Warn if chunk > 1MB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
        },
        // Content-hash filenames for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      }
    }
  },
  // Optimize deps pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom'],
  }
})