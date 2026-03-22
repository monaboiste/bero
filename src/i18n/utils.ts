import { IntlMessageFormat } from "intl-messageformat";

import {
  defaultLang,
  type Lang,
  locales,
  routes,
  type TranslationKey,
  ui,
} from "./ui";

const localePrefixRe = new RegExp(`^/(${locales.join("|")})(?=/|$)`);
const leadingSlashRe = /^\//;
const trailingSlashRe = /\/$/;

/**
 * Resolves `Astro.currentLocale` to a valid `Lang`.
 * Falls back to `defaultLang` if the value is not a supported locale.
 */
export function getLang(currentLocale: string | undefined): Lang {
  if (currentLocale && currentLocale in ui) {
    return currentLocale as Lang;
  }
  return defaultLang;
}

/**
 * Returns a translation function `t(key)` for the given language.
 * Falls back to the default language if a key is missing.
 */
export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

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
export function getRouteFromUrl(url: URL): string | undefined {
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
  const canonicalRoute = getRouteFromUrl(url);
  if (canonicalRoute) {
    return `/${canonicalRoute}`;
  }
  return stripLocalePrefix(url.pathname);
}

/**
 * Strips the leading locale prefix from a pathname.
 */
export function stripLocalePrefix(pathname: string): string {
  return pathname.replace(localePrefixRe, "") || "/";
}

/**
 * A single segment of rich text produced by {@link useRichText}.
 * Plain text has only `text`; tagged text also carries the `tag` name
 * so the caller can apply styling per tag.
 */
export interface RichTextPart {
  text: string;
  tag?: string;
}

/**
 * Returns a function that formats a translation string containing
 * ICU-style XML tags (e.g. `<accent>.</accent>`) into an array of
 * {@link RichTextPart} objects.
 *
 * @example
 * ```ts
 * const richText = useRichText("pl");
 * const parts = richText("hero.title", ["accent"]);
 * // [{ text: "Tapicerstwo w nowoczesnym wydaniu" }, { text: ".", tag: "accent" }]
 * ```
 */
export function useRichText(lang: Lang) {
  return function richText(
    key: TranslationKey,
    tags: string[] = []
  ): RichTextPart[] {
    const raw = ui[lang][key] || ui[defaultLang][key];
    const ignoreTags = tags.length === 0;
    const msg = new IntlMessageFormat(raw, lang, undefined, {
      ignoreTag: ignoreTags,
    });

    const tagValues: Record<
      string,
      (chunks: (string | RichTextPart)[]) => RichTextPart
    > = {};
    for (const tag of tags) {
      tagValues[tag] = (chunks) => ({
        text: chunks.map((c) => (typeof c === "string" ? c : c.text)).join(""),
        tag,
      });
    }

    const result = msg.format(tagValues);

    if (typeof result === "string") {
      return [{ text: result }];
    }

    return (result as (string | RichTextPart)[]).map((part) =>
      typeof part === "string" ? { text: part } : part
    );
  };
}
