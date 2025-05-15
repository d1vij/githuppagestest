import { Vector } from "./utils.js";

const canvas = document.getElementById('c') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const mouseCoords = new Vector(0, 0);
const bottomLeft = new Vector(0, canvas.height); // Assuming canvas origin is at top-left
const origin = new Vector(0, 0);

function draw_turret(event) {
    // Update mouse coordinates relative to canvas
    mouseCoords.x = event.clientX - canvas.getBoundingClientRect().x;
    mouseCoords.y = event.clientY - canvas.getBoundingClientRect().y;

    // Vector from mouse to bottom-left corner
    const vectorFromMouseToBottomLeft = mouseCoords.sub(bottomLeft);

    // Calculate the angle of the vector with respect to the X-axis in degrees
    const angle = vectorFromMouseToBottomLeft.angleMadeByThisVectorWithXAxisInRadians() * 180 / Math.PI;

    console.log(angle);  // Output the angle in degrees
}

window.addEventListener("mousemove", draw_turret);
