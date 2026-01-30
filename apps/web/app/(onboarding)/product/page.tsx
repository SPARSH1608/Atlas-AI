"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReferenceImageUploader } from "../../components/ReferenceImageUploader";

export default function ProductPage() {
    const router = useRouter();
    const [product, setProduct] = useState("");
    const [references, setReferences] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    async function submit() {
        setLoading(true);

        const res = await fetch("/api/creative", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productDescription: product,
                platform: "instagram",
                referenceImages: references,
            }),
        });

        const data = await res.json();

        localStorage.setItem("ad_canvas_state", JSON.stringify(data.canvasState));
        localStorage.setItem("ad_brand_dna", JSON.stringify(data.brandDNA));

        setLoading(false);
        router.push("/canvas");
    }

    return (
        <div>
            <h1>Create your ad</h1>

            <textarea
                placeholder="Describe your product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
            />

            <ReferenceImageUploader
                value={references}
                onChange={setReferences}
            />

            <button onClick={submit} disabled={loading}>
                Generate Ad
            </button>
        </div>
    );
}
