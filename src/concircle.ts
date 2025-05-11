// const canvas = document.getElementById("c1")! as HTMLCanvasElement;
// const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = 500;

const sideLength =100;
let radius = 75;
let colors = ["blue","green","yellow",'red'];

let delay = 500;
let curtime = 0;

function animate(timestamp:number){
    requestAnimationFrame(animate)

    ctx.beginPath()
    ctx.globalAlpha = 0.5
    ctx.fillStyle= colors[0];
    ctx.fillRect(canvas.width/2, canvas.height/2,-sideLength,-sideLength)
    ctx.fillStyle= colors[1];
    ctx.fillRect(canvas.width/2, canvas.height/2,sideLength,-sideLength)
    ctx.fillStyle= colors[2];
    ctx.fillRect(canvas.width/2, canvas.height/2,-sideLength,sideLength)
    ctx.fillStyle= colors[3];
    ctx.fillRect(canvas.width/2, canvas.height/2,sideLength,sideLength)
    if(timestamp-curtime > delay){
        curtime = timestamp;
        colors.unshift(colors.pop()!);
    }
    
}
animate(0)
// for(let color of colors){
//     ctx.globalAlpha = 0.8
//     ctx.beginPath();
//     ctx.arc(canvas.width/2, canvas.height/2, radius, 0,Math.PI*2,false);
//     ctx.fillStyle = color;
//     ctx.fill();
//     radius-=15;
// }
