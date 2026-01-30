# AI Ad Generator

An autonomous multi-agent system that autonomously generates high-quality, on-brand advertising creatives from simple product descriptions.

## 🤖 Agent Architecture

The system is composed of specialized AI agents, each simulating a specific role in a creative agency:

| Agent | Role | Function |
|-------|------|----------|
| **Product Research Agent** | *The Strategist* | Analyzes raw input (text/images) to understand the product's core value, category, and key selling points. |
| **Brand Intelligence Agent** | *The Brand Manager* | Determines the brand personality, archetype, target audience, and tone of voice based on the product data. |
| **Design Composition Agent** | *The Researcher* | (Optional) Analyzes reference images provided by the user to extract stylistic preferences (mood, color palettes, spacing). |
| **Designer Agent** | *The Creative Director* | Synthesizes research and brand data to create a **Design Blueprint**. This acts as a wireframe, defining the layout strategy and component positions. |
| **Design Finalizer Agent** | *The Art Director* | Takes the abstract blueprint and commits to **Final Design Decisions** (Manifest). Chooses exact hex codes, specific fonts, final copy, and concrete image concepts. |
| **Copy Agent** | *The Copywriter* | Writes and refines text content (headlines, body, CTAs) to match the brand's voice and the specific context of the ad layer. |
| **Visual Agent** | *The Illustrator/Photographer* | Generates high-fidelity visual assets (product shots, backgrounds) based on the specific concepts defined by the Finalizer. |

## 🔄 The Creative Pipeline

The agents collaborate in a sequential pipeline to transform a concept into a final render:

1.  **Input Processing**: User provides a product description and optional reference images.
2.  **Research Phase**:
    *   `ProductResearchAgent` extracts structured product facts.
    *   `BrandIntelligenceAgent` derives a brand identity.
3.  **Design Phase**:
    *   `DesignerAgent` creates a `DesignBlueprint` (abstract layout).
    *   `DesignFinalizerAgent` reviews the blueprint and produces a `DesignManifest` (concrete style guide), ensuring all decisions are finalized before rendering.
4.  **Assembler Phase**:
    *   The system maps the *Blueprint* and *Manifest* into a `CanvasState` (a JSON representation of the editable ad).
5.  **Execution Phase** (Parallel):
    *   `CopyAgent` populates text layers with finalized copy.
    *   `VisualAgent` generates image assets for background and product layers, strictly adhering to the concepts in the *Manifest*.
6.  **Rendering**: The final `CanvasState` is rendered on the frontend, allowing for real-time editing and export.

## 🛠️ Tech Stack

*   **Framework**: Next.js (React)
*   **Language**: TypeScript
*   **AI Orchestration**: Custom Agent Framework (relying on OpenAI models)
*   **Validation**: Zod Schemas (ensuring strict structured outputs)
*   **State Management**: JSON-based Canvas State

## 🚀 Getting Started

1.  Ensure generic web-safe fonts (Arial, Helvetica, etc.) or supported local fonts (Geist) are used.
2.  Run the development server:
    ```bash
    npm run dev
    # or
    bun run dev
    ```
3.  Access the canvas at `/canvas` or the creative generation API at `/api/creative`.
