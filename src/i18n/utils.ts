import { defaultLang, type Lang, locales, type TranslationKey, ui } from "./ui";

/** Regex that matches a leading locale prefix (e.g. /pl, /en, /de). */
const localePrefixRe = new RegExp(`^/(${locales.join("|")})`);

/**
 * Get the language from Astro.currentLocale.
 * Falls back to defaultLang if the value is not a supported locale.
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

/**
 * Returns a function that prefixes paths with the locale.
 * All locales are prefixed (prefixDefaultLocale: true).
 */
export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: Lang = lang): string {
    return `/${l}${path}`;
  };
}

/**
 * Strips the leading locale prefix from a pathname.
 * e.g. "/pl/portfolio" → "/portfolio", "/en/" → "/"
 */
export function stripLocalePrefix(pathname: string): string {
  return pathname.replace(localePrefixRe, "") || "/";
}
