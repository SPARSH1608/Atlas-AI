import { z } from "zod";

export const CopyVariantSchema = z.object({
    original_text: z.string(),
    rewritten_text: z.string(),
    reasoning: z.string().optional(),
    tone: z.string(),
});

export type CopyVariant = z.infer<typeof CopyVariantSchema>;
