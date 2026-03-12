import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Portfolio, PortfolioEntry } from "./types";

const sanityClient = createClient({
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  apiVersion: "2026-03-10",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export const sanityApi = {
  count: async (): Promise<number> => {
    const query = /* groq */ `count(*[_type == "portfolio"])`;
    return await sanityClient.fetch<number>(query);
  },

  fetchPortfolioPage: async (
    lang: string,
    page: { start: number; end: number }
  ): Promise<Portfolio> => {
    const query = /* groq */ `
    *[_type == "portfolio"]
    | order(date desc)
    [$start...$end]
    {
      "title": coalesce(title[_key == $lang][0].value, title[_key == "pl"][0].value),
      "slug": slug[$lang].current,
      "date": date,
      "featuredImage": {
        "assetRef": featuredImage.asset._ref,
        "aspectRatio": select(
          (1 - coalesce(featuredImage.crop.top,0) - coalesce(featuredImage.crop.bottom,0)) <= 0 => 1,
          round(
            (featuredImage.asset->metadata.dimensions.width *
             (1 - coalesce(featuredImage.crop.left,0) - coalesce(featuredImage.crop.right,0)))
            /
            (featuredImage.asset->metadata.dimensions.height *
             (1 - coalesce(featuredImage.crop.top,0) - coalesce(featuredImage.crop.bottom,0))),
            2
          )
        )
      },
      "excerpt": coalesce(excerpt[_key == $lang][0].value, excerpt[_key == "pl"][0].value),
      "description": coalesce(description[_key == $lang][0].value, description[_key == "pl"][0].value),
      "tags": tags
    }`;

    const entries = await sanityClient.fetch<RawPortfolioEntry[]>(query, {
      lang,
      ...page,
    });

    return entries.map(mapSanityEntry);
  },

  fetchPortfolioLatestProjects: async (
    lang: string,
    limit: number
  ): Promise<Portfolio> => {
    if (limit < 0) {
      throw new Error("[limit] parameter must be positive");
    }
    const query = /* groq */ `
    *[_type == "portfolio"]
    | order(date desc)
    [0...$limit]
    {
      "title": coalesce(title[_key == $lang][0].value, title[_key == "pl"][0].value),
      "slug": slug[$lang].current,
      "date": date,
      "featuredImage": {
        "assetRef": featuredImage.asset._ref,
        "aspectRatio": featuredImage.asset->metadata.dimensions.aspectRatio
      },
      "excerpt": coalesce(excerpt[_key == $lang][0].value, excerpt[_key == "pl"][0].value),
      "description": coalesce(description[_key == $lang][0].value, description[_key == "pl"][0].value),
      "tags": tags
    }`;

    const entries = await sanityClient.fetch<RawPortfolioEntry[]>(query, {
      lang,
      limit,
    });

    return entries.map(mapSanityEntry);
  },
};
interface RawPortfolioEntry {
  title?: string;
  slug?: string;
  date?: string;
  featuredImage: {
    assetRef: string;
    aspectRatio: number;
  };
  excerpt?: string;
  description?: string;
  tags?: string[];
}

function mapSanityEntry(entry: RawPortfolioEntry): PortfolioEntry {
  return {
    title: entry.title ?? "",
    slug: entry.slug ?? "",
    date: entry.date ?? "",
    excerpt: entry.excerpt ?? "",
    description: entry.description ?? "",
    tags: entry.tags ?? [],
    featuredImage: buildImage(entry),
  };
}

function buildImage(entry: RawPortfolioEntry) {
  return {
    thumbnail: builder
      .image(entry.featuredImage.assetRef)
      .width(800)
      .format("webp")
      .quality(80)
      .url(),
    url: builder
      .image(entry.featuredImage.assetRef)
      .width(1600)
      .format("webp")
      .quality(85)
      .url(),
    aspectRatio: entry.featuredImage.aspectRatio,
  };
}
