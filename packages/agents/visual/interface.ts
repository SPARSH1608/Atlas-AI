import { Agent } from "../base/agent";
import { VisualAsset } from "@repo/schemas";

export interface VisualAgentInput {
    role: "product" | "hero" | "background";
    brandDNA: any;
    canvas: { width: number; height: number };
}

export type VisualAgent = Agent<VisualAgentInput, VisualAsset>;
