import { NextRequest, NextResponse } from "next/server";
import {
    getProductResearchAgent,
    getBrandIntelligenceAgent,
    getDesignerAgent,
    getDesignCompositionAgent,
    getCopyAgent,
    getVisualAgent,
    getDesignFinalizerAgent,
} from "../../../server/agents/registry";
import { extractDesignPreferences } from "../../../server/utils/extractDesignPreferences";
import { mapBlueprintToCanvas } from "../../../server/mappers/blueprintToCanvas";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const ctx = { requestId: crypto.randomUUID() };

    // 1. Product research
    const product = await getProductResearchAgent().run(
        { productText: body.productDescription },
        ctx
    );
    console.log("Product: ", product);
    // 2. Brand intelligence
    const brand = await getBrandIntelligenceAgent().run(
        { productFacts: product.data },
        ctx
    );
    console.log("Brand: ", brand);

    // 3. Reference image analysis (PREFERENCES)
    let designPreferences: string | undefined;

    if (body.referenceImages?.length) {
        const compositions = await Promise.all(
            body.referenceImages.map((url: string) =>
                getDesignCompositionAgent().run(
                    { imageUrl: url, platform: body.platform },
                    ctx
                )
            )
        );

        designPreferences = extractDesignPreferences(
            compositions.map((c) => c.data)
        );
    }
    console.log("Design Preferences: ", designPreferences);

    // 4. Designer agent (FINAL INTENT)
    const blueprint = await getDesignerAgent().run(
        {
            product: product.data,
            brand: brand.data,
            designPreferences,
            platform: body.platform,
        },
        ctx
    );
    console.log("Blueprint: ", blueprint);
    // 4b. Design Finalizer
    const manifest = await getDesignFinalizerAgent().run({
        product: product.data,
        brand: brand.data,
        blueprint: blueprint.data
    }, ctx);
    console.log("Manifest: ", manifest);

    // 5. Blueprint → Canvas
    const canvasState = mapBlueprintToCanvas(blueprint.data, manifest.data);

    // 6. Generate Content (Parallel)
    await Promise.all(
        canvasState.layers.map(async (layer) => {
            // Text Generation
            if (layer.type === "text") {
                const copy = await getCopyAgent().run(
                    {
                        text: layer.content.text,
                        role: layer.role as "headline" | "body" | "cta",
                        brandDNA: brand.data,
                    },
                    ctx
                );
                layer.content.text = copy.data.rewritten_text;
            }

            // Image Generation
            if ((layer.type === "image" && layer.role !== "logo") || layer.type === "background") {
                // Skip logo for now or handle differently if needed
                const visual = await getVisualAgent().run(
                    {
                        role: layer.role as "product" | "hero" | "background",
                        canvas: {
                            width: canvasState.canvas.width,
                            height: canvasState.canvas.height,
                        },
                        userIntent:
                            layer.type === "image" || layer.type === "background"
                                ? (layer.content as any).alt_text
                                : undefined,
                        productName: product.data.product_identity.name,
                        physicalDescription: product.data.solution_overview.core_function, // fallback description
                    },
                    ctx
                );

                if (layer.type === "image") {
                    layer.content.asset_id = visual.data.asset_id;
                    layer.content.source = "ai_generated";
                    layer.content.alt_text = visual.data.prompt_used;
                    if (visual.data.url) {
                        layer.content.url = visual.data.url;
                    }
                } else if (layer.type === "background") {
                    layer.content.asset_id = visual.data.asset_id;
                    layer.content.background_type = "image";
                    if (visual.data.url) {
                        layer.content.url = visual.data.url;
                    }
                }
            }
        })
    );

    console.log("Canvas State: ", canvasState);
    return NextResponse.json({ canvasState, brandDNA: brand.data });
}
