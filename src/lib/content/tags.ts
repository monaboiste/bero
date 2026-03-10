export const PORTFOLIO_TAGS = {
  armchairs: { pl: "Fotele" },
  sofas: { pl: "Sofy" },
  chairs: { pl: "Krzesła" },
  restoration: { pl: "Renowacja" },
  automotive: { pl: "Motoryzacja" },
} as const;

export type PortfolioTagKey = keyof typeof PORTFOLIO_TAGS;

export const PORTFOLIO_TAG_KEYS = Object.keys(
  PORTFOLIO_TAGS
) as PortfolioTagKey[];

export function getTagLabel(key: PortfolioTagKey, _lang = "pl"): string {
  return PORTFOLIO_TAGS[key].pl;
}
