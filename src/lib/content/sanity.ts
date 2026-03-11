import { createClient } from "@sanity/client";
import {
  createImageUrlBuilder,
  type SanityImageCrop,
  type SanityImageDimensions,
  type SanityImageHotspot,
  type SanityImageObject,
} from "@sanity/image-url";
import type { Portfolio, PortfolioEntry } from "./types";

const sanityClient = createClient({
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  apiVersion: "2026-03-10",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

interface RawPortfolioEntry {
  title?: string;
  slug?: string;
  date?: string;
  featuredImage: {
    assetRef: string;
    dimensions: SanityImageDimensions;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
  excerpt?: string;
  description?: string;
  tags?: string[];
}

// TODO: PAGINATION!
export async function fetchPortfolio(
  lang: string,
  limit?: number
): Promise<Portfolio> {
  const fields = `
  {
    "title": coalesce(title[_key == $lang][0].value, title[_key == "pl"][0].value),
    "slug": slug[$lang].current,
    "date": date,
    "featuredImage": {
      "assetRef": featuredImage.asset._ref,
      "dimensions": featuredImage.asset->metadata.dimensions,
      "crop": featuredImage.crop,
      "hotspot": featuredImage.hotspot,
    },
    "excerpt": coalesce(excerpt[_key == $lang][0].value, excerpt[_key == "pl"][0].value),
    "description": coalesce(description[_key == $lang][0].value, description[_key == "pl"][0].value),
    "tags": tags,
  }
  `;
  const slice = limit ? "[0...$limit]" : "";

  const entries = await sanityClient.fetch<RawPortfolioEntry[]>(
    `*[_type == "portfolio"] | order(date desc) ${slice} ${fields}`,
    { lang, limit }
  );

  return entries.map(mapSanityEntry);
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
    aspectRatio: calculateAspectRatio(entry),
  };
}

function calculateAspectRatio(entry: RawPortfolioEntry) {
  const { width, height } = entry.featuredImage.dimensions;
  const { crop } = entry.featuredImage;

  const croppedWidth = width * (1 - (crop?.left || 0) - (crop?.right || 0));
  const croppedHeight = height * (1 - (crop?.top || 0) - (crop?.bottom || 0));

  return croppedWidth / croppedHeight;
}

