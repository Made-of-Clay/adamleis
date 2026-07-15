import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const contentCore = z.object({
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  title: z.string(),
  date: z.coerce.date(),
});

const blogInternal = contentCore.extend({
  external: z.literal(false),
  description: z.string().optional(),
  ogImagePath: z.string().optional(),
  canonicalUrl: z.string().optional(),
});

const blogExternal = contentCore.extend({
  external: z.literal(true),
  description: z.string().optional(),
  url: z.string(),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.discriminatedUnion('external', [blogInternal, blogExternal]),
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
  schema: contentCore.extend({
    description: z.string().optional(),
    url: z.string().optional(),
  }),
});

export const collections = { blog, work };
