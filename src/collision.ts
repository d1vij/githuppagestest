import { Point, Vector, _2PI, randint, randomColor, _2Dobject } from "./utils.js";

// collision.html 

window.addEventListener("resize", () => {
    _2Dobject.canvas.width = window.innerWidth;
    _2Dobject.canvas.height = window.innerHeight
})


const canvas = document.getElementById('c') as HTMLCanvasElement
const ctx = canvas.getContext('2d');
_2Dobject.canvas = canvas


console.log()
let balls: _2Dobject[] = []
let ballcount = 2;

let radius = 30;

function setup() {
    while (balls.length < ballcount) {
        let pos = new Vector(randint(30, canvas.width - 30), randint(30, canvas.height - 30));

        if (!balls.some((ball) => {
            let centerDistance = Vector.distance(pos, ball.pos)
            return centerDistance < radius + ball.radius;
        })) {
            let vel = new Vector(randint(-300, 300), randint(-300, 300));
            balls.push(new _2Dobject(pos, vel, radius, 2, randomColor()))
        }

    }
}



let lasttime = 0
let deltaTime = 0

function animate(curTime) {
    canvas.getContext('2d').clearRect(0, 0, _2Dobject.canvas.width, _2Dobject.canvas.height)
    requestAnimationFrame(animate);

    deltaTime = (curTime - lasttime) / 1000;
    lasttime = curTime;

    balls.forEach(b => {
        
        b.update(deltaTime);
        for(let)
        
        b.draw
        for (let anotherBall of balls) {
            if (anotherBall !== b) {
                
                ctx.beginPath()
                ctx.moveTo(b.pos.x, b.pos.y);
                ctx.lineTo(anotherBall.pos.x, anotherBall.pos.y);
                ctx.stroke()
                let d = Vector.distance(b.pos, anotherBall.pos);
                ctx.font = "30px Arial"
                ctx.strokeText(Math.round(d).toString(), 0, 25)
            }
        }

    })
}


_2Dobject.canvas.width = window.innerWidth;
_2Dobject.canvas.height = window.innerHeight

console.log("helo")
console.log(balls)
setup()
animate(0)
