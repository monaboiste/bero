import { defineCollection, z } from "astro:content";
import { PORTFOLIO_TAG_KEYS } from "@lib/content/tags";
import { glob } from "astro/loaders";

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      featured_image: image(),
      description: z.string(),
      tags: z
        .array(z.enum(PORTFOLIO_TAG_KEYS as [string, ...string[]]))
        .default([]),
    }),
});

export const collections = { portfolio };
