import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob, file } from "astro/loaders";

const blogCollection = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    pubDate: z.date(),
    image: z.string(),
    tags: z.array(z.string()),
    slug: z.string(),
  }),
});
export const collections = {
  blog: blogCollection,
};
