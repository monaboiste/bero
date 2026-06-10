// @ts-check

import cloudflare from "@astrojs/cloudflare";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import svgr from "vite-plugin-svgr";
// noinspection ES6PreferShortImport
import { defaultLang, locales } from "./src/i18n/locale";

// https://astro.build/config
export default defineConfig({
  site: "https://studio-bero.com",

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Montserrat",
      cssVariable: "--font-sans",
      subsets: ["latin", "latin-ext"],
      weights: [400, 500, 600, 700],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Comforter Brush",
      cssVariable: "--font-accent",
      fallbacks: ["cursive"],
    },
  ],

  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes("/404"),
      i18n: {
        defaultLocale: defaultLang,
        locales: Object.fromEntries(locales.map((lang) => [lang, lang])),
      },
    }),
  ],

  i18n: {
    defaultLocale: defaultLang,
    locales: [...locales],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss(), svgr()],
  },

  // FIXME: https://github.com/withastro/astro/issues/15878 and https://github.com/withastro/astro/issues/16029
  // added `overrides.vite` to package.json and `@astrojs/node` to devDependencies
  adapter: process.env.VITEST
    ? node({ mode: "standalone" })
    : cloudflare({
        imageService: { build: "compile", runtime: "cloudflare-binding" },
      }),
});
