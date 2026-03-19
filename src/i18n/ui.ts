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
