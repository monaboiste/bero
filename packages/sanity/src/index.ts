import { defaultLang, type Lang } from "@bero/locales";
import type { Portfolio, PortfolioService, Project } from "@bero/portfolio";
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { buildImages } from "./images";
import type { SanityPortfolioDocument } from "./types";

/**
 * Creates a Sanity-backed PortfolioService.
 *
 * We set `useCdn: false` because:
 * 1. The site is built statically (SSG) on Cloudflare Pages.
 * 2. We want to ensure that the latest published content is pulled
 *    from Sanity's origin API, avoiding stale data from the Sanity CDN.
 * 3. Using the CDN (`useCdn: true`) can sometimes serve cached content
 *    that hasn't yet propagated after a new publishing, causing inconsistencies
 *    in the generated static HTML.
 *
 * Note:
 * - `useCdn: false` only affects data fetching during build.
 * - Images are still served from Sanity's CDN (cdn.sanity.io).
 * - All internal links (`slug.current`) remain local and are unaffected.
 */
export function createSanityPortfolioService(config: {
  projectId: string;
  dataset: string;
  lang: Lang;
}): PortfolioService {
  const { lang } = config;

  const client = createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: "2026-03-10",
    useCdn: false,
  });

  const builder = createImageUrlBuilder(client);

  function mapDocument(doc: SanityPortfolioDocument): Project {
    return {
      title: doc.title ?? "",
      slug: doc.slug ?? "",
      date: doc.date ?? "",
      excerpt: doc.excerpt ?? "",
      description: doc.description ?? "",
      tags: doc.tags ?? [],
      images: buildImages(builder, doc.images ?? []),
    };
  }

  const PORTFOLIO_PROJECTION = /* groq */ `{
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

  return {
    count: (): Promise<number> => {
      const query = /* groq */ `count(*[_type == "portfolio"])`;
      return client.fetch<number>(query);
    },

    fetchPortfolioPage: async (page: {
      start: number;
      end: number;
    }): Promise<Portfolio> => {
      const query = /* groq */ `
        *[_type == "portfolio"] | order(date desc) [$start...$end] ${PORTFOLIO_PROJECTION}`;

      const docs = await client.fetch<SanityPortfolioDocument[]>(query, {
        lang,
        defaultLang,
        ...page,
      });

      return docs.map(mapDocument);
    },

    fetchPortfolioLatestProjects: async (limit: number): Promise<Portfolio> => {
      if (limit < 0) {
        throw new Error("[limit] parameter must be positive");
      }

      const query = /* groq */ `
        *[_type == "portfolio"] | order(date desc) [0...$limit] ${PORTFOLIO_PROJECTION}`;

      const docs = await client.fetch<SanityPortfolioDocument[]>(query, {
        lang,
        defaultLang,
        limit,
      });

      return docs.map(mapDocument);
    },
  };
}
