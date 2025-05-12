import { Point, Vector, _2PI, randint, randomColor } from "./utils.js";

 class _2Dobject {
    pos: Vector;
    vel: Vector;
    mass: number
    radius: any;
    color: any;
    ctx: CanvasRenderingContext2D
    wallCollisionFriction: Vector
    accn: Vector
    opacity:number;

    static canvas = document.getElementById('c') as HTMLCanvasElement;

    static accn = new Vector(randint(-3, 3), randint(-3, 3)); //set class level or instance level
    static _e = new Vector(1, 1); //coefficient of restituion, ratio of final velocity to initial velocity before collision
    // 0<=_e <= 1 -> 0 full loss of energy on collision, 1 no loss of energy on collision

    public constructor(position: Vector, velocity: Vector, radius: number, mass: number, color: string=null, accn: Vector = null, wallCollisionFriction: Vector = null) {
        this.pos = position;
        this.vel = velocity
        this.mass = mass
        this.radius = radius
        this.color = color;
        this.ctx = _2Dobject.canvas.getContext('2d');
        this.opacity = 0.1
        this.accn = accn || _2Dobject.accn
        this.wallCollisionFriction = wallCollisionFriction || _2Dobject._e

    }

    public draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, _2PI, false);
        this.ctx.globalAlpha = this.opacity
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = this.color
        this.ctx.fill()
        this.ctx.globalAlpha = 1;
        this.ctx.stroke();
    }

    public update(deltatime) {
        //delta time comes from animation loop

        let nextX = this.pos.x + (this.vel.x * deltatime)//positions of Next frame/second
        let nextY = this.pos.y + (this.vel.y * deltatime)

        if (nextX + this.radius >= _2Dobject.canvas.width || nextX - this.radius <= 0) {
            this.vel.x = -this.vel.x * this.wallCollisionFriction.x
        } else {
            this.vel.x += this.accn.x * deltatime
        }

        if (nextY + this.radius >= _2Dobject.canvas.height || nextY - this.radius <= 0) {
            this.vel.y = -this.vel.y * this.wallCollisionFriction.y;
        } else {
            this.vel.y += this.accn.y * deltatime;
        }

        this.pos.x += this.vel.x * deltatime
        this.pos.y += this.vel.y * deltatime
    }

    public static distanceBetween(a: _2Dobject, b: _2Dobject) {
        return Vector.distance(a.pos, b.pos);
    }

    public static collisionResolution(p1: _2Dobject, p2: _2Dobject) {
        //  TODO:Refactoring    


        if ((p1.vel.x - p2.vel.x) * (p2.pos.x - p1.pos.x) + (p1.vel.y - p2.vel.y) * (p2.pos.y - p1.pos.y) >= 0) {
            let rotationAngle = Vector.angleBetween(p1.pos, p2.pos)

            //initial rotated velocites
            let aVelRot = Vector.rotateVector(p1.vel, -rotationAngle);
            let bVelRot = Vector.rotateVector(p2.vel, -rotationAngle);

            console.log(p1.mass, p2.mass)

            let invMassProduct = 1 / (p1.mass + p2.mass);

            let aFinalx = invMassProduct * ((p1.mass - p2.mass) * aVelRot.x + 2 * p2.mass * bVelRot.x);
            let bFinalx = invMassProduct * ((p2.mass - p1.mass) * bVelRot.x + 2 * p1.mass * aVelRot.x);

            p1.vel = Vector.rotateVector(new Vector(aFinalx, aVelRot.y), rotationAngle);
            p2.vel = Vector.rotateVector(new Vector(bFinalx, bVelRot.y), rotationAngle);
        }

    }
}




// coll2.html 
let width, height;
_2Dobject.canvas.width = window.innerWidth;
_2Dobject.canvas.height  = window.innerHeight
window.addEventListener("resize", () => {
    _2Dobject.canvas.width = width = window.innerWidth;
    _2Dobject.canvas.height = height = window.innerHeight
})


const canvas = document.getElementById('c') as HTMLCanvasElement
const ctx = canvas.getContext('2d');
_2Dobject.canvas = canvas

const colors = [
    "#FFB3BA",  // pastel pink
    "#FFDFBA",  // pastel peach 
    "#FFFFBA",  // pastel yellow
    "#BAFFC9",  // pastel mint
    "#BAE1FF",  // pastel blue
    "#E0BBE4",  // pastel lavender
    "#D5AAFF",  // pastel violet
    "#C2F0FC",  // pastel cyan
    "#FCE1E4",  // pastel rose
    "#D0F4DE"   // pastel green
]




let lasttime = 0;
let deltaTime = 0;

let balls: _2Dobject[] = []

const ballcount = 200;
const radius = 10;


function setup() {
    while (balls.length <= ballcount) {
        let pos = new Vector(randint(radius, canvas.width - radius), randint(radius, canvas.height - radius));
        let BallsColliding = balls.some((ball) => {
            let centerDistance = Vector.distance(pos, ball.pos)
            return centerDistance < radius + ball.radius;
        })


        if (!BallsColliding) {
            let vel = new Vector(randint(-300, 300), randint(-300, 300));
            balls.push(new _2Dobject(pos, vel, radius, 1, colors[randint(0, colors.length - 1)]));
        }
    }
}


function animate(timestamp) {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    deltaTime = (timestamp - lasttime)/1000;
    lasttime = timestamp;

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        ball.update(deltaTime);
        ball.draw();

        for (let j = i + 1; j < balls.length; j++) {
            let anotherBall = balls[j];
            const dist = Vector.distance(ball.pos, anotherBall.pos);
            if (dist <= ball.radius + anotherBall.radius) {
                _2Dobject.collisionResolution(ball, anotherBall);
            }
        }
    }

}

setup();
animate(0);