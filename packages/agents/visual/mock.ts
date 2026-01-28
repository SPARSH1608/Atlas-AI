import { VisualAgent } from "./interface";

export const MockVisualAgent: VisualAgent = {
    async run(input) {
        return {
            data: {
                asset_id: `mock-image-${input.role}`,
                source: "ai_generated",
                prompt_used: `Mock image for ${input.role}`,
                style_tags: ["clean", "editorial"],
                aspect_ratio: "1:1",
            },
            meta: {
                agentName: "VisualAgent",
                agentVersion: "mock-1",
                executionTimeMs: 1,
                confidence: 0.95,
            },
        };
    },
};
