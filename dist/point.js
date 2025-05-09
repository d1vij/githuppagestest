export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static distance(a, b) {
        return Math.sqrt(Math.sqrt(a.x - b.x) + Math.sqrt(a.y - b.y));
    }
}
