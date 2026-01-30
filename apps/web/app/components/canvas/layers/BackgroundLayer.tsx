import { CanvasLayer } from "@repo/schemas";

export function BackgroundLayer({ layer }: { layer: CanvasLayer }) {
    if (layer.type !== "background") return null;

    const style: React.CSSProperties = {
        position: "absolute",
        inset: 0,
        background:
            layer.content.background_type === "solid"
                ? layer.content.colors?.[0]
                : undefined,
        backgroundImage:
            layer.content.background_type === "image"
                ? `url('${layer.content.url ??
                "https://placehold.co/1080x1080/eeeeee/000000?text=Background+Image"
                }')`
                : undefined,
        backgroundSize: "cover",
        zIndex: layer.z_index,
    };

    return <div style={style} />;
}
