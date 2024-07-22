import TreeWidget from "./TreeWidget";

export default function StaticTopTreeColumn({ tree, vertexHighlight, onMouseEnter, onMouseOut, onClick, clearClick }) {
    let edgeHighlight = new Array(tree.n - 1);
    for (let i = 0; i < tree.n - 1; i++) {
        edgeHighlight[i] = 0;
    }
    const legend = (
        <>
            <text x={tree.width - 80} y={tree.height} fontFamily="'PT Sans', sans-serif" fontSize="14" dy=".35em"
                fontWeight="bold" textDecoration="underline">Legend</text>
            <rect x={tree.width - 78} y={tree.height + 16} fill="#eee" stroke="#333"
                strokeWidth="2" height={16} width={16} />
            <text x={tree.width - 50} y={tree.height + 22} fontFamily="'PT Sans', sans-serif" fontSize="14" dy=".35em">Path</text>
            <circle cx={tree.width - 70} cy={tree.height + 48} fill="#eee" stroke="#333"
                strokeWidth="2" r={8} />
            <text x={tree.width - 50} y={tree.height + 48} fontFamily="'PT Sans', sans-serif" fontSize="14" dy=".35em">Point</text>
        </>
    )
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 0,
            // width: "50%",
            // height: "100%",
            paddingRight: 16,
        }}>
            <h2>Static Top Tree</h2>
            <div style={{
                overflow: "auto",
            }}>
                <TreeWidget tree={tree} vertexHighlight={vertexHighlight} edgeHighlight={edgeHighlight} onMouseEnter={onMouseEnter}
                    onMouseOut={onMouseOut} onClick={onClick} clearClick={clearClick} cursor="pointer"
                    legend={legend} legendHeight={48} />
                <div style={{ width: Math.max(tree.width, 300) }}>
                    <p>Click the vertices of the static top tree to see which vertices it is responsible for on the original tree.</p>
                    <p>Click multiple vertices to see the union of the vertices that they are responsible for.</p>
                    <p>Click a selected vertex to unselect it. Alternatively, click anywhere in the rectangle to unselect all vertices.</p>
                </div>
            </div>
        </div>
    );
}