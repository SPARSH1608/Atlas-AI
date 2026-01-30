import { DesignFinalizerAgent } from "./interface";

export const MockDesignFinalizerAgent: DesignFinalizerAgent = {
    async run(input, context) {
        console.log("MockDesignFinalizerAgent run", input);
        return {
            data: {
                theme: {
                    primary_color: "#000000",
                    secondary_color: "#ffffff",
                    background_color: "#f0f0f0",
                    mood: "neutral",
                },
                typography: {
                    headline_font: "Inter",
                    body_font: "Roboto",
                    cta_font: "Inter",
                },
                copy: {
                    headline: "Mock Headline",
                    body: "Mock body text",
                    cta: "Shop Now",
                },
                visuals: {
                    product_image: {
                        concept: "A mock product image",
                        style: "studio",
                        lighting: "soft",
                        background: "plain",
                    },
                    background_image: {
                        concept: "A mock background",
                        style: "abstract",
                    },
                },
                rationale: "Mock rationale for testing",
            },
            meta: {
                agentName: "DesignFinalizerAgent",
                agentVersion: "mock-1.0",
                confidence: 1.0,
            },
        };
    },
};
