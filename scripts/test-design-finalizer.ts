// scripts/test-design-finalizer.ts
import { DesignFinalizerAgentImpl } from "../packages/agents/design-finalizer/real";
import { mapBlueprintToCanvas } from "../apps/web/server/mappers/blueprintToCanvas";
import { DesignBlueprint, BrandDNA, ProductFacts } from "../packages/schemas";

// Mock Data (Casting to any to avoid filling entire complex schema for test)
const mockProduct: any = {
    name: "Maggi Masala Noodles",
    description: "2-minute instant noodles with spicy masala flavor.",
    key_benefits: ["Fast", "Tasty", "Spicy"],
    category: "Food",
    price_range: "Cheap",
};

const mockBrand: any = {
    name: "Maggi",
    tone_voice: ["Fun", "Energetic", "Warm"],
    colors: ["#FFD700", "#FF0000"],
    visual_style: ["Bright", "Appetizing"],
    core_values: ["Happiness", "Convenience"],
    audience: ["Youth", "Families"],
};

const mockBlueprint: any = {
    schema_version: "1.0",
    canvas: { width: 1080, height: 1080, platform: "instagram" },
    layout: { strategy: "centered", grid_system: "1col" },
    components: [
        { id: "1", type: "background", role: "base", importance: 1.0, constraints: {} },
        { id: "2", type: "image", role: "product", importance: 0.9, constraints: {} },
        { id: "3", type: "text", role: "headline", importance: 0.8, constraints: {} },
        { id: "4", type: "text", role: "cta", importance: 0.7, constraints: {} },
    ],
    rationale: "Simple centered layout for high impact.",
};

async function runTest() {
    console.log("---------------------------------------------------");
    console.log("TESTING DESIGN FINALIZER AGENT");
    console.log("---------------------------------------------------");

    try {
        // 1. Run Design Finalizer
        console.log("Running DesignFinalizerAgent...");
        const manifestRes = await DesignFinalizerAgentImpl.run(
            {
                product: mockProduct,
                brand: mockBrand,
                blueprint: mockBlueprint,
            },
            { requestId: "test-run" }
        );

        console.log("\n>>> Design Manifest Generated:");
        console.log(JSON.stringify(manifestRes.data, null, 2));

        // 2. Run Mapper (Blueprint + Manifest -> Canvas)
        console.log("\nRunning mapBlueprintToCanvas...");
        const canvasState = mapBlueprintToCanvas(mockBlueprint, manifestRes.data);

        console.log("\n>>> Canvas State Generated:");
        console.log("Canvas Background:", canvasState.canvas.background_color);
        console.log("Layers:", canvasState.layers.length);

        canvasState.layers.forEach((layer, i) => {
            console.log(`\nLayer ${i} (${layer.type} - ${layer.role}):`);
            if (layer.type === "text") {
                console.log(`  Text: "${layer.content.text}"`);
                console.log(`  Color: ${layer.style.color}`);
                console.log(`  Font: ${layer.style.font_weight} (Category: ${layer.style.font_category})`);
            } else if (layer.type === "image") {
                console.log(`  Alt Text (Concept): "${layer.content.alt_text}"`);
            } else if (layer.type === "background") {
                console.log(`  Color: ${layer.content.colors?.[0]}`);
            }
        });

        console.log("\n---------------------------------------------------");
        console.log("TEST COMPLETED SUCCESSFULLY");
        console.log("---------------------------------------------------");

    } catch (error) {
        console.error("\nTEST FAILED:", error);
    }
}

runTest();
