import { Point, Vector } from "./utils.js";
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const _2PI = Math.PI * 2;
canvas.height = 500;
canvas.width = window.innerWidth;
// document.getElementsByTagName("input")[0].addEventListener('input', (e) => {
//     // @ts-ignore
//     document.getElementById('out').textContent = e.target.value;
//     //@ts-ignore
//     makeBalls(e.target.value);
// })
window.addEventListener('resize', (e) => {
    canvas.width = window.innerWidth;
    canvas.height = 500;
});
const randomColor = () => `rgb(${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)})`;
class Ball {
    constructor(x, y, dx, dy, radius, color, ctx) {
        this.pos = new Point(x, y);
        this.veloctiy = new Vector(dx, dy); // velocity is the rate at which object's position changes
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, _2PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.stroke();
    }
    update() {
        //gravity
        if ((this.pos.y + this.veloctiy.y) + this.radius >= canvas.height) {
            //ie body will collide with ground the next frame
            this.veloctiy.y = -this.veloctiy.y * cRestitution.y; // friction is the loss of energy/velocity post collision
        }
        else {
            //body is in air
            //accelerate downwards
            this.veloctiy.y += gV.y;
        }
        //horizontal bounce
        if (this.pos.x + this.veloctiy.x + this.radius >= canvas.width || this.pos.x + this.veloctiy.x - this.radius <= 0) {
            //collision with walls
            this.veloctiy.x = -this.veloctiy.x * cRestitution.x;
        }
        else {
            // this.veloctiy.x += gV.x
        }
        this.pos.x += this.veloctiy.x;
        this.pos.y += this.veloctiy.y;
    }
}
function randRange(min, max) {
    return min + Math.random() * max;
}
let ballcount = 5000;
const gV = new Vector(0, 0.5);
const cRestitution = new Vector(1, 1); //how much energy is retained per collision
function makeBalls() {
    let balls = [];
    for (let i = 1; i <= ballcount; i++) {
        let x = randRange(10, canvas.width - 10);
        let y = randRange(0, 250);
        let dx = randRange(-10, 10);
        let dy = randRange(3, 7);
        let radius = 15;
        balls.push(new Ball(x, y, dx, dy, radius, randomColor(), ctx));
    }
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach(ball => {
            ball.draw();
            ball.update();
        });
    }
    animate();
}
makeBalls();
document.getElementById('reset').addEventListener('click', makeBalls);
