import { Agent } from "../base/agent";
import { DesignBlueprint } from "@repo/schemas";
import { BrandDNA } from "@repo/schemas";
export interface DesignerAgentInput {
    product: any;
    brand: any;
    platform: "instagram" | "poster" | "banner";
    designPreferences?: string;
}


export type DesignerAgent = Agent<
    DesignerAgentInput,
    DesignBlueprint
>;
