export const languages = [
  { id: "pl", title: "Polski", isDefault: true },
  { id: "en", title: "English" },
  { id: "de", title: "Deutsch" },
] as const;

export type LanguageId = (typeof languages)[number]["id"];

export const baseLanguage: LanguageId = "pl";
