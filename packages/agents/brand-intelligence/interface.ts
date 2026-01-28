import { Agent } from "../base/agent";
import { BrandDNA } from "@repo/schemas";
import { ProductFacts } from "@repo/schemas";

export interface BrandIntelligenceInput {
    productFacts: ProductFacts;
    brandHints?: {
        tone?: string;
        audience?: string;
        competitors?: string[];
    };
}

export type BrandIntelligenceAgent = Agent<
    BrandIntelligenceInput,
    BrandDNA
>;
