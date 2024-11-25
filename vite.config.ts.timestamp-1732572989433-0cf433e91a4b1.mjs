// vite.config.ts
import { defineConfig } from "file:///Users/guo/OSS/react-shadcn-scheduler/node_modules/.pnpm/vite@5.4.11_@types+node@22.9.1/node_modules/vite/dist/node/index.js";
import react from "file:///Users/guo/OSS/react-shadcn-scheduler/node_modules/.pnpm/@vitejs+plugin-react@4.3.3_vite@5.4.11_@types+node@22.9.1_/node_modules/@vitejs/plugin-react/dist/index.mjs";

// package.json
var peerDependencies = {
  react: "^18.3.1",
  "react-dom": "^18.3.1"
};

// vite.config.ts
import path from "path";
import dts from "file:///Users/guo/OSS/react-shadcn-scheduler/node_modules/.pnpm/vite-plugin-dts@4.3.0_@types+node@22.9.1_rollup@4.27.3_typescript@5.6.3_vite@5.4.11_@types+node@22.9.1_/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/guo/OSS/react-shadcn-scheduler";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
      exclude: ["**/*.stories.ts", "**/*.test.ts"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: "./src/index.ts",
      name: "react-shadcn-sheduler",
      fileName: (format) => `react-shadcn-sheduler.${format}.js`,
      formats: ["es", "cjs", "umd"]
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
      output: { globals: { react: "React", "react-dom": "ReactDOM" } }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2d1by9PU1MvcmVhY3Qtc2hhZGNuLXNjaGVkdWxlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2d1by9PU1MvcmVhY3Qtc2hhZGNuLXNjaGVkdWxlci92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZ3VvL09TUy9yZWFjdC1zaGFkY24tc2NoZWR1bGVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IHBlZXJEZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcblxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBkdHMoe1xuICAgICAgcm9sbHVwVHlwZXM6IHRydWUsXG4gICAgICB0c2NvbmZpZ1BhdGg6IFwiLi90c2NvbmZpZy5hcHAuanNvblwiLFxuICAgICAgZXhjbHVkZTogW1wiKiovKi5zdG9yaWVzLnRzXCIsIFwiKiovKi50ZXN0LnRzXCJdLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IFwiLi9zcmMvaW5kZXgudHNcIixcbiAgICAgIG5hbWU6IFwicmVhY3Qtc2hhZGNuLXNoZWR1bGVyXCIsXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYHJlYWN0LXNoYWRjbi1zaGVkdWxlci4ke2Zvcm1hdH0uanNgLFxuICAgICAgZm9ybWF0czogW1wiZXNcIiwgXCJjanNcIiwgXCJ1bWRcIl0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogT2JqZWN0LmtleXMocGVlckRlcGVuZGVuY2llcyksXG4gICAgICBvdXRwdXQ6IHsgZ2xvYmFsczogeyByZWFjdDogXCJSZWFjdFwiLCBcInJlYWN0LWRvbVwiOiBcIlJlYWN0RE9NXCIgfSB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJ7XG4gIFwibmFtZVwiOiBcInJlYWN0LXNoYWRjbi1zY2hlZHVsZXJcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjJcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidHlwZXNcIjogXCJkaXN0L2luZGV4LmQudHNcIixcbiAgXCJleHBvcnRzXCI6IHtcbiAgICBcIi5cIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvaW5kZXguanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9pbmRleC51bWQuanNcIlxuICAgIH0sXG4gICAgXCIuL3N0eWxlcy5jc3NcIjoge1xuICAgICAgXCJyZXF1aXJlXCI6IFwiLi9kaXN0L3N0eWxlcy5jc3NcIixcbiAgICAgIFwiZGVmYXVsdFwiOiBcIi4vZGlzdC9zdHlsZXMuY3NzXCJcbiAgICB9XG4gIH0sXG4gIFwiZmlsZXNcIjogW1xuICAgIFwiZGlzdFwiXG4gIF0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInRzYyAmJiB2aXRlIGJ1aWxkICYmIHBucG0gcnVuIGJ1aWxkOmNzc1wiLFxuICAgIFwiYnVpbGQ6Y3NzXCI6IFwidGFpbHdpbmRjc3MgLW0gLWkgLi9zcmMvdGFpbHdpbmQtZW50cnkuY3NzIC1vIC4vZGlzdC9zdHlsZXMuY3NzXCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC4gLS1leHQgdHMsdHN4IC0tcmVwb3J0LXVudXNlZC1kaXNhYmxlLWRpcmVjdGl2ZXMgLS1tYXgtd2FybmluZ3MgMFwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwic3Rvcnlib29rXCI6IFwiY29uY3VycmVudGx5IFxcXCJwbnBtIHJ1biBzdG9yeWJvb2s6Y3NzXFxcIiBcXFwic3Rvcnlib29rIGRldlxcXCJcIixcbiAgICBcInN0b3J5Ym9vazpjc3NcIjogXCJ0YWlsd2luZGNzcyAtdyAtaSAuL3NyYy90YWlsd2luZC1lbnRyeS5jc3MgLW8gLi9zcmMvaW5kZXguY3NzXCIsXG4gICAgXCJidWlsZC1zdG9yeWJvb2tcIjogXCJjb25jdXJyZW50bHkgXFxcInBucG0gcnVuIGJ1aWxkLXN0b3J5Ym9vazpjc3NcXFwiIFxcXCJzdG9yeWJvb2sgYnVpbGRcXFwiXCIsXG4gICAgXCJidWlsZC1zdG9yeWJvb2s6Y3NzXCI6IFwidGFpbHdpbmRjc3MgLW0gLWkgLi9zcmMvdGFpbHdpbmQtZW50cnkuY3NzIC1vIC4vc3JjL2luZGV4LmNzc1wiLFxuICAgIFwicHJlcHVibGlzaE9ubHlcIjogXCJwbnBtIHJ1biBidWlsZFwiLFxuICAgIFwidGVzdC1jdFwiOiBcInBsYXl3cmlnaHQgdGVzdCAtYyBwbGF5d3JpZ2h0LWN0LmNvbmZpZy50c1wiXG4gIH0sXG4gIFwicGVlckRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJyZWFjdFwiOiBcIl4xOC4zLjFcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4zLjFcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAY2hyb21hdGljLWNvbS9zdG9yeWJvb2tcIjogXCJeMy4yLjJcIixcbiAgICBcIkBlc2xpbnQvanNcIjogXCJeOS4xMy4wXCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWVzc2VudGlhbHNcIjogXCJeOC40LjRcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24taW50ZXJhY3Rpb25zXCI6IFwiXjguNC40XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWxpbmtzXCI6IFwiXjguNC40XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLW9uYm9hcmRpbmdcIjogXCJeOC40LjRcIixcbiAgICBcIkBzdG9yeWJvb2svYmxvY2tzXCI6IFwiXjguNC40XCIsXG4gICAgXCJAc3Rvcnlib29rL21hbmFnZXItYXBpXCI6IFwiXjguNC40XCIsXG4gICAgXCJAc3Rvcnlib29rL3JlYWN0XCI6IFwiXjguNC40XCIsXG4gICAgXCJAc3Rvcnlib29rL3JlYWN0LXZpdGVcIjogXCJeOC40LjRcIixcbiAgICBcIkBzdG9yeWJvb2svdGVzdFwiOiBcIl44LjQuNFwiLFxuICAgIFwiQHN0b3J5Ym9vay90aGVtaW5nXCI6IFwiXjguNC40XCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMi45LjFcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4zLjEyXCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjMuMVwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4zLjNcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjIwXCIsXG4gICAgXCJjb25jdXJyZW50bHlcIjogXCJeOS4xLjBcIixcbiAgICBcImVzbGludFwiOiBcIl45LjEzLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjogXCJeNS4wLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtcmVmcmVzaFwiOiBcIl4wLjQuMTRcIixcbiAgICBcImVzbGludC1wbHVnaW4tc3Rvcnlib29rXCI6IFwiXjAuMTEuMVwiLFxuICAgIFwiZ2xvYmFsc1wiOiBcIl4xNS4xMS4wXCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC40OVwiLFxuICAgIFwic3Rvcnlib29rXCI6IFwiXjguNC40XCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjQuMTVcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJ+NS42LjJcIixcbiAgICBcInR5cGVzY3JpcHQtZXNsaW50XCI6IFwiXjguMTEuMFwiLFxuICAgIFwidml0ZVwiOiBcIl41LjQuMTBcIixcbiAgICBcInZpdGUtcGx1Z2luLWR0c1wiOiBcIl40LjMuMFwiXG4gIH0sXG4gIFwicGFja2FnZU1hbmFnZXJcIjogXCJwbnBtQDkuMTIuMitzaGEyNTYuMmVmNmU1NDdiMGIwN2Q4NDFkNjA1MjQwZGNlNGQ2MzU2Nzc4MzExNDhjZDMwZjZkNTY0YjhmNGY5MjhmNzNkMlwiLFxuICBcImVzbGludENvbmZpZ1wiOiB7XG4gICAgXCJleHRlbmRzXCI6IFtcbiAgICAgIFwicGx1Z2luOnN0b3J5Ym9vay9yZWNvbW1lbmRlZFwiXG4gICAgXVxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAaG9va2Zvcm0vcmVzb2x2ZXJzXCI6IFwiXjMuOS4xXCIsXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtZGlhbG9nXCI6IFwiXjEuMS4yXCIsXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtcG9wb3ZlclwiOiBcIl4xLjEuMlwiLFxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LXNlbGVjdFwiOiBcIl4yLjEuMlwiLFxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LXNsb3RcIjogXCJeMS4xLjBcIixcbiAgICBcIkByYWRpeC11aS9yZWFjdC10YWJzXCI6IFwiXjEuMS4xXCIsXG4gICAgXCJjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlcIjogXCJeMC43LjBcIixcbiAgICBcImNsc3hcIjogXCJeMi4xLjFcIixcbiAgICBcImRhdGUtZm5zXCI6IFwiXjQuMS4wXCIsXG4gICAgXCJmcmFtZXItbW90aW9uXCI6IFwiXjExLjExLjE3XCIsXG4gICAgXCJsdWNpZGUtcmVhY3RcIjogXCJeMC40NjAuMFwiLFxuICAgIFwibmFub2lkXCI6IFwiXjUuMC44XCIsXG4gICAgXCJyZWFjdC1kYXktcGlja2VyXCI6IFwiOC4xMC4xXCIsXG4gICAgXCJyZWFjdC1ob29rLWZvcm1cIjogXCJeNy41My4yXCIsXG4gICAgXCJyZWFjdC1pY29uc1wiOiBcIl41LjMuMFwiLFxuICAgIFwidGFpbHdpbmQtbWVyZ2VcIjogXCJeMi41LjRcIixcbiAgICBcInRhaWx3aW5kY3NzLWFuaW1hdGVcIjogXCJeMS4wLjdcIixcbiAgICBcInpvZFwiOiBcIl4zLjIzLjhcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlTLFNBQVMsb0JBQW9CO0FBQzlULE9BQU8sV0FBVzs7O0FDOEJoQix1QkFBb0I7QUFBQSxFQUNsQixPQUFTO0FBQUEsRUFDVCxhQUFhO0FBQ2Y7OztBRC9CRixPQUFPLFVBQVU7QUFDakIsT0FBTyxTQUFTO0FBSmhCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLFNBQVMsQ0FBQyxtQkFBbUIsY0FBYztBQUFBLElBQzdDLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsSUFDYixLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsV0FBVyx5QkFBeUIsTUFBTTtBQUFBLE1BQ3JELFNBQVMsQ0FBQyxNQUFNLE9BQU8sS0FBSztBQUFBLElBQzlCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLE9BQU8sS0FBSyxnQkFBZ0I7QUFBQSxNQUN0QyxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sU0FBUyxhQUFhLFdBQVcsRUFBRTtBQUFBLElBQ2pFO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
