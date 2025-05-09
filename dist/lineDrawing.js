import { Point } from "./point.js";
const PI = Math.PI;
const _2PI = Math.PI * 2;
class DrawClass {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
    }
    makePolygon(sides, center, initialRotation, radius) {
        let angleIncrement = _2PI / sides;
        let offset = initialRotation + angleIncrement;
        let points = [];
        for (let i = 1; i <= sides; i++) {
            points.push(new Point(center.x + (radius * Math.cos(offset)), center.y + (radius * Math.sin(offset))));
            offset += angleIncrement;
        }
        //drawing
        let firstP = points.shift();
        points.push(firstP);
        this.ctx.beginPath();
        this.ctx.moveTo(firstP.x, firstP.y);
        for (let p of points) {
            this.ctx.lineTo(p.x, p.y);
        }
        this.ctx.stroke();
        this.ctx.closePath();
    }
    getSideLength(sides, radius) {
        return 2 * radius * Math.sin(PI / sides);
    }
}
const canvas = document.getElementById("canvas1");
canvas.width = 500;
canvas.height = 500;
let CENTER = new Point(canvas.width / 2, canvas.height / 2);
let radius = 150;
let initialRotation = 3 * PI / 4;
let angleIncrement = _2PI / 3;
const d = new DrawClass(canvas);
