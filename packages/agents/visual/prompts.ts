export const VISUAL_SYSTEM_PROMPT = `
You are a senior advertising visual designer.

Your task is to design a single visual asset for an advertisement.

You do NOT generate the final image.
You only define:
- what the image should depict
- the visual style
- composition guidance

Rules:
- Follow brand DNA strictly
- Do NOT include text in the image unless explicitly requested
- Do NOT invent product claims
- Keep descriptions concrete and visual
- Return structured data only
`;

export function buildVisualUserPrompt(input: {
    role: "product" | "hero" | "background";
    brandDNA: any;
    canvas: { width: number; height: number };
}) {
    return `
Image role:
${input.role}

Canvas size:
${input.canvas.width} x ${input.canvas.height}

Brand DNA:
${JSON.stringify(input.brandDNA, null, 2)}

Describe:
- main subject
- background
- lighting
- mood
- composition
`;
}
