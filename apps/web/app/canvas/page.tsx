"use client";
import { useEffect, useState } from "react";
import { CanvasRoot } from "../components/canvas/CanvasRoot";
import { useSearchParams } from "next/navigation";

export default function CanvasPage() {
    const searchParams = useSearchParams();
    const readonly = searchParams.get("readonly") === "true";
    const [canvasState, setCanvasState] = useState(null);
    const [brandDNA, setBrandDNA] = useState(null);

    useEffect(() => {
        const storedCanvasState = localStorage.getItem("ad_canvas_state");
        const storedBrandDNA = localStorage.getItem("ad_brand_dna");

        if (storedCanvasState) {
            setCanvasState(JSON.parse(storedCanvasState));
        }
        if (storedBrandDNA) {
            setBrandDNA(JSON.parse(storedBrandDNA));
        }
    }, []);

    if (!canvasState) return <div>Loading canvas...</div>;

    return (
        <div style={{ padding: 40 }}>
            <CanvasRoot canvasState={canvasState} brandDNA={brandDNA} readonly={readonly} />
        </div>
    );
}
