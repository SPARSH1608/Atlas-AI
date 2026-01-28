import { CanvasLayer } from "@repo/schemas";

export function ShapeLayer({ layer }: { layer: CanvasLayer }) {
    if (layer.type !== "shape") return null;

    const { position, style, content } = layer;

    const css: React.CSSProperties = {
        position: "absolute",
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`,
        width: `${position.width * 100}%`,
        height: `${position.height * 100}%`,
        backgroundColor: style.background_color,
        color: style.text_color,
        borderRadius: style.shape === "pill" ? 999 : 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: layer.z_index,
    };

    return <div style={css}>{content.text}</div>;
}
