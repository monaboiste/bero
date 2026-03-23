// @ts-check

import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { defaultLang, locales } from "./src/i18n/locale";

// https://astro.build/config
export default defineConfig({
  site: "https://studio-bero.com",
  i18n: {
    defaultLocale: defaultLang,
    locales: [...locales],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
