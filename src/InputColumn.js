import { useEffect } from "react";
import { N_LIMIT, stringToTree } from "./tree";

export default function InputColumn({ width, rawInput, setRawInput }) {
    let errorMsg = "";
    try {
        stringToTree(rawInput);
    } catch (err) {
        errorMsg = err.message;
    }

    useEffect(() => {
        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }
    }, [errorMsg]);

    return (
        <div style={{
            width: width,
            marginRight: 32,
            flexShrink: 0,
        }}>
            <h2>Input</h2>
            <textarea style={{
                width: '100%',
                height: 350
            }} value={rawInput} onChange={e => setRawInput(e.target.value)}></textarea>
            <p className="error">{errorMsg}</p>
            <p>The first line should contain a single integer \(n\) (\(1 \le n \le {N_LIMIT}\)) — the number of vertices.</p>
            <p>Each of the next \(n - 1\) lines should contain two space-separated integers \(u, v\) (\(1 \le u, v \le n\)) — the
                endpoints of the edges in the tree.</p>
        </div>
    )
}