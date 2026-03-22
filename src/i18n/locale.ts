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

// Compile-time parity checks: fail if any language is missing or has extra keys.
const _enParity: Record<TranslationKey, string> = en;
const _deParity: Record<TranslationKey, string> = de;

export const ui: Record<Lang, Record<TranslationKey, string>> = {
  pl,
  en,
  de,
};

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
