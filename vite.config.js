import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
