(()=>{
    const canvas = document.getElementById('c')! as HTMLCanvasElement;
const ctx = canvas.getContext('2d')! as CanvasRenderingContext2D;

canvas.width = 500
canvas.height = 500

ctx.font = "100px ComicSans"
ctx.strokeText("Hello", 200,200)

ctx.font = "70px Arial"
ctx.strokeText("Lorem", 50,300)
ctx.fill();
})()