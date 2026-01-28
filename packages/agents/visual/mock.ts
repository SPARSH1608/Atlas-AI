import { VisualAgent } from "./interface";

export const MockVisualAgent: VisualAgent = {
    async run(input) {
        const intentSuffix = input.userIntent
            ? ` | intent: ${input.userIntent}`
            : "";

        return {
            data: {
                asset_id: `mock-${input.role}-${hash(input.userIntent ?? "")}`,
                source: "ai_generated",
                prompt_used: `Mock visual for ${input.role}${intentSuffix}`,
                style_tags: input.userIntent
                    ? ["mock", "user-directed"]
                    : ["mock", "default"],
                aspect_ratio: "1:1",
            },
            meta: {
                agentName: "VisualAgent",
                agentVersion: "mock-2",
                executionTimeMs: 1,
                confidence: 0.99,
            },
        };
    },
};

function hash(str: string) {
    return str ? Math.abs(str.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) : "base";
}
