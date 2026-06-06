import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// İçerik klasör yapısı:
//   src/content/blog/tr/*.mdx     ← Türkçe yazılar
//   src/content/blog/en/*.mdx     ← İngilizce yazılar
//   src/content/projects/tr|en/*.mdx
// Dil, dosya yolunun ilk klasöründen (id'den) türetilir — helpers.ts'e bak.

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      summary: z.string().optional(),
      tech: z.array(z.string()).default([]),
      repo: z.string().url().optional(),
      live: z.string().url().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(99),
      year: z.string().optional(),
      category: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, projects };
