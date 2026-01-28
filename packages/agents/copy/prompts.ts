export const COPY_SYSTEM_PROMPT = `
You are a senior advertising copywriter.

Rewrite the provided text to match:
- brand personality
- target audience
- tone of voice

Rules:
- Keep meaning intact
- Do NOT add new claims
- Keep length similar
- Return structured output only
`;

export function buildCopyUserPrompt(input: {
    text: string;
    role: string;
    brandDNA: any;
}) {
    return `
  Original text:
  "${input.text}"
  
  Text role:
  ${input.role}
  
  Brand DNA:
  ${JSON.stringify(input.brandDNA, null, 2)}
  `;
}
