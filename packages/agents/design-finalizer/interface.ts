import { DesignManifest } from "@repo/schemas";

export interface DesignFinalizerInput {
    product: any;
    brand: any;
    blueprint: any;
}

export interface DesignFinalizerAgent {
    run(
        input: DesignFinalizerInput,
        ctx: { requestId: string }
    ): Promise<{
        data: DesignManifest;
        meta: {
            agentName: string;
            agentVersion: string;
            confidence: number;
        };
    }>;
}
