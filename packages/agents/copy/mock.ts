import { CopyAgent } from "./interface";

export const MockCopyAgent: CopyAgent = {
    async run(input, context) {
        console.log("MockCopyAgent", input, context);
        return {
            data: {
                original_text: input.text,
                rewritten_text: input.userIntent
                    ? `[${input.userIntent}] ${input.text}`
                    : `[AI Rewrite] ${input.text}`,
                tone: "mock",
                reasoning: "Mock rewrite for UX testing",
            },
            meta: {
                agentName: "CopyAgent",
                agentVersion: "mock-1",
                executionTimeMs: 1,
                confidence: 0.99,
            },
        };
    },
};
