// TODO: Verify DesignFinalizer usage
import { DesignBlueprint, DesignManifest } from "@repo/schemas";
import { CanvasState } from "@repo/schemas";
import { randomUUID } from "crypto";


function getDefaultPosition(
    type: "background" | "text" | "image" | "shape",
    index: number
) {
    switch (type) {
        case "background":
            return { x: 0, y: 0, width: 1, height: 1, rotation: 0 };

        case "text":
            return {
                x: 0.1,
                y: 0.15 + index * 0.12,
                width: 0.8,
                height: 0.1,
                rotation: 0,
            };

        case "image":
            return {
                x: 0.1,
                y: 0.35,
                width: 0.8,
                height: 0.4,
                rotation: 0,
            };

        default:
            return {
                x: 0.1,
                y: 0.1,
                width: 0.8,
                height: 0.2,
                rotation: 0,
            };
    }
}

export function mapBlueprintToCanvas(
    blueprint: DesignBlueprint,
    manifest: DesignManifest
): CanvasState {
    const canvasWidth = 1080;
    const canvasHeight = 1080;

    const components = [...blueprint.components].sort(
        (a, b) => (b.importance ?? 0) - (a.importance ?? 0)
    );

    const layers = components.map((component, index) => {
        const baseLayer = {
            id: randomUUID(),
            z_index: component.type === "background" ? 0 : 100 - index,
            visible: true,
            locked: false,

            position: getDefaultPosition(component.type, index),

            constraints: {
                editable: component.type === "text",
                regenerable: component.type !== "background",
                resize_behavior: "wrap" as const,
            },

            provenance: {
                created_by: "design_finalizer_agent" as const,
                source_agent: "DesignFinalizerAgent.v1",
                confidence: component.importance ?? 0.9,
                last_updated: new Date().toISOString(),
            },
        };

        if (component.type === "background") {
            const hasBackgroundImage = !!manifest.visuals.background_image;
            return {
                ...baseLayer,
                type: "background" as const,
                role: "base" as const,

                content: {
                    background_type: (hasBackgroundImage ? "image" : "solid") as "image" | "solid",
                    colors: [manifest.theme.background_color],
                    alt_text: hasBackgroundImage
                        ? `Background: ${manifest.visuals.background_image?.concept}. Style: ${manifest.visuals.background_image?.style}`
                        : undefined,
                    asset_id: hasBackgroundImage ? "pending_generation" : undefined,
                },

                style: {
                    noise: "none" as const,
                    blur: 0,
                },
            };
        }

        if (component.type === "text") {
            let textContent = "Placeholder";
            let font = manifest.typography.body_font;
            let color = manifest.theme.primary_color; // default

            if (component.role === "headline") {
                textContent = manifest.copy.headline;
                font = manifest.typography.headline_font;
                color = manifest.theme.primary_color;
            } else if (component.role === "cta") {
                textContent = manifest.copy.cta;
                font = manifest.typography.cta_font;
                color = manifest.theme.secondary_color;
            } else if (component.role === "body") {
                textContent = manifest.copy.body;
                font = manifest.typography.body_font;
                color = manifest.theme.primary_color; // or secondary
            }

            return {
                ...baseLayer,
                type: "text" as const,
                role: component.role,

                content: {
                    text: textContent,
                    max_chars: component.constraints?.max_chars ?? undefined,
                },

                style: {
                    font_family: font, // Apply the specific font choice
                    font_category: "sans-serif" as const,
                    font_weight: (component.role === "headline" ? "bold" : "regular") as "bold" | "regular",
                    font_size: component.role === "headline" ? 64 : 32,
                    line_height: 1.2,
                    letter_spacing: 0,
                    color: color,
                    alignment:
                        component.constraints?.alignment ?? "center",
                    text_transform: "none" as const,
                },
            };
        }

        if (component.type === "image") {
            let altText = "Image";
            let assetId = "pending_generation";

            if (component.role === "product") {
                altText = `Product: ${manifest.visuals.product_image.concept}. Style: ${manifest.visuals.product_image.style}`;
            } else if (component.role === "base") {
                if (manifest.visuals.background_image) {
                    altText = `Background: ${manifest.visuals.background_image.concept}. Style: ${manifest.visuals.background_image.style}`;
                }
            } else if (component.role === "decoration") {
                // SAFETY: Prevent generic "Image" prompt which causes hallucinations
                altText = "Abstract minimal geometric graphic element, flat vector style, simple shape, no photos.";
            } else if (component.role === "logo") {
                altText = "Brand Logo placeholder, simple, flat vector.";
            }

            return {
                ...baseLayer,
                type: "image" as const,
                role: component.role,

                content: {
                    asset_id: assetId,
                    source: "ai_generated" as const,
                    alt_text: altText,
                },

                style: {
                    object_fit: "contain" as const,
                    shadow: "none" as const,
                    border_radius: 0,
                },
            };
        }

        if (component.type === "shape") {
            return {
                ...baseLayer,
                type: "image" as const,
                role: "decoration" as const,

                content: {
                    asset_id: "shape_placeholder",
                    source: "ai_generated" as const,
                    alt_text: "Decorative shape",
                },

                style: {
                    object_fit: "contain" as const,
                    shadow: "none" as const,
                    border_radius: 0,
                },
            };
        }

        throw new Error(`Unsupported component type: ${component.type}`);
    });

    return {
        schema_version: "1.0",

        canvas: {
            id: randomUUID(),
            platform: blueprint.canvas.platform,
            width: canvasWidth,
            height: canvasHeight,

            background_color: manifest.theme.background_color,

            safe_area: {
                top: canvasHeight * 0.1,
                bottom: canvasHeight * 0.1,
                left: canvasWidth * 0.08,
                right: canvasWidth * 0.08,
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
            created_from: "reference",
            confidence_score: 0.9,
            created_at: new Date().toISOString(),
        },
    };
}
