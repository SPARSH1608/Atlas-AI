import { z } from "zod";

const PositionSchema = z.object({
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1),
    width: z.number().min(0).max(1),
    height: z.number().min(0).max(1),
    rotation: z.number().default(0),
});

const LayerConstraintsSchema = z.object({
    editable: z.boolean(),
    regenerable: z.boolean(),
    resize_behavior: z.enum(["scale", "wrap", "fixed"]),
});


const BaseLayerSchema = z.object({
    id: z.string(),
    type: z.enum(["background", "text", "image", "shape", "group"]),
    role: z.enum([
        "base",
        "headline",
        "body",
        "product",
        "cta",
        "decoration",
        "logo",
    ]),
    z_index: z.number(),

    visible: z.boolean(),
    locked: z.boolean(),

    position: PositionSchema,
    constraints: LayerConstraintsSchema,

    provenance: z.object({
        created_by: z.enum([
            "designer_agent",
            "copy_agent",
            "visual_agent",
            "design_composition_agent",
            "design_finalizer_agent",
            "user",
        ]),
        source_agent: z.string(),
        confidence: z.number().min(0).max(1),
        last_updated: z.string(),
    }),
});

const BackgroundLayerSchema = BaseLayerSchema.extend({
    type: z.literal("background"),

    content: z.object({
        background_type: z.enum(["solid", "gradient", "image"]),
        colors: z.array(z.string()).optional(),
        asset_id: z.string().optional(),
        url: z.string().optional(),
        alt_text: z.string().optional(),
    }),

    style: z.object({
        noise: z.enum(["none", "subtle"]),
        blur: z.number(),
    }),
});

const TextLayerSchema = BaseLayerSchema.extend({
    type: z.literal("text"),

    content: z.object({
        text: z.string(),
        max_chars: z.number().optional(),
    }),

    style: z.object({
        font_family: z.string().optional(),
        font_category: z.enum(["sans-serif", "serif", "display"]),
        font_weight: z.enum(["light", "regular", "bold"]),
        font_size: z.number(),
        line_height: z.number(),
        letter_spacing: z.number(),
        color: z.string(),
        alignment: z.enum(["left", "center", "right"]),
        text_transform: z.enum(["none", "uppercase", "lowercase"]),
    }),
});


const ImageLayerSchema = BaseLayerSchema.extend({
    type: z.literal("image"),

    content: z.object({
        asset_id: z.string(),
        source: z.enum(["ai_generated", "user_upload"]),
        alt_text: z.string(),
        url: z.string().optional(),
    }),

    style: z.object({
        object_fit: z.enum(["contain", "cover"]),
        shadow: z.enum(["none", "soft", "hard"]),
        border_radius: z.number(),
    }),
});

const ShapeLayerSchema = BaseLayerSchema.extend({
    type: z.literal("shape"),

    content: z.object({
        text: z.string().optional(),
    }),

    style: z.object({
        shape: z.enum(["rounded_rect", "pill", "circle"]),
        background_color: z.string(),
        text_color: z.string().optional(),
        padding: z.object({
            x: z.number(),
            y: z.number(),
        }),
    }),
});

const GroupLayerSchema = BaseLayerSchema.extend({
    type: z.literal("group"),

    content: z.object({
        children: z.array(z.string()),
    }),

    style: z.object({}).optional(),
});

export const CanvasLayerSchema = z.discriminatedUnion("type", [
    BackgroundLayerSchema,
    TextLayerSchema,
    ImageLayerSchema,
    ShapeLayerSchema,
    GroupLayerSchema,
]);

export type CanvasLayer = z.infer<typeof CanvasLayerSchema>;

export const CanvasSchema = z.object({
    id: z.string(),
    platform: z.enum(["instagram", "facebook", "banner", "poster"]),
    width: z.number(),
    height: z.number(),
    background_color: z.string(),

    safe_area: z.object({
        top: z.number(),
        bottom: z.number(),
        left: z.number(),
        right: z.number(),
    }),
});

export const CanvasStateSchema = z.object({
    schema_version: z.literal("1.0"),

    canvas: CanvasSchema,
    layers: z.array(CanvasLayerSchema),

    global_constraints: z.object({
        brand_locked: z.boolean(),
        contrast_min_ratio: z.number(),
    }),

    metadata: z.object({
        brand_id: z.string(),
        campaign_id: z.string(),
        created_from: z.enum(["ai", "user", "reference"]),
        confidence_score: z.number().min(0).max(1),
        created_at: z.string(),
    }),
});

export type CanvasState = z.infer<typeof CanvasStateSchema>;
