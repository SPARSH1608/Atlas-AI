import { NextRequest, NextResponse } from "next/server";
import { getVisualAgent } from "../../../../server/agents/registry";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const agent = getVisualAgent();

    const result = await agent.run(
        {
            role: body.role,
            // brandDNA: body.brandDNA,
            canvas: body.canvas,
            userIntent: body.userIntent,
        },
        { requestId: crypto.randomUUID() }
    );

    return NextResponse.json(result.data);
}
