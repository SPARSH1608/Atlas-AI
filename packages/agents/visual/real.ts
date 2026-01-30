import { VisualAgent } from "./interface";
import { runStructuredLLM } from "@repo/ai";
import { MODELS } from "@repo/ai";
import { VisualAssetSchema, VisualAsset } from "@repo/schemas";
import {
    VISUAL_SYSTEM_PROMPT,
    buildVisualUserPrompt,
} from "./prompts";

export const VisualAgentImpl: VisualAgent = {
    async run(input, context) {
        const start = Date.now();

        const data = await runStructuredLLM({
            model: MODELS.SMART,
            system: VISUAL_SYSTEM_PROMPT,
            user: buildVisualUserPrompt(input),
            schema: VisualAssetSchema.omit({ url: true }),
        });

        let imageUrl: string | undefined;

        try {
            console.log("Generating image with prompt:", data.prompt_used);
            const imageRes = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "dall-e-3",
                    prompt: data.prompt_used,
                    n: 1,
                    size: "1024x1024",
                    quality: "standard",
                    response_format: "url",
                }),
            });

            if (!imageRes.ok) {
                const errorText = await imageRes.text();
                console.error("OpenAI Image API Error:", imageRes.status, errorText);
            } else {
                const imageJson = await imageRes.json();
                imageUrl = imageJson.data?.[0]?.url;
            }
        } catch (e) {
            console.error("Image generation exception", e);
        }

        return {
            data: {
                ...data,
                url: imageUrl,
            } as VisualAsset,
            meta: {
                agentName: "VisualAgent",
                agentVersion: "1.0",
                executionTimeMs: Date.now() - start,
                confidence: 0.85,
            },
        };
    },
};
