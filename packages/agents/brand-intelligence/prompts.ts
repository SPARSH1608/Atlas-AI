export const BRAND_INTELLIGENCE_SYSTEM_PROMPT = `
You are a brand strategist.

Based on the product facts, define:
- target audience
- brand positioning
- unique selling propositions
- visual identity rules

Do NOT generate copy or visuals.
Focus on rules, not execution.

Return structured data only.
`;

export function buildBrandIntelligenceUserPrompt(input: {
    productFacts: any;
    brandHints?: any;
}) {
    return `
Product facts:
${JSON.stringify(input.productFacts, null, 2)}

User brand hints:
${JSON.stringify(input.brandHints ?? {}, null, 2)}
`;
}
