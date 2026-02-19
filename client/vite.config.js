import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // 👈 ensures correct asset paths when deployed
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // optional but handy for imports
    },
    // Ensure case-sensitive imports for Linux deployment
    caseSensitive: true,
  },
});
