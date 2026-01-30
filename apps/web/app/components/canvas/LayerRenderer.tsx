import { CanvasLayer } from "@repo/schemas";
import { BackgroundLayer } from "./layers/BackgroundLayer";
import { TextLayer } from "./layers/TextLayer";
import { ImageLayer } from "./layers/ImageLayer";
import { ShapeLayer } from "./layers/ShapeLayer";

export function LayerRenderer({
    layer,
    onUpdate,
    readonly,
}: {
    layer: CanvasLayer;
    onUpdate: (id: string, patch: Partial<CanvasLayer>) => void;
    readonly?: boolean;
}) {
    switch (layer.type) {
        case "background":
            return <BackgroundLayer layer={layer} />;
        case "text":
            return (
                <TextLayer
                    layer={layer}
                    onUpdate={onUpdate}
                    readonly={readonly}
                />
            );
        case "image":
            return <ImageLayer layer={layer} onUpdate={onUpdate} readonly={readonly} />;
        case "shape":
            return <ShapeLayer layer={layer} />;
        default:
            return null;
    }
}
