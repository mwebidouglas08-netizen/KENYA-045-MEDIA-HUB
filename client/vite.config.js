import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: ".",   // VERY IMPORTANT
  build: {
    outDir: "dist",   // ensures correct output
    emptyOutDir: true
  }
});
