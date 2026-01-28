import { Agent } from "../base/agent";
import { CopyVariant } from "@repo/schemas";

export interface CopyAgentInput {
    text: string;
    role: "headline" | "body" | "cta";
    brandDNA: any;
}

export type CopyAgent = Agent<
    CopyAgentInput,
    CopyVariant
>;
