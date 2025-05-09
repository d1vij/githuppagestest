import { Point } from "./point.js";

const _2PI = Math.PI * 2

const canvas :HTMLCanvasElement=document.getElementsByTagName("canvas")[0]!
canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext('2d')!;


function drawCircle(x: number,y: number ,radius: number ){
    ctx.beginPath()
    ctx.arc(x,y,radius, 0, _2PI, false);
    ctx.fillStyle='pink';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}


const RADIUS = 50


let dy = -3;//rate of change of y pos -> j velocity
let dx = -1;
let CENTER = new Point(canvas.width/2, canvas.height/2);

function animate(timestamp:number){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    drawCircle(CENTER.x, CENTER.y, RADIUS);

    CENTER.y += dy;
    CENTER.x += dx;
    if(CENTER.y+RADIUS>=canvas.height || CENTER.y - RADIUS<=0 ){
        dy = -dy;
    }
    if(CENTER.x+RADIUS>=canvas.width || CENTER.x - RADIUS<=0 ){
        dx = -dx;
    }
    
}
animate(0);