export const DESIGNER_SYSTEM_PROMPT = `
You are a senior graphic designer.

Translate brand rules into a structural design plan:
- layout
- hierarchy
- components

Do NOT create copy or images.
Focus on structure and intent.

Return structured data only.
`;

export function buildDesignerPrompt(input: {
    product: any;
    brand: any;
    platform: string;
    designPreferences?: string;
}) {
    return `
  Product:
  ${JSON.stringify(input.product, null, 2)}
  
  Brand:
  ${JSON.stringify(input.brand, null, 2)}
  
  ${input.designPreferences ?? ""}
  
  Design an ad layout that fits the product and brand.
  Use preferences as guidance, not strict rules.
  Return a DesignBlueprint only.
  `;
}
