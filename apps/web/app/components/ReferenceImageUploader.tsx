"use client";

import { useState } from "react";

interface Props {
    value: string[];
    onChange: (urls: string[]) => void;
}

export function ReferenceImageUploader({ value, onChange }: Props) {
    const [url, setUrl] = useState("");

    function addImage() {
        if (!url) return;
        onChange([...value, url]);
        setUrl("");
    }

    function removeImage(index: number) {
        onChange(value.filter((_, i) => i !== index));
    }

    return (
        <div>
            <h3>Reference ads you like (optional)</h3>
            <p style={{ opacity: 0.7 }}>
                Used as inspiration only. We won’t copy these designs.
            </p>

            <div style={{ display: "flex", gap: 8 }}>
                <input
                    placeholder="Paste image URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button onClick={addImage}>Add</button>
            </div>

            <ul>
                {value.map((img, i) => (
                    <li key={i}>
                        {img}
                        <button onClick={() => removeImage(i)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
