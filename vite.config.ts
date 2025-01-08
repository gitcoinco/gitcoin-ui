import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

import react from "@vitejs/plugin-react-swc";

import path, { resolve } from "path";
import tailwindcss from "tailwindcss";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "./src/index.ts"),
        clientComponents: resolve(__dirname, "./src/clientComponents.ts"),
        hooks: resolve(__dirname, "./src/hooks/index.ts"),
        icons: resolve(__dirname, "./src/assets/icons/index.ts"),
        lib: resolve(__dirname, "./src/lib/index.ts"),
        mocks: resolve(__dirname, "./src/mocks/handlers.ts"),
        types: resolve(__dirname, "./src/types/index.ts"),

        // features
        application: resolve(__dirname, "./src/features/application/index.ts"),
        checker: resolve(__dirname, "./src/features/checker/index.ts"),
        pool: resolve(__dirname, "./src/features/pool/index.ts"),
        poolClientComponents: resolve(__dirname, "./src/features/pool/clientComponents.ts"),
        program: resolve(__dirname, "./src/features/program/index.ts"),
        project: resolve(__dirname, "./src/features/project/index.ts"),
        projectClientComponents: resolve(__dirname, "./src/features/project/clientComponents.ts"),
        retrofunding: resolve(__dirname, "./src/features/retrofunding/index.ts"),
      },
      name: "gitcoin-ui",
      fileName: (format: any, filename: any) => `${filename}.js`,
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
  plugins: [react(), svgr(), dts({ rollupTypes: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~checker": path.resolve(__dirname, "./src/features/checker"),
      "~retrofunding": path.resolve(__dirname, "./src/features/retrofunding"),
      "~pool": path.resolve(__dirname, "./src/features/pool"),
      "~application": path.resolve(__dirname, "./src/features/application"),
      "~program": path.resolve(__dirname, "./src/features/program"),
      "~project": path.resolve(__dirname, "./src/features/project"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
