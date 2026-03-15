import { sanityApi } from "./sanity";
import type { Portfolio } from "./types";

const LANG = "pl";

export const portfolioApi = {
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
