"use client";
import { CanvasLayer } from "@repo/schemas";
import { useState } from "react";

export function ImageLayer({
    ...props
}: {
    layer: CanvasLayer;
    onUpdate: (id: string, patch: Partial<CanvasLayer>) => void;
    readonly?: boolean;
}) {
    const { layer, onUpdate } = props;
    if (layer.type !== "image") return null;

    const { position, content, style } = layer;
    const { readonly } = props;
    const [intent, setIntent] = useState<string>("");
    async function generate() {
        const res = await fetch("/api/visual/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                role: layer.role === "product" ? "product" : "hero",
                // brandDNA: (window as any).__BRAND_DNA__, // VisualAgent no longer needs this
                canvas: { width: 1080, height: 1080 },
                userIntent: intent || content.alt_text, // Use manifest decision if no user override
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
                src={
                    content.url
                        ? content.url
                        : content.source === "ai_generated" && content.alt_text
                            ? `https://placehold.co/800x600/2a2a2a/ffffff?text=${encodeURIComponent(
                                content.alt_text.slice(0, 50) + "..."
                            )}`
                            : "/placeholder.png"
                }
                alt={content.alt_text}
                style={{ width: "100%", height: "100%", objectFit: style.object_fit }}
            />
            {/* Only show controls if not in read-only mode */}
            {!readonly && (
                <>
                    <textarea
                        placeholder="Optional: e.g. moody lighting, minimalist background"
                        value={intent}
                        onChange={(e) => setIntent(e.target.value)}
                        style={{ fontSize: 10, width: "100%" }}
                    />
                    <button
                        onClick={generate}
                        style={{ position: "absolute", top: -24, right: 0, fontSize: 10 }}
                    >
                        Generate Image
                    </button>
                </>
            )}
        </div>
    );
}
