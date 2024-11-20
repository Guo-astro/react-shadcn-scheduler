import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { peerDependencies } from "./package.json";
import path from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
      exclude: ["**/*.stories.ts", "**/*.test.ts"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: "./src/index.ts",
      name: "react-shadcn-sheduler",
      fileName: (format) => `react-shadcn-sheduler.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
      output: { globals: { react: "React", "react-dom": "ReactDOM" } },
    },
  },
});
