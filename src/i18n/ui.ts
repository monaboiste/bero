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

export const ui = { pl, en, de } as const;
