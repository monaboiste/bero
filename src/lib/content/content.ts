import { MOCK_PORTFOLIO } from "./fixture.ts";
import { sanityApi } from "./sanity";
import type { Portfolio } from "./types";

const LANG = "pl";
const useMock = !!import.meta.env.USE_MOCK_DATA;

export interface PortfolioApi {
  count(): Promise<number>;

  fetchPortfolioPage(page: {
    start: number;
    end: number;
  }): Promise<Portfolio>;

  fetchPortfolioLatestProjects(limit: number): Promise<Portfolio>;
}

export const portfolioApi = useMock ? createFixtureApi() : createSanityApi();

function createFixtureApi(): PortfolioApi {
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

function createSanityApi() : PortfolioApi {
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

