import { VisualAgent } from "./interface";
import { runStructuredLLM } from "@repo/ai";
import { MODELS } from "@repo/ai";
import { VisualAssetSchema, VisualAsset } from "@repo/schemas";
import {
    VISUAL_SYSTEM_PROMPT,
    buildVisualUserPrompt,
} from "./prompts";

export const VisualAgentImpl: VisualAgent = {
    async run(input, context) {
        const start = Date.now();

        const data = await runStructuredLLM({
            model: MODELS.SMART,
            system: VISUAL_SYSTEM_PROMPT,
            user: buildVisualUserPrompt(input),
            schema: VisualAssetSchema,
        });

        return {
            data: data as VisualAsset,
            meta: {
                agentName: "VisualAgent",
                agentVersion: "1.0",
                executionTimeMs: Date.now() - start,
                confidence: 0.85,
            },
        };
    },
};
