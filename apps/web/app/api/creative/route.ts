import { NextRequest, NextResponse } from "next/server";
import { runCreativePipeline } from "../../../server/pipelines/runCreativePipeline";
import { CreativePipelineInputSchema } from "../../../server/types/creative";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const validatedBody = CreativePipelineInputSchema.parse(body)
        if (!validatedBody.productText && !validatedBody.productImages && !validatedBody.websiteUrl) {
            return NextResponse.json({ error: 'Please provide at least one of productText, productImages, or websiteUrl' }, { status: 400 })
        }
        const result = await runCreativePipeline(validatedBody)
        console.log('result', result)
        return NextResponse.json(result, { status: 200 })
    }
    catch (error: any) {
        console.log('error in creative pipeline', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}