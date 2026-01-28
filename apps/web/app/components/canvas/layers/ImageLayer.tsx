"use client";
import { CanvasLayer } from "@repo/schemas";

export function ImageLayer({
    layer,
    onUpdate,
}: {
    layer: CanvasLayer;
    onUpdate: (id: string, patch: Partial<CanvasLayer>) => void;
}) {
    if (layer.type !== "image") return null;

    const { position, content, style } = layer;

    async function generate() {
        const res = await fetch("/api/visual/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                role: layer.role === "product" ? "product" : "hero",
                brandDNA: (window as any).__BRAND_DNA__,
                canvas: { width: 1080, height: 1080 },
            }),
        });

        const data = await res.json();

        onUpdate(layer.id, {
            content: {
                ...content,
                asset_id: data.asset_id,
                source: "ai_generated",
            },
        });
    }

    return (
        <div
            style={{
                position: "absolute",
                left: `${position.x * 100}%`,
                top: `${position.y * 100}%`,
                width: `${position.width * 100}%`,
                height: `${position.height * 100}%`,
                zIndex: layer.z_index,
            }}
        >
            <img
                src={`/placeholder.png`}
                alt={content.alt_text}
                style={{ width: "100%", height: "100%", objectFit: style.object_fit }}
            />
            <button
                onClick={generate}
                style={{ position: "absolute", top: -24, right: 0, fontSize: 10 }}
            >
                Generate Image
            </button>
        </div>
    );
}
