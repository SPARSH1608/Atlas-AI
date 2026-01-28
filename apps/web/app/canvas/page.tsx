import { CanvasRoot } from "../components/canvas/CanvasRoot";

export default async function CanvasPage() {
    const res = await fetch("http://localhost:3000/api/creative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            productText: "Premium brunch restaurant",
            platform: "poster",
        }),
        cache: "no-store",
    });

    const data = await res.json();

    return (
        <div style={{ padding: 40 }}>
            <CanvasRoot canvasState={data.canvasState} brandDNA={data.brandDNA} />
        </div>
    );
}
