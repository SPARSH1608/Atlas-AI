import { NextRequest, NextResponse } from "next/server";
import { getDesignCompositionAgent } from "../../../../server/agents/registry";
import { mapBlueprintToCanvas } from "../../../../server/mappers/blueprintToCanvas";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const agent = getDesignCompositionAgent();

    const result = await agent.run(
        {
            imageUrl: body.imageUrl,
            platform: body.platform,
            intentHint: body.intentHint,
        },
        { requestId: crypto.randomUUID() }
    );

    const canvasState = mapBlueprintToCanvas(result.data);

    return NextResponse.json({
        canvasState,
    });
}
