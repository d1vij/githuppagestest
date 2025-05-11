import { Vector, _2PI } from "./utils.js";
const canvas = document.getElementById("c");
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
let p1 = new Vector(250, 250);
let p2 = new Vector(100, 100);
let p3 = new Vector(400, 300);
function draw(deltatime) {
    let distancep1p2 = Math.round(Vector.distance(p1, p2));
    let surfacedistance = distancep1p2 - 130;
    ctx.strokeText(`p1p2 Distance ${distancep1p2}`, 10, 40);
    ctx.strokeText(`surface distance ${surfacedistance <= 0 ? "collision" : surfacedistance}`, 10, 60);
    ctx.strokeText(`p3p2 Distance ${Math.round(Vector.distance(p2, p3) - 60)}`, 300, 10);
    ctx.strokeText(`p1p3 Distance ${Vector.distance(p3, p1)}`, 300, 30);
    // p1
    ctx.beginPath();
    ctx.arc(p1.x, p1.y, 100, 0, _2PI, false);
    ctx.fillStyle = surfacedistance <= 0 ? '#ff5a36' : "#4827cc";
    ctx.fill();
    ctx.strokeText("p1", p1.x, p1.y - 10);
    //p2
    ctx.beginPath();
    ctx.arc(p2.x, p2.y, 30, 0, _2PI, false);
    ctx.fillStyle = "#9afd82";
    ctx.fill();
    ctx.strokeText("p2", p2.x, p2.y - 10);
    // p3
    ctx.beginPath();
    ctx.arc(p3.x, p3.y, 30, 0, _2PI, false);
    ctx.fillStyle = '#ffd9e4';
    ctx.fill();
    ctx.strokeText("p3", p3.x, p3.y - 10);
    //p1p2
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    //p1p3
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.stroke();
    //p2p3
    ctx.beginPath();
    ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.stroke();
}
// window.addEventListener('mousemove', (e) => {
//     ctx.clearRect(0,0,canvas.width, canvas.height)
//     e.preventDefault();
//     p2.x = e.x - canvas.getBoundingClientRect().x ;
//     p2.y = e.y - canvas.getBoundingClientRect().y ;
//     draw()
let lasttime = 0;
// })
let dx = 150;
let dy = 200;
let fpsinterval = 1000 / 60;
function animate(timestamp) {
    requestAnimationFrame(animate);
    if (timestamp - lasttime < fpsinterval)
        return;
    const deltatime = (timestamp - lasttime) / 1000;
    lasttime = timestamp;
    console.log(deltatime);
    ctx.clearRect(0, 0, 500, 500);
    p2.x += dx * deltatime;
    p2.y += dy * deltatime;
    if (p2.x + 30 >= canvas.width || p2.x - 30 <= 0) {
        dx = -dx;
    }
    if (p2.y + 30 >= canvas.height || p2.y - 30 <= 0) {
        dy = -dy;
    }
    draw(deltatime);
}
animate(0);
