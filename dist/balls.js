import { Point, Velocity } from "./utils.js";
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
const gV = new Velocity(0, 0.1);
const friction = 1;
class Circle {
    constructor(x, y, dx, dy, radius, color, ctx) {
        this.pos = new Point(x, y);
        this.veloctiy = new Velocity(dx, dy); // velocity is the rate at which object's position changes
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
            this.veloctiy.y = -this.veloctiy.y; // fr
        }
        else {
            //body is in air
            //accelerate downwards
            this.veloctiy.y += gV.y;
        }
        this.pos.x += this.veloctiy.x;
        this.pos.y += this.veloctiy.y;
    }
}
const p1 = new Circle(canvas.width / 2, canvas.height / 2, 0, 2, 15, "pink", ctx);
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    p1.draw();
    p1.update();
}
animate();
// function makeBalls(count) {
//     let balls: Circle[] = []
//     for (let i = 1; i <= count; i++) {
//         let radius = 10
//         let x = Math.random() * (canvas.width - radius * 2) + radius
//         let y = Math.random() * (canvas.height - radius * 2) + radius
//         let dx = Math.random() - 0.5;
//         let dy = Math.random() - 0.5;
//         let color = randomColor()
//         balls.push(new Circle(x, y, dx, dy, radius, color, ctx))
//     }
//     animate(0)
//     function animate(timestamp) {
//         requestAnimationFrame(animate);
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         balls.forEach(ball => ball.draw())
//         balls.forEach(ball => ball.update())
//     }
//     s`ss`
// }
