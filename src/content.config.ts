import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { PORTFOLIO_TAG_KEYS } from "./lib/tags";

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      highlight: z.boolean().default(false),
      featured_image: image(),
      description: z.string(),
      tags: z
        .array(z.enum(PORTFOLIO_TAG_KEYS as [string, ...string[]]))
        .default([]),
    }),
});

export const collections = { portfolio };
