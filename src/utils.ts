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
export class Vector {
    x: number
    y: number
    z: number
    constructor(x: number, y: number, z: number = null) {
        this.x = x;
        this.y = y
        this.z = z
    }
    static distance(a: Vector, b: Vector) {
        return Math.hypot((a.x - b.x), (a.y - b.y), (a.z - b.z))
    }
    static areEqual(a: Vector, b: Vector) {
        return (a.x === b.x) && (a.y === b.y);
    }
    static amplitude(a:Vector){
        //amplitude in rads
        return Math.atan(a.y/a.x);
    }
}

export const randomColor = () => `rgb(${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)})`;
//rgb
export const _2PI = Math.PI * 2;

export function randint(min, max) {
    return (Math.random() * (max - min + 1)) + min;
}


export class _2Dobject {
    pos: Vector;
    vel: Vector;
    mass: number
    radius: any;
    color: any;
    ctx: CanvasRenderingContext2D
    wallCollisionFriction: Vector
    accn: Vector


    static canvas = document.getElementById('c') as HTMLCanvasElement;

    static accn = new Vector(randint(-3, 3), randint(-3, 3)); //set class level or instance level
    static _e = new Vector(1, 1); //coefficient of restituion, ratio of final velocity to initial velocity before collision
    // 0<=_e <= 1 -> 0 full loss of energy on collision, 1 no loss of energy on collision

    public constructor(position: Vector, velocity: Vector, radius:number,mass:number, color:string ,accn: Vector = null, wallCollisionFriction: Vector = null) {
        this.pos = position;
        this.vel = velocity
        this.radius = radius
        this.color = color;
        this.ctx = _2Dobject.canvas.getContext('2d');

        this.accn = accn || _2Dobject.accn
        this.wallCollisionFriction = wallCollisionFriction || _2Dobject._e

    }

    public draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, _2PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.stroke();
        this.ctx.fill()
    }

    public update(deltatime) {
        //delta time comes from animation loop

        let nextX = this.pos.x + (this.vel.x * deltatime)
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

    public static collisionResolution(a:_2Dobject, b:_2Dobject){
        let mp = (1/(a.mass+b.mass));
        let au = a.vel
        let bu = b.vel
        
        a.vel.x = -(mp * ((a.mass-b.mass)*au.x + 2*bu.x*b.mass ))
        b.vel.x = -(mp * ((b.mass-a.mass)*bu.x + 2*au.x*a.mass ))
        
        a.vel.y = +(mp * ((a.mass-b.mass)*au.y + 2*bu.y*b.mass ))
        b.vel.y = +(mp * ((b.mass-a.mass)*bu.y + 2*au.y*a.mass ))
    }
    
    
    
    
    
    
    
}





function setBallsUniquePos() {
    let canvas;
    let balls = []
    let ballcount = 10;
    while (balls.length <= ballcount) {
        let pos = new Vector(randint(30, canvas.width - 30), randint(30, canvas.height - 30));


        //checking if current ball is colliding with any of present ball
        let BallsColliding = balls.some((ball) => {
            let centerDistance = Vector.distance(pos, ball.pos)
            return centerDistance < radius + ball.radius;
        })
        if (!BallsColliding) {
            let vel = new Vector(randint(-300, 300), randint(-300, 300));
            balls.push(new _2Dobject(pos, vel, radius,1, randomColor()))
        }

    }
}