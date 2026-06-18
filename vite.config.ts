import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Portfolio-website/", // Updated to match exact repository name
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
