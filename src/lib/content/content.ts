import type { Lang } from "@i18n/locale";
import { getMockPortfolio } from "./fixture.ts";
import { sanityApi } from "./sanity";
import type { Portfolio } from "./types";

const useMock = !!import.meta.env.USE_MOCK_DATA;

export interface PortfolioApi {
  count(): Promise<number>;

  fetchPortfolioLatestProjects(limit: number): Promise<Portfolio>;

  fetchPortfolioPage(page: { start: number; end: number }): Promise<Portfolio>;
}

export function createPortfolioApi(lang: Lang): PortfolioApi {
  return useMock ? createFixtureApi(lang) : createSanityApi(lang);
}

function createFixtureApi(lang: Lang): PortfolioApi {
  return {
    count: async (): Promise<number> => getMockPortfolio(lang).length,

    fetchPortfolioPage: async (page: {
      start: number;
      end: number;
    }): Promise<Portfolio> =>
      getMockPortfolio(lang).slice(page.start, page.end),

    fetchPortfolioLatestProjects: async (limit: number): Promise<Portfolio> =>
      getMockPortfolio(lang).slice(0, limit),
  };
}

function createSanityApi(lang: Lang): PortfolioApi {
  return {
    count: async (): Promise<number> => sanityApi.count(),

    fetchPortfolioPage: async (page: {
      start: number;
      end: number;
    }): Promise<Portfolio> => await sanityApi.fetchPortfolioPage(lang, page),

    fetchPortfolioLatestProjects: async (limit: number): Promise<Portfolio> =>
      await sanityApi.fetchPortfolioLatestProjects(lang, limit),
  };
}
