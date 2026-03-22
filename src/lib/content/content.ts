import type { Lang } from "@i18n/ui.ts";
import { getMockPortfolio } from "./fixture.ts";
import { sanityApi } from "./sanity";
import type { Portfolio } from "./types";

const useMock = !!import.meta.env.USE_MOCK_DATA;

export interface PortfolioApi {
  count(): Promise<number>;

  fetchPortfolioPage(page: { start: number; end: number }): Promise<Portfolio>;

  fetchPortfolioLatestProjects(limit: number): Promise<Portfolio>;
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
    }): Promise<Portfolio> => {
      return await sanityApi.fetchPortfolioPage(lang, page);
    },

    fetchPortfolioLatestProjects: async (limit: number): Promise<Portfolio> => {
      return await sanityApi.fetchPortfolioLatestProjects(lang, limit);
    },
  };
}
