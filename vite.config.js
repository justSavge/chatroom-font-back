import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
// const __dirname = dirname(fileURLToPath(import.meta.));
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 8848,
  },
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
