import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/Adelfia/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      manifest: {
        "name": "La faida tra Montrone e Canneto",
        "short_name": "Salva Adelfia",
        "description": "Un antico villaggio è minacciato da un imminente attacco. La Torre di Canneto, deve essere messa in sicurezza prima del calare della notte.",
        "start_url": "/Adelfia/",
        "display": "fullscreen",
        "background_color": "#463B3E",
        "theme_color": "#00A63E",
        "orientation": "landscape",
        "scope": "/Adelfia/",
        "lang": "it-IT",
        "dir": "ltr",
        "categories": ["education", "game"],
        "screenshots": [
          {
            "src": "/Adelfia/screenshot/1-desktop.png",
            "sizes": "1920x1080",
            "type": "image/png",
            "label": "Inizio del gioco",
            "platform": "desktop",
            "form_factor": "wide"
          },
          {
            "src": "/Adelfia/screenshot/1-mobile.png",
            "sizes": "874x402",
            "type": "image/png",
            "label": "Inizio del gioco",
            "platform": "mobile",
            "form_factor": "narrow"
          }
        ],
        "icons": [
          {
            "src": "logos/icon-48x48.png",
            "sizes": "48x48",
            "type": "image/png"
          },
          {
            "src": "logos/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "logos/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "logos/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "logos/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "logos/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "logos/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "logos/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
          },
          {
            "src": "logos/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "logos/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
      
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,mp3,jpg,jpeg,GIF}"],
        maximumFileSizeToCacheInBytes: 7000000, // Set limit to 7 MB
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@data": path.resolve(__dirname, "./src/data"),
    },
  },
  build: {
    outDir: "build",
  },
  assetsInclude: ["**/*.GIF"],
});
