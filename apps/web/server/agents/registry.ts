import { BrandIntelligenceAgent, ProductResearchAgent, DesignerAgent, MockDesignCompositionAgent, DesignCompositionAgentImpl, DesignCompositionAgent, DesignFinalizerAgent } from "@repo/agents";

// mocks
import { MockDesignerAgent, MockBrandIntelligenceAgent, MockProductResearchAgent, MockDesignFinalizerAgent } from "@repo/agents";

// real
import { DesignerAgentImpl, BrandIntelligenceAgentImpl, ProductResearchAgentImpl } from "@repo/agents"
import { CopyAgentImpl, MockCopyAgent, CopyAgent } from "@repo/agents"
import { VisualAgentImpl, MockVisualAgent, VisualAgent } from "@repo/agents"
import { DesignFinalizerAgentImpl } from "@repo/agents"
const USE_MOCKS = process.env.USE_MOCK_AGENTS === "true";
console.log("Using mock agents:", USE_MOCKS);

export function getProductResearchAgent(): ProductResearchAgent {
    return USE_MOCKS
        ? MockProductResearchAgent
        : ProductResearchAgentImpl;
}

export function getCopyAgent(): CopyAgent {
    return USE_MOCKS
        ? MockCopyAgent
        : CopyAgentImpl;
}

export function getVisualAgent(): VisualAgent {
    return USE_MOCKS
        ? MockVisualAgent
        : VisualAgentImpl;
}
export function getBrandIntelligenceAgent(): BrandIntelligenceAgent {
    return USE_MOCKS
        ? MockBrandIntelligenceAgent
        : BrandIntelligenceAgentImpl;
}

export function getDesignerAgent(): DesignerAgent {
    return USE_MOCKS
        ? MockDesignerAgent
        : DesignerAgentImpl;
}

export function getDesignFinalizerAgent(): DesignFinalizerAgent {
    return USE_MOCKS
        ? MockDesignFinalizerAgent
        : DesignFinalizerAgentImpl;
}

export function getDesignCompositionAgent(): DesignCompositionAgent {
    return USE_MOCKS
        ? MockDesignCompositionAgent
        : DesignCompositionAgentImpl;
}
