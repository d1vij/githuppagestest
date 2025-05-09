const canvas1 = document.getElementsByTagName("canvas")[0];
const ctx1 = canvas1.getContext("2d");
const canvas2 = document.getElementsByTagName("canvas")[1];
const ctx2 = canvas2.getContext("2d");
const canvas3 = document.getElementsByTagName("canvas")[2];
const ctx3 = canvas3.getContext("2d");
canvas1.width = 520;
canvas1.height = 520;
canvas2.width = 520;
canvas2.height = 520;
canvas3.width = 520;
canvas3.height = 520;
const cellSize = 10;
const randomColor = () => `rgb(${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)})`;
let lastTime = 0;
let delay = 1000;
function animate(timestamp) {
    requestAnimationFrame(animate);
    if (timestamp - lastTime > delay) {
        lastTime = timestamp;
        for (let i = 10; i <= 500; i += 10) {
            for (let j = 10; j <= 500; j += 10) {
                ctx1.beginPath();
                ctx1.fillStyle = randomColor();
                ctx1.fillRect(i, j, cellSize, cellSize);
            }
        }
        for (let i = 10; i <= 500; i += 10) {
            for (let j = 10; j <= 500; j += 10) {
                ctx2.beginPath();
                ctx2.strokeStyle = randomColor();
                ctx2.arc(i, j, 5, 0, 2 * Math.PI, false);
                ctx2.stroke();
            }
        }
        for (let i = 10; i <= 500; i += 10) {
            for (let j = 10; j <= 500; j += 10) {
                ctx3.beginPath();
                ctx3.fillStyle = randomColor();
                ctx3.fillRect(i, j, cellSize, cellSize);
                ctx3.beginPath();
                ctx3.strokeStyle = randomColor();
                ctx3.arc(i + 5, j + 5, 5, 0, 2 * Math.PI, false);
                ctx3.stroke();
                ctx3.closePath();
            }
        }
    }
}
animate(0);
export {};
