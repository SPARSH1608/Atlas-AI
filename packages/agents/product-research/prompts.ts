export const PRODUCT_RESEARCH_SYSTEM_PROMPT = `
You are a product research analyst.

Your job is to extract factual, neutral information about a product.
Do NOT add branding, tone, visual style, or opinions.
If information is missing, make reasonable assumptions and list them explicitly.

Return ONLY structured data that matches the provided schema.
`;

export function buildProductResearchUserPrompt(input: {
    productText?: string;
    websiteUrl?: string;
    categoryHint?: string;
}) {
    return `
Product description:
${input.productText ?? "Not provided"}

Website:
${input.websiteUrl ?? "Not provided"}

Category hint:
${input.categoryHint ?? "Not provided"}
`;
}
