import { defaultLang, type Lang } from "@i18n/locale";
import type {
  SanityImageObjectStub,
  SanityImageSource,
} from "@sanity/asset-utils";
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Portfolio, Project, ProjectImage } from "./types";

/**
 * Sanity client for fetching content at <b>build time</b>.
 *
 * We set `useCdn: false` because:
 * 1. The site is built statically (SSG) on Cloudflare Pages.
 * 2. We want to ensure that the latest published content is pulled
 *    from Sanity’s origin API, avoiding stale data from the Sanity CDN.
 * 3. Using the CDN (`useCdn: true`) can sometimes serve cached content
 *    that hasn’t yet propagated after a new publishing, causing inconsistencies
 *    in the generated static HTML.
 *
 * Note:
 * - `useCdn: false` only affects data fetching during build.
 * - Images are still served from Sanity’s CDN (cdn.sanity.io).
 * - All internal links (`slug.current`) remain local and are unaffected.
 */
const sanityClient = createClient({
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  apiVersion: "2026-03-10",
  useCdn: false,
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
    *[_type == "portfolio"] | order(date desc) [$start...$end]
    {
      "title": coalesce(title[_key == $lang][0].value, title[_key == $defaultLang][0].value),
      "slug": slug[$lang].current,
      "date": date,
      images[] {
        _type,
        _key,
        asset,
        crop,
        hotspot,
      },
      "excerpt": coalesce(excerpt[_key == $lang][0].value, excerpt[_key == $defaultLang][0].value),
      "description": coalesce(description[_key == $lang][0].value, description[_key == $defaultLang][0].value),
      "tags": tags
    }`;

    const entries = await sanityClient.fetch<RawPortfolioEntry[]>(query, {
      lang,
      defaultLang,
      ...page,
    });

    return entries.map(mapSanityEntry);
  },

  fetchPortfolioLatestProjects: async (
    lang: Lang,
    limit: number
  ): Promise<Portfolio> => {
    if (limit < 0) {
      throw new Error("[limit] parameter must be positive");
    }
    const query = /* groq */ `
    *[_type == "portfolio"] | order(date desc) [0...$limit]
    {
      "title": coalesce(title[_key == $lang][0].value, title[_key == $defaultLang][0].value),
      "slug": slug[$lang].current,
      "date": date,
      images[] {
        _type,
        _key,
        asset,
        crop,
        hotspot,
      },
      "excerpt": coalesce(excerpt[_key == $lang][0].value, excerpt[_key == $defaultLang][0].value),
      "description": coalesce(description[_key == $lang][0].value, description[_key == $defaultLang][0].value),
      "tags": tags
    }`;

    const entries = await sanityClient.fetch<RawPortfolioEntry[]>(query, {
      lang,
      defaultLang,
      limit,
    });

    return entries.map(mapSanityEntry);
  },
};
interface RawPortfolioEntry {
  date?: string;
  description?: string;
  excerpt?: string;
  images?: SanityImageSource[];
  slug?: string;
  tags?: string[];
  title?: string;
}

function mapSanityEntry(entry: RawPortfolioEntry): Project {
  return {
    title: entry.title ?? "",
    slug: entry.slug ?? "",
    date: entry.date ?? "",
    excerpt: entry.excerpt ?? "",
    description: entry.description ?? "",
    tags: entry.tags ?? [],
    images: buildImages(entry.images ?? []),
  };
}

function hasAsset(image: SanityImageSource): boolean {
  return isImageObject(image) && getAssetRef(image.asset) !== undefined;
}

function buildImages(images: SanityImageSource[]): ProjectImage[] {
  return images.filter(hasAsset).map(buildImage);
}

function buildImage(image: SanityImageSource): ProjectImage {
  const dimensions = getImageDimensionsWithCrop(image);

  return {
    thumbnail: builder.image(image).width(800).format("webp").quality(80).url(),
    url: builder.image(image).width(1600).format("webp").quality(85).url(),
    aspectRatio: dimensions?.aspectRatio ?? 1,
  };
}

function isImageObject(
  image: SanityImageSource
): image is SanityImageObjectStub {
  return typeof image === "object" && image !== null && "asset" in image;
}

function getAssetRef(
  asset: SanityImageObjectStub["asset"]
): string | undefined {
  if (asset && typeof asset === "object" && "_ref" in asset) {
    return asset._ref;
  }

  return;
}

/**
 * See: https://github.com/sanity-io/asset-utils/issues/1
 */
function getImageDimensionsWithCrop(
  image: SanityImageSource
): { width: number; height: number; aspectRatio: number } | undefined {
  if (!isImageObject(image)) {
    return;
  }

  const assetRef = getAssetRef(image.asset);
  if (!assetRef) {
    return;
  }

  // example asset._ref:
  // image-7558c4a4d73dac0398c18b7fa2c69825882e6210-366x96-png
  // When splitting by '-' we can extract the dimensions, id and extension
  const dimensions = assetRef.split("-")[2];
  const [width, height] = dimensions.split("x").map(Number);

  if (!(width > 0 && height > 0)) {
    return;
  }

  if (image.crop) {
    const croppedWidth =
      width * (1 - (image.crop?.right || 0) - (image.crop?.left || 0));
    const croppedHeight =
      height * (1 - (image.crop?.top || 0) - (image.crop?.bottom || 0));
    return {
      width: croppedWidth,
      height: croppedHeight,
      aspectRatio: croppedWidth / croppedHeight,
    };
  }

  return {
    width,
    height,
    aspectRatio: width / height,
  };
}
