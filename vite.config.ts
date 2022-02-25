import vue from "@vitejs/plugin-vue";
import { join } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/todo-list/',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
});
