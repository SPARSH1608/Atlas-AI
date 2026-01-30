import { Agent } from "../base/agent";
import { DesignBlueprint } from "@repo/schemas";

export interface DesignCompositionInput {
    imageUrl: string;
    platform: "instagram" | "poster" | "banner";

    intentHint?: string;
}

export type DesignCompositionAgent = Agent<
    DesignCompositionInput,
    DesignBlueprint
>;
