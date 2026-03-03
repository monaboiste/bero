import { getCollection } from "astro:content";

export async function getPortfolioEntries() {
  const entries = await getCollection("portfolio");
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getLatestPortfolioEntries(count: number) {
  const entries = await getPortfolioEntries();
  return entries.slice(0, count);
}
