import { defaultLang, type Lang } from "@i18n/ui";

export const PORTFOLIO_TAGS = {
  armchairs: { pl: "Fotele", en: "Armchairs", de: "Sessel" },
  sofas: { pl: "Sofy", en: "Sofas", de: "Sofas" },
  chairs: { pl: "Krzesła", en: "Chairs", de: "Stühle" },
  restoration: { pl: "Renowacja", en: "Restoration", de: "Restaurierung" },
  automotive: { pl: "Motoryzacja", en: "Automotive", de: "Automobil" },
} as const;

export type PortfolioTagKey = keyof typeof PORTFOLIO_TAGS;

export const PORTFOLIO_TAG_KEYS = Object.keys(
  PORTFOLIO_TAGS
) as PortfolioTagKey[];

export function getTagLabel(
  key: PortfolioTagKey,
  lang: Lang = defaultLang
): string {
  return PORTFOLIO_TAGS[key][lang] ?? PORTFOLIO_TAGS[key].pl;
}
