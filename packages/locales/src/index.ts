export const languages = [
  { id: "pl" as const, title: "Polski", isDefault: true },
  { id: "en" as const, title: "English" },
  { id: "de" as const, title: "Deutsch" },
] as const;

export type Lang = (typeof languages)[number]["id"];

export const defaultLang: Lang = "pl";

/** All supported locale codes. */
export const locales: Lang[] = languages.map((l) => l.id);

/** Display labels for each language, keyed by locale code. */
export const languageLabels = Object.fromEntries(
  languages.map((l) => [l.id, l.title])
) as Record<Lang, string>;

/**
 * Resolves `Astro.currentLocale` (or any string) to a valid `Lang`.
 * Falls back to `defaultLang` if the value is not a supported locale.
 */
export function getLang(currentLocale: string | undefined): Lang {
  if (currentLocale && languages.some((l) => l.id === currentLocale)) {
    return currentLocale as Lang;
  }
  return defaultLang;
}

/** Maps locale codes to OpenGraph `language_TERRITORY` format. */
export const ogLocales: Record<Lang, string> = {
  pl: "pl_PL",
  en: "en_US",
  de: "de_DE",
};

/** Returns the OG locale string for a given Lang. */
export function getOgLocale(lang: Lang): string {
  return ogLocales[lang];
}
