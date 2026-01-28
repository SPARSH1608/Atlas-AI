import { NextRequest, NextResponse } from "next/server";
import { CopyAgentImpl } from "@repo/agents"
import { getCopyAgent } from "../../../../server/agents/registry";
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const result = await getCopyAgent().run(
            {
                text: body.text,
                role: body.role,
                brandDNA: body.brandDNA,
            },
            { requestId: crypto.randomUUID() }
        );

        return NextResponse.json(result.data);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
