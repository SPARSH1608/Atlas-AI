import { BrandIntelligenceAgent } from "./interface";

export const MockBrandIntelligenceAgent: BrandIntelligenceAgent = {
    async run({ productFacts }) {
        return {
            data: {
                schema_version: "1.0",
                target_audience: {
                    age_range: "25–45",
                    gender_focus: "neutral",
                    geography: "urban",
                    psychographics: {
                        mindset: ["food-conscious", "experience-driven"],
                        motivations: ["quality dining", "social experience"],
                        pain_points: ["generic cafes"],
                    },
                },
                brand_positioning: {
                    brand_archetype: "creator",
                    personality_traits: ["elegant", "calm", "premium"],
                    tone_of_voice: "minimal",
                },
                usp_definition: {
                    primary_usp: "Curated premium brunch experience",
                    supporting_usps: ["Seasonal menu", "Chef-driven"],
                },
                visual_identity_guidelines: {
                    color_strategy: {
                        emotion: "warm",
                        contrast_level: "medium",
                    },
                    typography_strategy: {
                        font_category: "serif",
                        weight_preference: "regular",
                        readability_priority: "high",
                    },
                },
                risk_flags: {
                    overused_visual_styles: ["stock food photography"],
                    cultural_sensitivities: [],
                },
            },
            meta: {
                agentName: "BrandIntelligenceAgent",
                agentVersion: "mock-1",
                executionTimeMs: 1,
                confidence: 0.7,
            },
        };
    },
};
