import { z } from "zod";

export const CopyVariantSchema = z.object({
    original_text: z.string(),
    rewritten_text: z.string(),
    reasoning: z.string().nullable(),
    tone: z.string(),
}).strict();

export type CopyVariant = z.infer<typeof CopyVariantSchema>;
