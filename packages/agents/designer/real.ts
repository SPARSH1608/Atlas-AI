
import { DesignerAgent } from "./interface";
import { runStructuredLLM } from "@repo/ai/llm";
import { MODELS } from "@repo/ai/models";
import { DesignBlueprintSchema, DesignBlueprint } from "@repo/schemas";
import {
    DESIGNER_SYSTEM_PROMPT,
    buildDesignerUserPrompt,
} from "./prompts";

export const DesignerAgentImpl: DesignerAgent = {
    async run(input, context) {
        const start = Date.now();

        const data = await runStructuredLLM<DesignBlueprint>({
            model: MODELS.SMART,
            system: DESIGNER_SYSTEM_PROMPT,
            user: buildDesignerUserPrompt(input),
            schema: DesignBlueprintSchema,
        });

        return {
            data,
            meta: {
                agentName: "DesignerAgent",
                agentVersion: "1.0",
                executionTimeMs: Date.now() - start,
                confidence: 0.85,
            },
        };
    },
};
