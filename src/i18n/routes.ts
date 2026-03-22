import type { Lang } from "./locale";

/**
 * Route translations: maps canonical route names to locale-specific URL slugs.
 */
export const routes: Record<Lang, Record<string, string>> = {
  pl: {
    portfolio: "portfolio",
    "privacy-policy": "polityka-prywatnosci",
  },
  en: {
    portfolio: "portfolio",
    "privacy-policy": "privacy-policy",
  },
  de: {
    portfolio: "portfolio",
    "privacy-policy": "datenschutzerklarung",
  },
};
