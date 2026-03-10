import { fetchPortfolio as sanityFetchPortfolio } from "./sanity";
import type { Portfolio } from "./types";

const LANG = "pl";

export async function fetchPortfolio(limit?: number): Promise<Portfolio> {
  return await sanityFetchPortfolio(LANG, limit);
}
