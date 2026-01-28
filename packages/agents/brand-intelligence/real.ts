import { BrandIntelligenceAgent } from "./interface";
import { runStructuredLLM } from "@repo/ai/llm";
import { MODELS } from "@repo/ai/models";
import { BrandDNASchema, BrandDNA } from "@repo/schemas";
import {
    BRAND_INTELLIGENCE_SYSTEM_PROMPT,
    buildBrandIntelligenceUserPrompt,
} from "./prompts";

export const BrandIntelligenceAgentImpl: BrandIntelligenceAgent = {
    async run(input, context) {
        const start = Date.now();

        const data = await runStructuredLLM<BrandDNA>({
            model: MODELS.SMART,
            system: BRAND_INTELLIGENCE_SYSTEM_PROMPT,
            user: buildBrandIntelligenceUserPrompt(input),
            schema: BrandDNASchema,
        });

        return {
            data,
            meta: {
                agentName: "BrandIntelligenceAgent",
                agentVersion: "1.0",
                executionTimeMs: Date.now() - start,
                confidence: 0.9,
            },
        };
    },
};
