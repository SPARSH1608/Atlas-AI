import { BrandDNA, DesignBlueprint, ProductFacts, CanvasState, DesignManifest } from "@repo/schemas";
import { z } from "zod";

export interface CreativePipelineInput {
    productText?: string;
    productImages?: string[];
    websiteUrl?: string;
    categoryHint?: string;
    platform: "instagram" | "poster" | "banner";
}

export interface CreativePipelineResult {
    productFacts: ProductFacts;
    brandDNA: BrandDNA;
    designBlueprint: DesignBlueprint;
    canvasState: CanvasState;
    designManifest: DesignManifest;
}

export const CreativePipelineInputSchema = z.object({
    productText: z.string().optional(),
    productImages: z.array(z.string()).optional(),
    websiteUrl: z.string().optional(),
    categoryHint: z.string().optional(),
    platform: z.enum(["instagram", "poster", "banner"]),
})
