export default class DisjointSetUnion {
    constructor(n) {
        this.n = n;
        this.p = new Array(n + 1);
        this.sz = new Array(n + 1);
        for (let i = 1; i <= n; i++) {
            this.p[i] = i;
            this.sz[i] = 1;
        }
    }
    findp(i) {
        if (this.p[i] === i) {
            return i;
        }
        return this.p[i] = this.findp(this.p[i]);
    }
    join(a, b) {
        let pa = this.findp(a), pb = this.findp(b);
        if (pa === pb) {
            return false;
        }
        if (this.sz[pa] < this.sz[pb]) {
            [pa, pb] = [pb, pa];
        }
        this.sz[pa] += this.sz[pb];
        this.p[pb] = pa;
        return true;
    }
}