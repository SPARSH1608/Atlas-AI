import { openai } from "@ai-sdk/openai";

export const MODELS = {
    FAST: openai("gpt-4o-mini"),
    SMART: openai("gpt-4.1"),
};
