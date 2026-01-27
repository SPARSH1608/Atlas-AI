import { z } from "zod";

export const BrandDNASchema = z.object({
    schema_version: z.literal("1.0"),

    target_audience: z.object({
        age_range: z.string(),
        gender_focus: z.enum(["male", "female", "neutral"]),
        geography: z.string(),
        psychographics: z.object({
            mindset: z.array(z.string()),
            motivations: z.array(z.string()),
            pain_points: z.array(z.string()),
        }),
    }),

    brand_positioning: z.object({
        brand_archetype: z.enum([
            "creator",
            "hero",
            "rebel",
            "caregiver",
            "explorer",
        ]),
        personality_traits: z.array(z.string()),
        tone_of_voice: z.enum([
            "playful",
            "serious",
            "motivational",
            "minimal",
        ]),
    }),

    usp_definition: z.object({
        primary_usp: z.string(),
        supporting_usps: z.array(z.string()),
    }),

    visual_identity_guidelines: z.object({
        color_strategy: z.object({
            emotion: z.string(),
            contrast_level: z.enum(["low", "medium", "high"]),
        }),
        typography_strategy: z.object({
            font_category: z.enum(["sans-serif", "serif", "display"]),
            weight_preference: z.enum(["light", "regular", "bold"]),
            readability_priority: z.enum(["high", "medium"]),
        }),
    }),

    risk_flags: z.object({
        overused_visual_styles: z.array(z.string()),
        cultural_sensitivities: z.array(z.string()),
    }),
});

export type BrandDNA = z.infer<typeof BrandDNASchema>;
