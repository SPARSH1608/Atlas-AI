import { z } from "zod";

export const ProductFactsSchema = z.object({
    schema_version: z.literal("1.0"),

    product_identity: z.object({
        name: z.string(),
        category: z.string(),
        sub_category: z.string(),
        is_physical: z.boolean(),
        is_digital: z.boolean(),
    }),

    problem_space: z.object({
        primary_problem: z.string(),
        secondary_problems: z.array(z.string()),
    }),

    solution_overview: z.object({
        core_function: z.string(),
        key_features: z.array(z.string()),
    }),

    market_context: z.object({
        price_positioning: z.enum(["low", "mid", "premium"]),
        market_maturity: z.enum(["new", "growing", "saturated"]),
        typical_platforms: z.array(z.string()),
    }),

    input_confidence: z.object({
        text_input_confidence: z.enum(["high", "medium", "low"]),
        image_input_confidence: z.enum(["high", "medium", "low"]),
        assumptions_made: z.array(z.string()),
    }),
});

export type ProductFacts = z.infer<typeof ProductFactsSchema>;
