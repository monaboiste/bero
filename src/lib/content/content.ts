import { MOCK_PORTFOLIO } from "./fixture.ts";
import { sanityApi } from "./sanity";
import type { Portfolio } from "./types";

const LANG = "pl";
const useMock = !!import.meta.env.USE_MOCK_DATA;

function createFixtureApi() {
  return {
    count: async (): Promise<number> => MOCK_PORTFOLIO.length,

    fetchPortfolioPage: async (page: {
      start: number;
      end: number;
    }): Promise<Portfolio> => MOCK_PORTFOLIO.slice(page.start, page.end),

    fetchPortfolioLatestProjects: async (limit: number): Promise<Portfolio> =>
      MOCK_PORTFOLIO.slice(0, limit),
  };
}

function createSanityApi() {
  return {
    count: async (): Promise<number> => sanityApi.count(),

    fetchPortfolioPage: async (page: {
      start: number;
      end: number;
    }): Promise<Portfolio> => {
      return await sanityApi.fetchPortfolioPage(LANG, page);
    },

    fetchPortfolioLatestProjects: async (limit: number): Promise<Portfolio> => {
      return await sanityApi.fetchPortfolioLatestProjects(LANG, limit);
    },
  };
}

export const portfolioApi = useMock ? createFixtureApi() : createSanityApi();
