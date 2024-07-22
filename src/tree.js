import DisjointSetUnion from "./disjointSetUnion";

export const N_LIMIT = 20;
export const VERTEX_RADIUS = 14;
export const VERTEX_SPACING_X = VERTEX_RADIUS * 3.5;
export const VERTEX_SPACING_Y = VERTEX_RADIUS * 4;
export const VERTEX_MARGIN_X = VERTEX_SPACING_X;
export const VERTEX_MARGIN_Y = VERTEX_RADIUS * 2.5;

export default class Tree {
    constructor(n, edges, r, vertexShape = null) {
        this.n = n;
        this.edges = edges;
        this.r = r;
        if (vertexShape == null) {
            this.vertexShape = new Array(n + 1);
            for (let i = 1; i <= n; i++) {
                this.vertexShape[i] = "circle";
            }
        } else {
            this.vertexShape = vertexShape;
        }
        this.adj = new Array(n + 1);
        for (let i = 1; i <= n; i++) {
            this.adj[i] = [];
        }
        this.boldEdge = new Array(n - 1);
        for (let i = 0; i < n - 1; i++) {
            const [u, v] = edges[i];
            this.adj[u].push([v, i]);
            this.adj[v].push([u, i]);
            this.boldEdge[i] = false;
        }
        this.p = new Array(n + 1);
        this.sub = new Array(n + 1);
        this.p[r] = [0, -1];
        this.root(r, 0);
        this.pos = new Array(n + 1);
        this.height = 0;
        this.width = this.getPos(r, VERTEX_MARGIN_X, VERTEX_MARGIN_Y) + VERTEX_MARGIN_X;
    }
    root(u, p) {
        let pid = -1;
        for (let i = 0; i < this.adj[u].length; i++) {
            if (this.adj[u][i][0] === p) {
                pid = i;
                break;
            }
        }
        if (pid !== -1) {
            this.adj[u].splice(pid, 1);
        }
        this.sub[u] = 1;
        for (const [v, i] of this.adj[u]) {
            this.p[v] = [u, i];
            this.root(v, u);
            this.sub[u] += this.sub[v];
        }
    }
    hld(u) {
        if (this.adj[u].length) {
            this.boldEdge[this.adj[u][0][1]] = true;
        }
        for (let i = 1; i < this.adj[u].length; i++) {
            if (this.sub[this.adj[u][i][0]] > this.sub[this.adj[u][0][0]]) {
                [this.adj[u][0], this.adj[u][i]] = [this.adj[u][i], this.adj[u][0]];
            }
        }
        for (const [v,] of this.adj[u]) {
            this.hld(v);
        }
    }
    getPos(u, left, height) {
        this.height = Math.max(this.height, height + VERTEX_MARGIN_Y);
        if (!this.adj[u].length) {
            this.pos[u] = { x: left, y: height };
            return left;
        }
        let pr = left;
        let first = -1;
        let last = -1;
        for (const [v,] of this.adj[u]) {
            pr = this.getPos(v, pr, height + VERTEX_SPACING_Y) + VERTEX_SPACING_X;
            if (first === -1) {
                first = this.pos[v].x;
            }
            last = this.pos[v].x;
        }
        pr -= VERTEX_SPACING_X;
        this.pos[u] = { x: (first + last) / 2, y: height };
        return pr;
    }
}

export function stringToTree(s) {
    if (!s) {
        throw Error("");
    }
    let lines = s.split(/\r?\n/).map(x => x.trim());
    while (lines.length && !lines[lines.length - 1]) {
        lines.pop();
    }
    if (!lines.length) {
        throw Error("");
    }
    if (!isNumeric(lines[0])) {
        throw Error("First line should contain a single integer \\(n\\)");
    }
    const n = parseInt(lines[0]);
    if (n < 1 || n > N_LIMIT) {
        throw Error(`First line should contain a single integer \\(n\\) that is between \\(1\\) and \\(${N_LIMIT}\\)`)
    }
    if (lines.length !== n) {
        throw Error("Input should contain exactly \\(n\\) lines");
    }
    const edges = lines.slice(1, n).map((line, id) => {
        const uv = line.split(/\s+/);
        if (uv.length !== 2) {
            throw Error(`Line ${id + 2} should contain two space-separated integers`);
        }
        return uv.map(x_str => {
            if (!isNumeric(x_str)) {
                throw Error(`Line ${id + 2} should contain two space-separated integers`);
            }
            const x = parseInt(x_str);
            if (x < 1 || x > n) {
                throw Error(`Line ${id + 2} should contain two integers that are between \\(1\\) and \\(n\\)`);
            }
            return x;
        });
    })
    let dsu = new DisjointSetUnion(n);
    for (const [u, v] of edges) {
        if (!dsu.join(u, v)) {
            throw Error('The edges should form a tree');
        }
    }
    return new Tree(n, edges, 1);
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

export function getStaticTopTree(tree) {
    tree.hld(tree.r);
    let ptr = tree.n + 1;
    let eg = [];
    let vIsPath = new Array(ptr), cVertex = new Array(ptr), cEdge = new Array(ptr);
    for (let i = 1; i < ptr; i++) {
        vIsPath[i] = false;
        cVertex[i] = [];
        cEdge[i] = [];
    }
    function addEdge(u, v) {
        eg.push([u, v]);
        for (const x of cVertex[v]) {
            cVertex[u].push(x);
        }
        for (const x of cEdge[v]) {
            cEdge[u].push(x);
        }
    }
    function add(u, isPath, l, r) {
        if (u >= vIsPath.length) {
            vIsPath.push(false);
            cVertex.push([]);
            cEdge.push([]);
        }
        vIsPath[u] = isPath;
        addEdge(u, l);
        if (r) {
            addEdge(u, r);
        }
    }
    function merge(stk, isPath) {
        if (stk.length === 1) {
            return stk[0];
        }
        let sm = 0;
        for (const [, s] of stk) {
            sm += s;
        }
        let l = [], r = [];
        for (const [u, s] of stk) {
            (sm > s ? l : r).push([u, s]);
            sm -= s * 2;
        }
        const [lu, ls] = merge(l, isPath);
        const [ru, rs] = merge(r, isPath);
        add(ptr, isPath, lu, ru);
        if (isPath) {
            cEdge[ptr].push(tree.p[cVertex[ru][0]][1]);
        }
        return [ptr++, ls + rs + 1];
    }
    function buildPath(u) {
        let stk = [buildVertex(u)]
        while (tree.adj[u].length) {
            u = tree.adj[u][0][0];
            stk.push(buildVertex(u));
        }
        return merge(stk, true);
    }
    function buildVertex(u) {
        cVertex[u].push(u);
        if (tree.adj[u].length < 2) {
            vIsPath[u] = true;
            return [u, 1];
        }
        let stk = [];
        for (let i = 1; i < tree.adj[u].length; i++) {
            stk.push(buildEdge(tree.adj[u][i][0]))
        }
        const [v, s] = merge(stk, false);
        add(u, true, v, 0);
        return [u, s + 1];
    }
    function buildEdge(u) {
        const [v, s] = buildPath(u);
        add(ptr, false, v, 0);
        cEdge[ptr].push(tree.p[u][1]);
        return [ptr++, s + 1];
    }
    const nr = buildPath(tree.r)[0];
    return [new Tree(ptr - 1, eg, nr, vIsPath.map(x => x ? "square" : "circle")), cVertex, cEdge];
}