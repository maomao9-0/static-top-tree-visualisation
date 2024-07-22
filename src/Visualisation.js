import StaticTopTreeColumn from "./StaticTopTreeColumn";
import { getStaticTopTree } from "./tree";
import TreeColumn from "./TreeColumn"
import { useImmer } from "use-immer";
import { enableMapSet } from "immer";

export default function Visualisation({ tree }) {
    enableMapSet();
    const [selected, updateSelected] = useImmer(new Map());
    if (tree == null) {
        return (
            <div />
        )
    }

    const [staticTopTree, cVertex, cEdge] = getStaticTopTree(tree);

    let treeVertexHighlight = new Array(tree.n + 1);
    for (let i = 1; i <= tree.n; i++) {
        treeVertexHighlight[i] = 0;
    }
    let treeEdgeHighlight = new Array(tree.n - 1);
    for (let i = 0; i < tree.n - 1; i++) {
        treeEdgeHighlight[i] = 0;
    }

    for (const [i, mask] of selected) {
        for (const u of cVertex[i]) {
            treeVertexHighlight[u] |= mask;
        }
        for (const u of cEdge[i]) {
            treeEdgeHighlight[u] |= mask;
        }
    }

    let staticTopTreeHighlight = new Array(staticTopTree.n + 1);
    for (let i = 1; i <= staticTopTree.n; i++) {
        staticTopTreeHighlight[i] = 0;
        if (selected.has(i)) {
            staticTopTreeHighlight[i] = selected.get(i);
        }
    }
    function onMouseEnter(i) {
        updateSelected(draft => {
            if (!draft.has(i)) {
                draft.set(i, 1);
            } else {
                draft.set(i, draft.get(i) | 1);
            }
        });
    }
    function onMouseOut(i) {
        updateSelected(draft => {
            if (draft.has(i)) {
                const nv = draft.get(i) & 2;
                if (nv === 0) {
                    draft.delete(i);
                } else {
                    draft.set(i, nv);
                }
            }
        });
    }
    function onClick(i) {
        updateSelected(draft => {
            if (!draft.has(i)) {
                draft.set(i, 2);
            } else {
                const nv = draft.get(i) ^ 2;
                if (nv === 0) {
                    draft.delete(i);
                } else {
                    draft.set(i, nv);
                }
            }
        });
    }
    function clearClick() {
        updateSelected(draft => new Map());
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
        }}>
            <TreeColumn tree={tree} vertexHighlight={treeVertexHighlight} edgeHighlight={treeEdgeHighlight} />
            <StaticTopTreeColumn tree={staticTopTree} vertexHighlight={staticTopTreeHighlight}
                onMouseEnter={onMouseEnter} onMouseOut={onMouseOut} onClick={onClick} clearClick={clearClick} />
        </div>
    )
}