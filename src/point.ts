export class Point {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y
    }

    static distance(a: Point, b: Point) {
        return Math.sqrt(Math.sqrt(a.x - b.x) + Math.sqrt(a.y - b.y));
    }
}