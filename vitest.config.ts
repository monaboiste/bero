/// <reference types="vitest/config" />

import { getViteConfig } from "astro/config";
// noinspection ES6PreferShortImport
import { svgMockPlugin } from "./src/test/plugins/svg-mock/svg-mock.ts";

export default getViteConfig({
  plugins: [svgMockPlugin()],
  test: {
    environment: "happy-dom",
    globals: true,
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
