import { DesignCompositionAgent } from "./interface";
import { runStructuredLLM } from "@repo/ai/llm";
import { MODELS } from "@repo/ai/models";
import { DesignBlueprintSchema } from "@repo/schemas";
import {
    DESIGN_COMPOSITION_SYSTEM_PROMPT,
    buildDesignCompositionPrompt,
} from "./prompts";

export const DesignCompositionAgentImpl: DesignCompositionAgent = {
    async run(input, context) {
        const start = Date.now();

        const data = await runStructuredLLM({
            model: MODELS.VISION,
            system: DESIGN_COMPOSITION_SYSTEM_PROMPT,
            user: buildDesignCompositionPrompt({
                platform: input.platform,
                intentHint: input.intentHint,
            }),
            images: [
                {
                    url: input.imageUrl,
                    detail: "high",
                },
            ],
            schema: DesignBlueprintSchema,
        });

        return {
            data,
            meta: {
                agentName: "DesignCompositionAgent",
                agentVersion: "1.0",
                executionTimeMs: Date.now() - start,
                confidence: 0.85,
            },
        };
    },
};
