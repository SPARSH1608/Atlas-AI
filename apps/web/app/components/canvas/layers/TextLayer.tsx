"use client";

import { CanvasLayer } from "@repo/schemas";
import { useState } from "react";

export function TextLayer({
    layer,
    onUpdate,
    readonly,
}: {
    layer: CanvasLayer;
    onUpdate: (id: string, patch: Partial<CanvasLayer>) => void;
    readonly?: boolean;
}) {
    if (layer.type !== "text") return null;

    const { position, style, content, constraints } = layer;
    const [intent, setIntent] = useState<string>("");
    function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
        const newText = e.currentTarget.innerText;

        if (newText !== content.text) {
            onUpdate(layer.id, {
                content: {
                    ...content,
                    text: newText,
                },
            });
        }
    }

    const css: React.CSSProperties = {
        position: "absolute",
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`,
        width: `${position.width * 100}%`,
        height: `${position.height * 100}%`,
        fontFamily: style.font_family,
        fontSize: style.font_size,
        fontWeight: style.font_weight,
        color: style.color,
        textAlign: style.alignment,
        lineHeight: style.line_height,
        letterSpacing: style.letter_spacing,
        zIndex: layer.z_index,
        outline: "none",
        cursor: constraints.editable ? "text" : "default",
    };

    return (
        <div
            style={css}
            contentEditable={constraints.editable && !readonly}
            suppressContentEditableWarning
            onBlur={handleBlur}
        >
            {!readonly && (
                <>
                    <button
                        style={{
                            position: "absolute",
                            top: -24,
                            right: 0,
                            fontSize: 10,
                        }}
                        onClick={async () => {
                            const res = await fetch("/api/copy/rewrite", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    text: content.text,
                                    role: layer.role,
                                    brandDNA: (window as any).__BRAND_DNA__,
                                    userIntent: intent,
                                }),
                            });

                            const data = await res.json();

                            onUpdate(layer.id, {
                                content: {
                                    ...content,
                                    text: data.rewritten_text,
                                },
                            });
                        }}
                    >
                        Rewrite
                    </button>
                    <input
                        placeholder="Optional: e.g. more confident, shorter"
                        value={intent}
                        onChange={(e) => setIntent(e.target.value)}
                        style={{ fontSize: 10, width: "100%" }}
                    />
                </>
            )}

            {content.text}
        </div>
    );
}
