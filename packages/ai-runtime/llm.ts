import { z } from "zod";
import { generateObject } from "ai";

interface StructuredLLMInput<T> {
    model: any;
    system: string;
    user: string;
    schema: z.ZodSchema<T>;

    images?: Array<{
        url: string;
        detail?: "low" | "high";
    }>;
}

export async function runStructuredLLM<T>(
    input: StructuredLLMInput<T>
): Promise<T> {
    const result = await generateObject({
        model: input.model,
        system: input.system,
        prompt: input.user,
        schema: input.schema,

        ...(input.images
            ? {
                images: input.images,
            }
            : {}),
    });

    return result.object;
}
