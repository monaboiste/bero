import de from "./translations/de.json";
import en from "./translations/en.json";
import pl from "./translations/pl.json";

export const languages = {
  pl: "Polski",
  en: "English",
  de: "Deutsch",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "pl";

/** All supported locale codes, derived from the languages map. */
export const locales = Object.keys(languages) as Lang[];

/**
 * The canonical set of translation keys, derived from the default language.
 * Every other language file must provide exactly the same keys.
 */
export type TranslationKey = keyof typeof pl;

/**
 * All UI translations indexed by locale.
 * The `satisfies` clause enforces compile-time parity: every language must
 * provide exactly the same set of keys as the default language (no missing,
 * no extra keys allowed).
 */
export const ui = { pl, en, de } satisfies Record<
  Lang,
  Record<TranslationKey, string>
>;

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
export function getTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Maps short locale codes to OpenGraph `language_TERRITORY` format. */
export const ogLocales: Record<Lang, string> = {
  pl: "pl_PL",
  en: "en_US",
  de: "de_DE",
};

/** Returns the OG locale string for a given Lang. */
export function getOgLocale(lang: Lang): string {
  return ogLocales[lang];
}
