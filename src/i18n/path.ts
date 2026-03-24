import { getLang, type Lang, locales } from "./locale";
import { routes } from "./routes";

/**
 * Returns a function that prefixes paths with the locale and translates
 * known route segments to their locale-specific slugs.
 */
export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: Lang = lang): string {
    const pathName = stripSlashes(path);
    const translated = getTranslatedSlug(pathName, l);
    const translatedPath = translated !== undefined ? `/${translated}` : path;
    return `/${l}${translatedPath}`;
  };
}

/**
 * Reverse-maps a translated URL slug back to its canonical route name.
 * Returns `undefined` if the path does not match any known route.
 */
export function getRoute(url: URL): string | undefined {
  const slug = extractLastSegment(url.pathname);
  if (!slug) {
    return undefined;
  }

  const currentLang = getLang(extractLocaleFromPathname(url.pathname));
  return findCanonicalKey(slug, currentLang);
}

/**
 * Resolves the canonical base path from a URL, accounting for translated routes.
 * Falls back to stripping the locale prefix for pages not in the routes map.
 */
export function getCanonicalBasePath(url: URL): string {
  const canonicalRoute = getRoute(url);
  if (canonicalRoute) {
    return `/${canonicalRoute}`;
  }
  return stripLocalePrefix(url.pathname);
}

/**
 * Returns the site URL without a trailing slash.
 *
 * Requires `site` to be configured in `astro.config` or `SITE` environment variable to be set.
 * Throws if `Astro.site` is undefined.
 */
export function getSiteUrl(site: URL | undefined): string {
  const siteUrl = site?.href ?? import.meta.env.SITE;
  if (!siteUrl) {
    throw new Error(
      "Astro.site is not configured. Set `site` in astro.config."
    );
  }
  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

/**
 * Returns the full canonical URL for the current page by resolving
 * the request pathname against the configured site origin.
 */
export function getCanonicalUrl(
  site: URL | undefined,
  requestUrl: URL
): string {
  return new URL(requestUrl.pathname, getSiteUrl(site)).href;
}

/**
 * Returns hreflang alternate URLs for all configured locales.
 * Uses translated paths for known routes, locale-prefixed paths otherwise.
 */
export function getAlternateUrls(
  url: URL
): Array<{ locale: Lang; href: string }> {
  const basePath = getCanonicalBasePath(url);

  return locales.map((locale) => {
    const tp = useTranslatedPath(locale);
    return { locale, href: tp(basePath, locale) };
  });
}

export function stripLocalePrefix(pathname: string): string {
  return pathname.replace(localePrefixRe, "") || "/";
}

const localePrefixRe = new RegExp(`^/(${locales.join("|")})(?=/|$)`);
const leadingSlashRe = /^\//;
const trailingSlashRe = /\/$/;

function stripSlashes(path: string): string {
  return path.replace(leadingSlashRe, "").replace(trailingSlashRe, "");
}

function getTranslatedSlug(routeKey: string, lang: Lang): string | undefined {
  return routes[lang]?.[routeKey];
}

function findCanonicalKey(slug: string, lang: Lang): string | undefined {
  const langRoutes = routes[lang];
  if (!langRoutes) {
    return undefined;
  }
  return Object.keys(langRoutes).find((key) => langRoutes[key] === slug);
}

function extractLocaleFromPathname(pathname: string): string | undefined {
  return pathname.split("/")[1];
}

function extractLastSegment(pathname: string): string | undefined {
  const trimmed = pathname.replace(trailingSlashRe, "");
  const parts = trimmed.split("/");
  return parts.pop() || parts.pop();
}
