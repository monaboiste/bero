import type { Lang, TranslationKey } from "./locale";

export interface RouteEntry {
  /** Locale-specific URL slug. */
  slug: string;
  /** Translation key used as the breadcrumb label for this route. */
  breadcrumb: TranslationKey;
}

/**
 * Route translations: maps canonical route names to locale-specific URL slugs
 * and their breadcrumb labels.
 *
 * This is the single source of truth for sub-page routing and SEO breadcrumbs.
 * When adding a new page, add an entry here — breadcrumbs are generated
 * automatically by the layout.
 */
export const routes: Record<Lang, Record<string, RouteEntry>> = {
  pl: {
    portfolio: { slug: "portfolio", breadcrumb: "nav.gallery" },
    "privacy-policy": {
      slug: "polityka-prywatnosci",
      breadcrumb: "privacy.title",
    },
  },
  en: {
    portfolio: { slug: "portfolio", breadcrumb: "nav.gallery" },
    "privacy-policy": {
      slug: "privacy-policy",
      breadcrumb: "privacy.title",
    },
  },
  de: {
    portfolio: { slug: "portfolio", breadcrumb: "nav.gallery" },
    "privacy-policy": {
      slug: "datenschutzerklarung",
      breadcrumb: "privacy.title",
    },
  },
};
