export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static distance(a, b) {
        return Math.sqrt(Math.sqrt(a.x - b.x) + Math.sqrt(a.y - b.y));
    }
}
export class Vector {
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    sub(b) {
        return new Vector(this.x - b.x, this.y - b.y);
    }
    amplitude() {
        return Vector.angleBetween(this, new Vector(0, 0));
    }
    static rotateVector(oV, angle) {
        let s = Math.sin(angle);
        let c = Math.cos(angle);
        return new Vector(oV.x * c - oV.y * s, oV.x * s + oV.y * c);
    }
    static distance(a, b) {
        return Math.hypot((a.x - b.x), (a.y - b.y), (a.z - b.z));
    }
    static areEqual(a, b) {
        return (a.x === b.x) && (a.y === b.y);
    }
    static angleBetween(a, b) {
        //angle made wrt +x axis
        return Math.atan2(a.y - b.y, a.x - b.x);
    }
}
export const randomColor = () => `rgb(${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)})`;
//rgb
export const _2PI = Math.PI * 2;
export function randint(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
export class _2Dobject {
    // 0<=_e <= 1 -> 0 full loss of energy on collision, 1 no loss of energy on collision
    constructor(position, velocity, radius, mass, color = null, accn = null, wallCollisionFriction = null) {
        this.pos = position;
        this.vel = velocity;
        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.ctx = _2Dobject.canvas.getContext('2d');
        this.accn = accn || _2Dobject.accn;
        this.wallCollisionFriction = wallCollisionFriction || _2Dobject._e;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, _2PI, false);
        if (this.color) {
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
        this.ctx.fill();
        this.ctx.stroke();
    }
    update(deltatime) {
        //delta time comes from animation loop
        let nextX = this.pos.x + (this.vel.x * deltatime); //positions of Next frame/second
        let nextY = this.pos.y + (this.vel.y * deltatime);
        if (nextX + this.radius >= _2Dobject.canvas.width || nextX - this.radius <= 0) {
            this.vel.x = -this.vel.x * this.wallCollisionFriction.x;
        }
        else {
            this.vel.x += this.accn.x * deltatime;
        }
        if (nextY + this.radius >= _2Dobject.canvas.height || nextY - this.radius <= 0) {
            this.vel.y = -this.vel.y * this.wallCollisionFriction.y;
        }
        else {
            this.vel.y += this.accn.y * deltatime;
        }
        this.pos.x += this.vel.x * deltatime;
        this.pos.y += this.vel.y * deltatime;
    }
    static distanceBetween(a, b) {
        return Vector.distance(a.pos, b.pos);
    }
    static collisionResolution(p1, p2) {
        //  TODO:Refactoring    
        if ((p1.vel.x - p2.vel.x) * (p2.pos.x - p1.pos.x) + (p1.vel.y - p2.vel.y) * (p2.pos.y - p1.pos.y) >= 0) {
            let rotationAngle = Vector.angleBetween(p1.pos, p2.pos);
            //initial rotated velocites
            let aVelRot = Vector.rotateVector(p1.vel, -rotationAngle);
            let bVelRot = Vector.rotateVector(p2.vel, -rotationAngle);
            console.log(p1.mass, p2.mass);
            let invMassProduct = 1 / (p1.mass + p2.mass);
            let aFinalx = invMassProduct * ((p1.mass - p2.mass) * aVelRot.x + 2 * p2.mass * bVelRot.x);
            let bFinalx = invMassProduct * ((p2.mass - p1.mass) * bVelRot.x + 2 * p1.mass * aVelRot.x);
            p1.vel = Vector.rotateVector(new Vector(aFinalx, aVelRot.y), rotationAngle);
            p2.vel = Vector.rotateVector(new Vector(bFinalx, bVelRot.y), rotationAngle);
        }
    }
}
_2Dobject.canvas = document.getElementById('c');
_2Dobject.accn = new Vector(randint(-3, 3), randint(-3, 3)); //set class level or instance level
_2Dobject._e = new Vector(1, 1); //coefficient of restituion, ratio of final velocity to initial velocity before collision
function setBallsUniquePos() {
    let canvas;
    let balls = [];
    let ballcount = 10;
    while (balls.length <= ballcount) {
        let pos = new Vector(randint(30, canvas.width - 30), randint(30, canvas.height - 30));
        //checking if current ball is colliding with any of present ball
        let BallsColliding = balls.some((ball) => {
            let centerDistance = Vector.distance(pos, ball.pos);
            return centerDistance < radius + ball.radius;
        });
        if (!BallsColliding) {
            let vel = new Vector(randint(-300, 300), randint(-300, 300));
            balls.push(new _2Dobject(pos, vel, radius, 1, randomColor()));
        }
    }
}
