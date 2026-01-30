"use client";

import { useState } from "react";
import { CanvasRoot } from "../components/canvas/CanvasRoot";

export default function DesignTestPage() {
    const [canvasState, setCanvasState] = useState(null);

    async function test() {
        const res = await fetch("/api/design/compose", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                imageUrl: "https://dummyimage.com/1080x1080",
                platform: "instagram",
            }),
        });

        const data = await res.json();
        setCanvasState(data.canvasState);
    }

    return (
        <div>
            <button onClick={test}>Test Reference Design</button>
            {canvasState && <CanvasRoot canvasState={canvasState} brandDNA={{}} />}
        </div>
    );
}
