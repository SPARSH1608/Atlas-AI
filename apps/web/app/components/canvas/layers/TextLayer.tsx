"use client";

import { CanvasLayer } from "@repo/schemas";

export function TextLayer({
    layer,
    onUpdate,
}: {
    layer: CanvasLayer;
    onUpdate: (id: string, patch: Partial<CanvasLayer>) => void;
}) {
    if (layer.type !== "text") return null;

    const { position, style, content, constraints } = layer;

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
            contentEditable={constraints.editable}
            suppressContentEditableWarning
            onBlur={handleBlur}
        >
            {content.text}
        </div>
    );
}
