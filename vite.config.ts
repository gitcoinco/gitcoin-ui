import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path, { resolve } from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "gitcoin-ui",
      fileName: (format, filename) => {
        const extension = format === "es" ? "mjs" : format;
        return `${filename}.${extension}`;
      },
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
        preserveModules: true,
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    minify: false,
  },
  plugins: [react(), svgr(), dts({ rollupTypes: true }), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
