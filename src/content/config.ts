import { defineCollection, z } from 'astro:content';

// PRODUCTION SAFEGUARDS:
// 1. Zod Validation: Ensures no blog post can be published missing critical metadata.
// 2. Image verification: Astro will process and optimize local images automatically.
// 3. Draft state: Allows writers to merge PRs without exposing unfinished posts to production.

const blogCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string().max(60, "SEO Title should be under 60 characters for optimal ranking."),
        description: z.string().min(50).max(160, "SEO Description must be between 50 and 160 characters."),
        publishDate: z.date(),
        updatedDate: z.date().optional(),
        author: z.string().default('EI POS Team'),

        // Validates the image exists and allows Astro to optimize it
        coverImage: image(),
        coverImageAlt: z.string(),

        // Tagging for taxonomy/internal linking
        tags: z.array(z.string()).default(['POS']),

        // Boolean to prevent accidental publishing
        isDraft: z.boolean().default(false),
    }),
});

export const collections = {
    'blog': blogCollection,
};