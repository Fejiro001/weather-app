import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png", "mask_icon.svg"],
      manifest: {
        name: "Weather Now",
        short_name: "WeatherNow",
        description: "A sleek weather application",
        theme_color: "#03012d",
        background_color: "#03012d",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        categories: ["weather", "lifestyle", "utilities"],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "weather-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/nominatim\.openstreetmap\.org\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "geocoding-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core UI/Routing Libraries (Already done)
          if (id.includes("node_modules/react")) {
            return "vendor-react";
          }

          if (id.includes("node_modules/react-dom")) {
            return "vendor-reactdom";
          }

          if (id.includes("node_modules/react-router-dom")) {
            return "vendor-routing";
          }

          if (id.includes("node_modules/lodash")) {
            return "vendor-lodash";
          }

          if (id.includes("node_modules/axios")) {
            return "vendor-axios";
          }

          // Animation, Icons & State Management Libraries
          const heavyLibs = ["@tabler/icons-react", "motion", "zustand"];
          const matchHeavy = heavyLibs.find((lib) =>
            id.includes(`node_modules/${lib}`)
          );
          if (matchHeavy) {
            return "vendor-ui";
          }

          // Isolate sound library
          if (
            id.includes("node_modules/use-sound") ||
            id.includes("node_modules/howler")
          ) {
            return "vendor-audio";
          }

          const remainingLibs = ["@tippyjs/react", "sonner"];
          if (remainingLibs.some((lib) => id.includes(`node_modules/${lib}`))) {
            return "vendor-misc";
          }

          return undefined;
        },
      },
    },
  },
});
