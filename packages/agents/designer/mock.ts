import { DesignerAgent } from "./interface";

export const MockDesignerAgent: DesignerAgent = {
    async run({ platform }) {
        return {
            data: {
                schema_version: "1.0",
                canvas: {
                    platform,
                    aspect_ratio: "1:1",
                },
                layout_strategy: {
                    visual_hierarchy: [
                        "product_visual",
                        "headline",
                        "supporting_text",
                    ],
                    composition_style: "centered",
                    white_space_density: "high",
                },
                components: [
                    {
                        id: "background",
                        type: "background",
                        priority: "supporting",
                    },
                    {
                        id: "headline",
                        type: "text",
                        priority: "primary",
                        constraints: {
                            max_lines: 2,
                        },
                    },
                    {
                        id: "product_visual",
                        type: "image",
                        priority: "primary",
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
