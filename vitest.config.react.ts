/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    name: "react",
    environment: "happy-dom",
    globals: true,
    include: ["src/**/*.test.tsx"],
    setupFiles: ["./src/test/setup-react.ts"],
    environmentOptions: {
      happyDOM: {
        settings: {
          disableCSSFileLoading: true,
          handleDisabledFileLoadingAsSuccess: true,
        },
      },
    },
  },
});
