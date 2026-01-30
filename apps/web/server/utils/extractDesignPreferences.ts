import { DesignBlueprint } from "@repo/schemas";

export function extractDesignPreferences(
    blueprints: DesignBlueprint[]
): string {
    if (!blueprints.length) return "";

    const layouts = blueprints.map((b) => b.layout_strategy);
    const mostCommonLayout =
        layouts.sort(
            (a, b) =>
                layouts.filter((v) => v === a).length -
                layouts.filter((v) => v === b).length
        ).pop() ?? "centered_hierarchy";

    const avgHeadlineImportance =
        blueprints
            .flatMap((b) =>
                b.components.filter((c) => c.role === "headline")
            )
            .reduce((s, c) => s + (c.importance ?? 0), 0) /
        Math.max(1, blueprints.length);

    return `
User design preferences inferred from reference ads:
- Preferred layout style: ${mostCommonLayout}
- Headline prominence: ${avgHeadlineImportance > 0.7 ? "high" : "moderate"
        }
- These are stylistic preferences, not strict rules.
`;
}
