import { getCollection } from "astro:content";

export async function getPortfolioEntries() {
  const entries = await getCollection("portfolio");
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getLatestPortfolioEntries(count: number) {
  const entries = await getPortfolioEntries();
  return entries.slice(0, count);
}

export async function getAllPortfolioTags() {
  // TODO: do it better
  const entries = await getCollection("portfolio");
  const tagSet = new Set<string>();
  for (const entry of entries) {
    for (const tag of entry.data.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}
