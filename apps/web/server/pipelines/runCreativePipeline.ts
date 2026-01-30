import { CreativePipelineInput, CreativePipelineResult } from "../types/creative";

import {
    getBrandIntelligenceAgent, getDesignerAgent, getProductResearchAgent, getDesignFinalizerAgent,
} from "../agents/registry";
import { AgentContext } from "@repo/agents";
import { mapBlueprintToCanvas } from "../mappers/blueprintToCanvas";
export async function runCreativePipeline(
    input: CreativePipelineInput
): Promise<CreativePipelineResult> {
    const context: AgentContext = {
        requestId: crypto.randomUUID(),
    };
    const productResearchResult =
        await getProductResearchAgent().run(
            {
                productText: input.productText,
                productImages: input.productImages,
                websiteUrl: input.websiteUrl,
                categoryHint: input.categoryHint,
            },
            context
        );

    const brandIntelligenceResult =
        await getBrandIntelligenceAgent().run(
            {
                productFacts: productResearchResult.data,
            },
            context
        );

    const designerResult =
        await getDesignerAgent().run(
            {
                brand: brandIntelligenceResult.data,
                product: productResearchResult.data,
                platform: input.platform,
            },
            context
        );

    // 4. Design Finalizer (Decide)
    const finalizerInput = {
        product: productResearchResult.data,
        brand: brandIntelligenceResult.data,
        blueprint: designerResult.data,
    };

    const agents = {
        product: getProductResearchAgent(),
        brand: getBrandIntelligenceAgent(),
        designer: getDesignerAgent(),
        designFinalizer: getDesignFinalizerAgent(),
    };

    console.log("Running design finalizer...");
    const manifestRes = await getDesignFinalizerAgent().run(finalizerInput, {
        requestId: context.requestId,
    });

    // 5. Map to Canvas (Render)
    const canvasState = await mapBlueprintToCanvas(
        designerResult.data,
        manifestRes.data // Pass the manifest!
    );

    return {
        productFacts: productResearchResult.data,
        brandDNA: brandIntelligenceResult.data,
        designBlueprint: designerResult.data,
        canvasState,
        designManifest: manifestRes.data,
    };
}
