import { DesignBlueprint } from "@repo/schemas";
import { CanvasState } from "@repo/schemas";
import { randomUUID } from "crypto";
function getDefaultPosition(type: string, index: number) {
    switch (type) {
        case "background":
            return { x: 0, y: 0, width: 1, height: 1, rotation: 0 };

        case "text":
            return { x: 0.1, y: 0.15 + index * 0.15, width: 0.8, height: 0.1, rotation: 0 };

        case "image":
            return { x: 0.1, y: 0.4, width: 0.8, height: 0.4, rotation: 0 };

        default:
            return { x: 0.1, y: 0.1, width: 0.8, height: 0.2, rotation: 0 };
    }
}

export function mapBlueprintToCanvas(
    blueprint: DesignBlueprint
): CanvasState {
    const canvasWidth = 1080;
    const canvasHeight = 1080;

    const layers = blueprint.components.map((component, index) => {
        const baseLayer = {
            id: randomUUID(),
            z_index: index + 1,
            visible: true,
            locked: false,

            position: getDefaultPosition(component.type, index),

            constraints: {
                editable: component.type === "text",
                regenerable: component.type !== "text",
                resize_behavior: "wrap" as const,
            },

            provenance: {
                created_by: "designer_agent" as const,
                source_agent: "DesignerAgent.v1",
                confidence: 0.8,
                last_updated: new Date().toISOString(),
            },
        };

        switch (component.type) {
            case "background":
                return {
                    ...baseLayer,
                    type: "background" as const,
                    role: "base" as const,
                    z_index: 0,

                    content: {
                        background_type: "solid" as const,
                        colors: ["#44218bff"],
                    },

                    style: {
                        noise: "none" as const,
                        blur: 0,
                    },
                };

            case "text":
                return {
                    ...baseLayer,
                    type: "text" as const,
                    role: (component.id === "headline" ? "headline" : "body") as "headline" | "body",

                    content: {
                        text: "Sample Text",
                        max_chars: component.constraints?.max_chars,
                    },

                    style: {
                        font_category: "sans-serif" as const,
                        font_weight: "bold" as const,
                        font_size: 64,
                        line_height: 1.1,
                        letter_spacing: -1,
                        color: "#ae1a1aff",
                        alignment: "center" as const,
                        text_transform: "none" as const,
                    },
                };

            case "image":
                return {
                    ...baseLayer,
                    type: "image" as const,
                    role: "product" as const,

                    content: {
                        asset_id: "placeholder-image",
                        source: "ai_generated" as const,
                        alt_text: "Generated visual",
                    },

                    style: {
                        object_fit: "contain" as const,
                        shadow: "soft" as const,
                        border_radius: 0,
                    },
                };

            default:
                throw new Error(`Unsupported component type: ${component.type}`);
        }
    });

    return {
        schema_version: "1.0",

        canvas: {
            id: randomUUID(),
            platform: blueprint.canvas.platform as any,
            width: canvasWidth,
            height: canvasHeight,
            background_color: "#0f9f3cff",
            safe_area: {
                top: 108,
                bottom: 108,
                left: 86,
                right: 86,
            },
        },

        layers,

        global_constraints: {
            brand_locked: false,
            contrast_min_ratio: 4.5,
        },

        metadata: {
            brand_id: "unknown",
            campaign_id: "draft",
            created_from: "ai",
            confidence_score: 0.8,
            created_at: new Date().toISOString(),
        },
    };
}
