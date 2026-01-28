import { CreativePipelineInput, CreativePipelineResult } from "../types/creative";

import {
    getBrandIntelligenceAgent, getDesignerAgent, getProductResearchAgent,
} from "../agents/registry";
import { AgentContext } from "@repo/agents";
import { mapBlueprintToCanvas } from "../mappers/blueprintToCanvas";
export async function runCreativePipeline(
    input: CreativePipelineInput
): Promise<CreativePipelineResult> {
    const context: AgentContext = {
        requestId: crypto.randomUUID(),
    };

    // Product Research
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

    // Brand Intelligence
    const brandIntelligenceResult =
        await getBrandIntelligenceAgent().run(
            {
                productFacts: productResearchResult.data,
            },
            context
        );

    // Designer
    const designerResult =
        await getDesignerAgent().run(
            {
                brandDNA: brandIntelligenceResult.data,
                platform: input.platform,
            },
            context
        );

    const canvasState = mapBlueprintToCanvas(designerResult.data)

    return {
        productFacts: productResearchResult.data,
        brandDNA: brandIntelligenceResult.data,
        designBlueprint: designerResult.data,
        canvasState: canvasState,
    };
}
