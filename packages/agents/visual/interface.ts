import { Agent } from "../base/agent";
import { VisualAsset } from "@repo/schemas";

export interface VisualAgentInput {
    role: "product" | "hero" | "background";
    // brandDNA removed - VisualAgent is execution only
    canvas: { width: number; height: number };
    userIntent?: string;
    productName?: string;
    physicalDescription?: string;
}

export type VisualAgent = Agent<VisualAgentInput, VisualAsset>;
