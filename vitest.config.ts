/// <reference types="vitest/config" />

import {getViteConfig} from "astro/config";

export default getViteConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts"],
    exclude: ["src/**/*.test.tsx", "e2e/**"],
  },
});
