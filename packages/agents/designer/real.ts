import { runStructuredLLM } from "@repo/ai/llm";
import { AgentContext } from "../base/agent";
import { DesignerAgentInput } from "./interface";
import { DesignBlueprintSchema } from "@repo/schemas";
import { MODELS } from "@repo/ai/models";
import { buildDesignerPrompt } from "./prompts";

export const DesignerAgentImpl = {
    async run(input: DesignerAgentInput, ctx: AgentContext) {
        const start = Date.now();
        const data = await runStructuredLLM({
            model: MODELS.SMART,
            system: "You are a senior designer.",
            user: buildDesignerPrompt(input),
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
