import type { Lang } from "@bero/locales";
import { defaultLang } from "@bero/locales";

export type { Lang } from "@bero/locales";

import de from "./translations/de.json";
import en from "./translations/en.json";
import pl from "./translations/pl.json";

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
 * Returns a translation function `t(key)` for the given language.
 * Falls back to the default language if a key is missing.
 */
export function getTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
