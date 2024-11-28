import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

import react from "@vitejs/plugin-react-swc";

import path, { resolve } from "path";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "./src/index.ts"),
        checker: resolve(__dirname, "./src/features/checker/index.ts"),
        hooks: resolve(__dirname, "./src/hooks/index.ts"),
        icons: resolve(__dirname, "./src/assets/icons/index.ts"),
        lib: resolve(__dirname, "./src/lib/index.ts"),
        mocks: resolve(__dirname, "./src/mocks/handlers.ts"),
      },
      name: "gitcoin-ui",
      fileName: (format, filename) => `${filename}.js`,
      formats: ["es"],
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
        preserveModulesRoot: "src",
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    minify: false,
    target: "esnext",
  },
  plugins: [react(), svgr(), dts({ rollupTypes: true }), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~checker": path.resolve(__dirname, "./src/features/checker"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
