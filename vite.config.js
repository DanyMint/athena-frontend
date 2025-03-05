import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const __dirname = env.VITE_BUILD_OUTPUT_PATH; 

  return {
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    cors: true,
    host: true,
  },
  build: {
    outDir: __dirname,
    emptyOutDir: true
  },
};
});