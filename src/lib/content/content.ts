import { sanityApi } from "./sanity";
import type { Portfolio } from "./types";

const LANG = "pl";

export const portfolioApi = {
  fetchPortfolio: async (limit?: number): Promise<Portfolio> => {
    return await sanityApi.fetchPortfolio(LANG, limit);
  },
};
