import { DesignerAgent } from "./interface";

export const MockDesignerAgent: DesignerAgent = {
    async run({ platform }) {
        return {
            data: {
                schema_version: "1.0",
                canvas: {
                    platform,
                    aspect_ratio: "1:1",
                    mood: "modern",
                },
                layout_strategy: "centered_hierarchy",
                rationale: "Centered layout emphasizes the product with clear visual hierarchy.",
                components: [
                    {
                        id: "background",
                        type: "background",
                        role: "base",
                        importance: 0.3,
                        constraints: null,
                    },
                    {
                        id: "headline",
                        type: "text",
                        role: "headline",
                        importance: 1,
                        constraints: {
                            max_lines: 2,
                            max_chars: null,
                            alignment: null,
                            emphasis: null,
                        },
                    },
                    {
                        id: "product_visual",
                        type: "image",
                        role: "product",
                        importance: 1,
                        constraints: null,
                    },
                ],
            },
            meta: {
                agentName: "DesignerAgent",
                agentVersion: "mock-1",
                executionTimeMs: 1,
                confidence: 0.75,
            },
        };
    },
};
