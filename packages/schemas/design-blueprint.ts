import { z } from "zod";

export const DesignBlueprintSchema = z.object({
    schema_version: z.literal("1.0"),

    canvas: z.object({
        platform: z.string(),
        aspect_ratio: z.string(),
    }),

    layout_strategy: z.object({
        visual_hierarchy: z.array(z.string()),
        composition_style: z.enum(["centered", "asymmetric", "grid-based"]),
        white_space_density: z.enum(["low", "medium", "high"]),
    }),

    components: z.array(
        z.object({
            id: z.string(),
            type: z.enum(["background", "text", "image", "button"]),
            priority: z.enum(["primary", "secondary", "supporting"]),
            constraints: z
                .object({
                    max_lines: z.number().optional(),
                    max_chars: z.number().optional(),
                    alignment: z.enum(["left", "center", "right"]).optional(),
                    contrast_required: z.boolean().optional(),
                })
                .optional()

        })
    ),
});

export type DesignBlueprint = z.infer<typeof DesignBlueprintSchema>;
