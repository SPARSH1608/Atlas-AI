import { DesignCompositionAgent } from "./interface";

export const MockDesignCompositionAgent: DesignCompositionAgent = {
    async run(input) {
        return {
            data: {
                canvas: {
                    platform: input.platform,
                    aspect_ratio:
                        input.platform === "instagram" ? "1:1" : "4:5",
                    mood: "modern",
                },

                layout_strategy: "centered_hierarchy",

                components: [
                    {
                        id: "background",
                        type: "background",
                        role: "base",
                        importance: 0.1,
                        constraints: null,
                    },
                    {
                        id: "headline",
                        type: "text",
                        role: "headline",
                        importance: 0.9,
                        constraints: {
                            max_chars: 40,
                            alignment: "center",
                            emphasis: "high",
                            max_lines: null,
                        },
                    },
                    {
                        id: "hero_image",
                        type: "image",
                        role: "product",
                        importance: 0.85,
                        constraints: null,
                    },
                    {
                        id: "cta",
                        type: "text",
                        role: "cta",
                        importance: 0.6,
                        constraints: {
                            max_chars: 18,
                            alignment: "center",
                            max_lines: null,
                            emphasis: null,
                        },
                    },
                ],

                rationale:
                    "The design uses a strong central hierarchy with a bold headline, supported by a dominant product visual and a clear call-to-action below.",
            },

            meta: {
                agentName: "DesignCompositionAgent",
                agentVersion: "mock-1",
                executionTimeMs: 1,
                confidence: 0.95,
            },
        };
    },
};
