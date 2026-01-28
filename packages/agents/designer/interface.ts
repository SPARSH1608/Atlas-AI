import { Agent } from "../base/agent";
import { DesignBlueprint } from "@repo/schemas";
import { BrandDNA } from "@repo/schemas";

export interface DesignerAgentInput {
    brandDNA: BrandDNA;
    platform: "instagram" | "poster" | "banner";
}

export type DesignerAgent = Agent<
    DesignerAgentInput,
    DesignBlueprint
>;
