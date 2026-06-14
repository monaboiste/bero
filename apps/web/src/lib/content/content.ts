import { createFixturePortfolioService } from "@bero/fixture";
import type { Lang } from "@bero/locales";
import type { PortfolioService } from "@bero/portfolio";
import { createSanityPortfolioService } from "@bero/sanity";

export type { Portfolio, PortfolioService } from "@bero/portfolio";

export function createPortfolioService(lang: Lang): PortfolioService {
  if (import.meta.env.USE_MOCK_DATA) {
    return createFixturePortfolioService(lang);
  }

  return createSanityPortfolioService({
    projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
    dataset: import.meta.env.SANITY_STUDIO_DATASET,
    lang,
  });
}
