import { z } from "zod";

export const VisualAssetSchema = z.object({
    asset_id: z.string(),
    source: z.enum(["ai_generated"]),
    prompt_used: z.string(),
    style_tags: z.array(z.string()),
    aspect_ratio: z.string(),
});

export type VisualAsset = z.infer<typeof VisualAssetSchema>;
