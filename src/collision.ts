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

let radius = 50;

function setup() {
    balls.push(new _2Dobject(new Vector(150,150),new Vector(100,100),100,100,"red"))
    balls.push(new _2Dobject(new Vector(500,500),new Vector(-100,100),100,1,"blue"))
}




let lasttime = 0
let deltaTime = 0
function animate(curTime) {
    canvas.getContext('2d').clearRect(0, 0, _2Dobject.canvas.width, _2Dobject.canvas.height)
    requestAnimationFrame(animate);

    deltaTime = (curTime - lasttime) / 1000;
    lasttime = curTime;

    balls.forEach(b => {
        
        
        for (let anotherBall of balls) {
            if (anotherBall !== b) {
                let d = Vector.distance(b.pos, anotherBall.pos) - b.radius - anotherBall.radius;
                if(d<=0){
                    _2Dobject.collisionResolution(b,anotherBall);
                }
                
            }
        }
        b.update(deltaTime);
        b.draw()

    })
}


_2Dobject.canvas.width = window.innerWidth;
_2Dobject.canvas.height = window.innerHeight

console.log("helo")
console.log(balls)
setup()
animate(0)
