import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const MODELS = {
    FAST: openai("gpt-4o-mini"),
    SMART: openai("gpt-4o"),
    VISION: openai("gpt-4o-vision-preview")
};
