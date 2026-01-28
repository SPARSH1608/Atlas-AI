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

export function buildDesignerUserPrompt(input: {
    brandDNA: any;
    platform: string;
}) {
    return `
Brand DNA:
${JSON.stringify(input.brandDNA, null, 2)}

Target platform:
${input.platform}
`;
}
