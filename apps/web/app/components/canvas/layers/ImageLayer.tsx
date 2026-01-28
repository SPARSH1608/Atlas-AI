import { CanvasLayer } from "@repo/schemas";

export function ImageLayer({ layer }: { layer: CanvasLayer }) {
    if (layer.type !== "image") return null;

    const { position, content, style } = layer;

    const wrapperStyle: React.CSSProperties = {
        position: "absolute",
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`,
        width: `${position.width * 100}%`,
        height: `${position.height * 100}%`,
        zIndex: layer.z_index,
    };

    return (
        <div style={wrapperStyle}>
            <img
                src={`/placeholder.png`} // TEMP placeholder
                alt={content.alt_text}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: style.object_fit,
                }}
            />
        </div>
    );
}
