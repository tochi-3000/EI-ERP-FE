import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    // Use the glob loader to fetch markdown files from src/content/blog
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
    schema: ({ image }) => z.object({
        title: z.string().max(60, "SEO Title should be under 60 characters for optimal ranking."),
        description: z.string().min(50).max(160, "SEO Description must be between 50 and 160 characters."),
        publishDate: z.coerce.date(), // Using coerce to ensure string dates from frontmatter are handled
        updatedDate: z.coerce.date().optional(),
        author: z.string().default('SELL EVERYDAY Team'),

        // Validates the image exists and allows Astro to optimize it
        coverImage: image(),
        coverImageAlt: z.string(),

        // Tagging for taxonomy/internal linking
        tags: z.array(z.string()).default(['POS']),

        // Boolean to prevent accidental publishing
        isDraft: z.boolean().default(false),
    }),
});

export const collections = { blog };
