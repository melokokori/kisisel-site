import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Dosyalar dil klasörlerinde durur: src/content/<koleksiyon>/{tr,en}/<slug>.md
// "_" ile başlayan dosyalar (ör. _sablon.md) yüklenmez; şablon olarak kullanılır.

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '{tr,en}/**/[^_]*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(), // kart üzerindeki 1–2 cümle
    date: z.coerce.date(),
    role: z.string().optional(), // projedeki rolün
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false), // ana sayfada gösterilsin mi
    cover: z.string().optional(), // public/ altındaki görsel yolu
    links: z
      .object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
        paper: z.string().url().optional(),
        video: z.string().url().optional(),
      })
      .default({}),
  }),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '{tr,en}/**/[^_]*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
