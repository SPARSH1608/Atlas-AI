import { z } from "zod";

export const DesignManifestSchema = z.object({
    theme: z.object({
        primary_color: z.string(),
        secondary_color: z.string(),
        background_color: z.string(),
        mood: z.string(),
    }),

    typography: z.object({
        headline_font: z.string(),
        body_font: z.string(),
        cta_font: z.string(),
    }),

    copy: z.object({
        headline: z.string(),
        body: z.string(),
        cta: z.string(),
    }),

    visuals: z.object({
        product_image: z.object({
            concept: z.string(),
            style: z.string(),
            lighting: z.string(),
            background: z.string(),
        }),

        background_image: z
            .object({
                concept: z.string(),
                style: z.string(),
            })
            .nullable(),
    }),

    rationale: z.string(),
});

export type DesignManifest = z.infer<typeof DesignManifestSchema>;
