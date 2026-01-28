import { BrandIntelligenceAgent, ProductResearchAgent, DesignerAgent } from "@repo/agents";

// mocks
import { MockDesignerAgent, MockBrandIntelligenceAgent, MockProductResearchAgent } from "@repo/agents";

// real
import { DesignerAgentImpl, BrandIntelligenceAgentImpl, ProductResearchAgentImpl } from "@repo/agents"

const USE_MOCKS = process.env.USE_MOCK_AGENTS === "true";
console.log("Using mock agents:", USE_MOCKS);

export function getProductResearchAgent(): ProductResearchAgent {
    return USE_MOCKS
        ? MockProductResearchAgent
        : ProductResearchAgentImpl;
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
