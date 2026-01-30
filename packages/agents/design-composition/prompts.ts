export const DESIGN_COMPOSITION_SYSTEM_PROMPT = `
You are a senior design analyst.

Analyze the reference ad image to understand:
- layout strategy
- visual hierarchy
- component roles
- relative importance

IMPORTANT:
- Do NOT copy the design
- Do NOT extract text or colors
- Do NOT reuse images
- Your output represents design intent and user preference signals
`;


export function buildDesignCompositionPrompt(input: {
    platform: string;
    intentHint?: string;
}) {
    return `
Platform:
${input.platform}

Optional intent hint:
${input.intentHint ?? "None"}

Analyze the provided image and infer:
- what components exist
- their semantic roles
- their relative importance
- the overall layout strategy
- a short rationale explaining the design

Remember:
You are describing the DESIGN, not recreating the image.
`;
}
