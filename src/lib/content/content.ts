import { sanityClient, urlFor } from "./sanity";
import type { PortfolioEntry, RawSanityPortfolio } from "./types";

const LANG = "pl";

const PORTFOLIO_FIELDS = `
  "title": title[_key == "${LANG}"][0].value,
  "slug": slug.${LANG}.current,
  date,
  highlight,
  featuredImage,
  "description": description[_key == "${LANG}"][0].value,
  tags
`;

export async function getPortfolioEntries(): Promise<PortfolioEntry[]> {
  const entries = await sanityClient.fetch<RawSanityPortfolio[]>(
    `*[_type == "portfolio"] | order(date desc) { ${PORTFOLIO_FIELDS} }`
  );
  return entries.map(mapSanityEntry);
}

export async function getLatestPortfolioEntries(
  count: number
): Promise<PortfolioEntry[]> {
  const entries = await sanityClient.fetch<RawSanityPortfolio[]>(
    `*[_type == "portfolio"] | order(date desc) [0...${count}] { ${PORTFOLIO_FIELDS} }`
  );
  return entries.map(mapSanityEntry);
}

function mapSanityEntry(entry: RawSanityPortfolio): PortfolioEntry {
  return {
    title: entry.title ?? "",
    slug: entry.slug ?? "",
    date: entry.date ?? "",
    highlight: entry.highlight ?? false,
    featuredImageUrl: entry.featuredImage
      ? urlFor(entry.featuredImage).width(800).format("webp").quality(80).url()
      : "",
    featuredImageFullUrl: entry.featuredImage
      ? urlFor(entry.featuredImage).url()
      : "",
    description: entry.description ?? "",
    tags: entry.tags ?? [],
  };
}
