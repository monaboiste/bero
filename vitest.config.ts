/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
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
