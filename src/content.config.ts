import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      highlight: z.boolean().default(false),
      featured_image: image(),
      excerpt: z.string(),
      description: z.string(),
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = { portfolio };
