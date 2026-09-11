import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["e2e/**", "node_modules/**"],
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
