import { ProductResearchAgent } from "./interface";
import { runStructuredLLM } from "@repo/ai/llm";
import { MODELS } from "@repo/ai/models";
import { ProductFactsSchema, ProductFacts } from "@repo/schemas";
import {
    PRODUCT_RESEARCH_SYSTEM_PROMPT,
    buildProductResearchUserPrompt,
} from "./prompts";

export const ProductResearchAgentImpl: ProductResearchAgent = {
    async run(input, context) {
        const start = Date.now();

        const data = await runStructuredLLM<ProductFacts>({
            model: MODELS.SMART,
            system: PRODUCT_RESEARCH_SYSTEM_PROMPT,
            user: buildProductResearchUserPrompt(input),
            schema: ProductFactsSchema,
        });

        return {
            data,
            meta: {
                agentName: "ProductResearchAgent",
                agentVersion: "1.0",
                executionTimeMs: Date.now() - start,
                confidence: 0.85,
            },
        };
    },
};
