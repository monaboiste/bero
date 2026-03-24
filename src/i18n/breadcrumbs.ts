import { getLang, useTranslations } from "./locale";
import { getRoute, getSiteUrl, useTranslatedPath } from "./path";
import { routes } from "./routes";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Automatically builds the breadcrumb list for the current page.
 *
 * Returns `undefined` for the homepage (or any page not in the routes map),
 * which signals JsonLd to emit the homepage-specific schemas instead of a
 * BreadcrumbList.
 *
 * For sub-pages the breadcrumb label is looked up from the `breadcrumb`
 * translation key defined in `routes.ts` — so adding a new page only
 * requires a single entry there.
 */
export function buildBreadcrumbs(
  site: URL | undefined,
  requestUrl: URL,
  currentLocale: string | undefined
): BreadcrumbItem[] | undefined {
  const routeKey = getRoute(requestUrl);
  if (!routeKey) {
    return undefined;
  }

  const lang = getLang(currentLocale);
  const t = useTranslations(lang);
  const tp = useTranslatedPath(lang);
  const siteUrl = getSiteUrl(site);

  const entry = routes[lang][routeKey];
  if (!entry) {
    return undefined;
  }

  return [
    { name: t("nav.home"), url: `${siteUrl}/${lang}/` },
    { name: t(entry.breadcrumb), url: `${siteUrl}${tp(`/${routeKey}`)}` },
  ];
}
