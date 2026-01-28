import { ProductResearchAgent } from "./interface";

export const MockProductResearchAgent: ProductResearchAgent = {
    async run(_, context) {
        return {
            data: {
                schema_version: "1.0",
                product_identity: {
                    name: "Luca Restaurant",
                    category: "Food & Beverage",
                    sub_category: "Restaurant",
                    is_physical: true,
                    is_digital: false,
                },
                problem_space: {
                    primary_problem: "Finding a premium brunch experience",
                    secondary_problems: [],
                },
                solution_overview: {
                    core_function: "Provides curated brunch dining",
                    key_features: ["Seasonal menu", "Fresh ingredients"],
                },
                market_context: {
                    price_positioning: "premium",
                    market_maturity: "saturated",
                    typical_platforms: ["instagram", "poster"],
                },
                input_confidence: {
                    text_input_confidence: "high",
                    image_input_confidence: "low",
                    assumptions_made: [],
                },
            },
            meta: {
                agentName: "ProductResearchAgent",
                agentVersion: "mock-1",
                executionTimeMs: 1,
                confidence: 0.6,
            },
        };
    },
};
