"use client";

import { useState, useEffect } from "react";
import { CanvasState, CanvasLayer } from "@repo/schemas";
import { LayerRenderer } from "./LayerRenderer";

export function CanvasRoot({
    canvasState: initialState,
    brandDNA,
}: {
    canvasState: CanvasState;
    brandDNA: any;
}) {
    const [canvasState, setCanvasState] =
        useState<CanvasState>(initialState);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.__BRAND_DNA__ = brandDNA;
        }
    }, [brandDNA]);

    function updateLayer(layerId: string, patch: Partial<CanvasLayer>) {
        setCanvasState((prev) => ({
            ...prev,
            layers: prev.layers.map((layer) =>
                layer.id === layerId ? ({ ...layer, ...patch } as CanvasLayer) : layer
            ),
        }));
    }

    return (
        <div
            style={{
                width: canvasState.canvas.width,
                height: canvasState.canvas.height,
                position: "relative",
                backgroundColor: canvasState.canvas.background_color,
                transform: "scale(0.6)",
                transformOrigin: "top left",
            }}
        >
            {canvasState.layers
                .filter((l) => l.visible)
                .sort((a, b) => a.z_index - b.z_index)
                .map((layer) => (
                    <LayerRenderer
                        key={layer.id}
                        layer={layer}
                        onUpdate={updateLayer}
                    />
                ))}
        </div>
    );
}
