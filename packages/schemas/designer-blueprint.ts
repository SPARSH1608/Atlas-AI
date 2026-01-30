import { z } from "zod";

const ComponentConstraintsSchema = z
    .object({
        max_chars: z.number().nullable(),
        max_lines: z.number().nullable(),
        alignment: z.enum(["left", "center", "right"]).nullable(),
        emphasis: z.enum(["low", "medium", "high"]).nullable(),
    })
    .strict();

const BlueprintComponentSchema = z.object({
    id: z.string(), // semantic id: headline, cta, visual, etc
    type: z.enum(["background", "text", "image", "shape"]),
    role: z.enum([
        "base",
        "headline",
        "body",
        "cta",
        "product",
        "logo",
        "decoration",
    ]),

    importance: z.number().min(0).max(1).nullable(),

    constraints: ComponentConstraintsSchema.nullable(),
}).strict();

const CanvasIntentSchema = z.object({
    platform: z.enum(["instagram", "poster", "banner"]),
    aspect_ratio: z.string(),
    mood: z.string(),
}).strict();

export const DesignBlueprintSchema = z.object({
    canvas: CanvasIntentSchema,

    components: z.array(BlueprintComponentSchema).min(1),

    layout_strategy: z.enum([
        "centered_hierarchy",
        "split_layout",
        "grid",
        "asymmetric",
        "editorial",
    ]),

    rationale: z.string(),
}).strict();

export type DesignBlueprint = z.infer<
    typeof DesignBlueprintSchema
>;
