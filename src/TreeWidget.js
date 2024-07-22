import EdgeWidget from "./EdgeWidget";
import { VERTEX_RADIUS } from "./tree";
import VertexWidget from "./VertexWidget";

export default function TreeWidget({ tree, vertexHighlight, edgeHighlight, onMouseEnter, onMouseOut, onClick, clearClick,
     cursor, legend, legendHeight }) {
    if (tree == null) {
        return (
            <svg></svg>
        )
    }
    let vertices = [];
    for (let i = 1; i <= tree.n; i++) {
        vertices.push((
            <VertexWidget key={i} cpos={tree.pos[i]} id={i} r={VERTEX_RADIUS} shape={tree.vertexShape[i]}
                highlightLevel={vertexHighlight[i]} onMouseEnter={() => onMouseEnter(i)} onClick={() => onClick(i)}
                onMouseOut={() => onMouseOut(i)} cursor={cursor}></VertexWidget>
        ))
    }
    let edges = [];
    for (let i = 0; i < tree.n - 1; i++) {
        edges.push((
            <EdgeWidget key={i} pos1={tree.pos[tree.edges[i][0]]} pos2={tree.pos[tree.edges[i][1]]}
                isBold={tree.boldEdge[i]} highlightLevel={edgeHighlight[i]}></EdgeWidget>
        ))
    }
    return (
        <svg width={tree.width} height={tree.height + legendHeight + 25} onClick={clearClick} style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            border: "1px solid black",
            borderRadius: 5,
        }}>
            <g id="edge">
                {edges}
            </g>
            <g id="vertex">
                {vertices}
            </g>
            <g id="legend">
                {legend}
            </g>
        </svg>
    )
}