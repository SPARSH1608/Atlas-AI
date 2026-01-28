import { CopyAgent } from "./interface";
import { runStructuredLLM } from "@repo/ai";
import { MODELS } from "@repo/ai/models";
import { CopyVariant, CopyVariantSchema } from "@repo/schemas";
import {
    COPY_SYSTEM_PROMPT,
    buildCopyUserPrompt,
} from "./prompts";

export const CopyAgentImpl: CopyAgent = {
    async run(input, context) {
        const start = Date.now();

        const data = await runStructuredLLM({
            model: MODELS.SMART,
            system: COPY_SYSTEM_PROMPT,
            user: buildCopyUserPrompt(input),
            schema: CopyVariantSchema,
        });

        return {
            data: data as CopyVariant,
            meta: {
                agentName: "CopyAgent",
                agentVersion: "1.0",
                executionTimeMs: Date.now() - start,
                confidence: 0.85,
            },
        };
    },
};
