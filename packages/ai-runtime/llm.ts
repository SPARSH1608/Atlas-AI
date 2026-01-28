import { generateObject } from "ai";

export async function runStructuredLLM<T>({
    model,
    system,
    user,
    schema,
}: {
    model: any;
    system: string;
    user: string;
    schema: any;
}): Promise<T> {
    const result = await generateObject({
        model,
        schema,
        messages: [
            { role: "system", content: system },
            { role: "user", content: user },
        ],
    });

    return result.object as T;
}
