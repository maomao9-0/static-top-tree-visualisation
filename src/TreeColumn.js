import TreeWidget from "./TreeWidget";

export default function TreeColumn({ tree, vertexHighlight, edgeHighlight }) {
    const legend = (
        <>
            <text x={tree.width - 80} y={tree.height} fontFamily="'PT Sans', sans-serif" fontSize="14" dy=".35em"
                fontWeight="bold" textDecoration="underline">Legend</text>
            <line x1={tree.width - 80} y1={tree.height + 20} x2={tree.width - 60} y2={tree.height + 20}
                stroke="#333" strokeWidth={4}></line>
            <text x={tree.width - 50} y={tree.height + 20} fontFamily="'PT Sans', sans-serif" fontSize="14" dy=".35em">Heavy</text>
            <line x1={tree.width - 80} y1={tree.height + 40} x2={tree.width - 60} y2={tree.height + 40}
                stroke="#333" strokeWidth={2}></line>
            <text x={tree.width - 50} y={tree.height + 40} fontFamily="'PT Sans', sans-serif" fontSize="14" dy=".35em">Light</text>
        </>
    )
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            // width: "50%",
            // height: "100%",
            paddingRight: 16,
        }}>
            <h2>Tree</h2>
            <div style={{
                overflow: "auto",
            }}>
                <TreeWidget tree={tree} vertexHighlight={vertexHighlight} edgeHighlight={edgeHighlight} onMouseEnter={(i) => { }}
                    onMouseOut={(i) => { }} onClick={(i) => { }} cursor="default" legend={legend} legendHeight={40} />
            </div>
        </div>
    );
}