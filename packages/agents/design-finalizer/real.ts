import { runStructuredLLM } from "@repo/ai";
import { MODELS } from "@repo/ai";
import { DesignManifestSchema } from "@repo/schemas";
import {
    DESIGN_FINALIZER_SYSTEM_PROMPT,
    buildDesignFinalizerPrompt,
} from "./prompts";

export const DesignFinalizerAgentImpl = {
    async run(input: any, ctx: any) {
        const data = await runStructuredLLM({
            model: MODELS.SMART,
            system: DESIGN_FINALIZER_SYSTEM_PROMPT,
            user: buildDesignFinalizerPrompt(input),
            schema: DesignManifestSchema,
        });

        return {
            data,
            meta: {
                agentName: "DesignFinalizerAgent",
                agentVersion: "1.0",
                confidence: 0.9,
            },
        };
    },
};
