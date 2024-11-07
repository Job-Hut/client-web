import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        id: "jobhut-app",
        name: "Job Hut",
        short_name: "Job Hut",
        description: "Make job hunting process easier",
        theme_color: "#f3f3f3",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/login",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
