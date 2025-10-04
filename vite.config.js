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
          const coreLibs = [
            "react",
            "react-dom",
            "react-router-dom",
            "axios",
            "lodash",
          ];
          const matchCore = coreLibs.find((lib) =>
            id.includes(`node_modules/${lib}`)
          );
          if (matchCore) {
            return "vendor-core";
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
