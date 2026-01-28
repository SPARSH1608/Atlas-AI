import { Agent } from "../base/agent";
import { ProductFacts } from "@repo/schemas";

export interface ProductResearchInput {
    productText?: string;
    productImages?: string[];
    websiteUrl?: string;
    categoryHint?: string;
}

export type ProductResearchAgent = Agent<
    ProductResearchInput,
    ProductFacts
>;
