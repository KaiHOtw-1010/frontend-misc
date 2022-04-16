const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
let colorArray = ["rgba(255,0,0)", "rgba(255,255,0)", "rgba(0,0,255)"];

class Particle {
  constructor(moveRadius, step, position, size, color) {
    this.moveRadius = moveRadius;
    this.step = step;
    this.position = position;
    this.size = size;
    this.color = color;
  }

  draw() {
    let x = Math.cos(this.position) * this.moveRadius + canvas.width / 4;
    let y = Math.sin(this.position) * this.moveRadius + canvas.height / 2;
    ctx.beginPath();
    // ctx.arc(x, y, this.moveRadius / 20, 0, Math.PI * 2);
    ctx.rect(x, y, this.moveRadius / 13, this.moveRadius / 13);
    ctx.closePath();
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  update() {
    this.position += this.step;
    this.draw();
  }
}

function init() {
  particleArray = [];
  for (let i = 0; i < 500; i++) {
    let moveRadius = Math.random() * canvas.width;

    let step;
    let stepProbability = Math.random();
    if (stepProbability <= 0.4) {
      step = Math.random() * 0.003 + 0.002;
    } else {
      step = Math.random() * 0.001 + 0.002;
    }

    let position = Math.random() * Math.PI * 2;
    let size = Math.random() * 8 + 0.5;
    let color = colorArray[Math.floor(Math.random() * 3)];
    particleArray.push(new Particle(moveRadius, step, position, size, color));
  }
}

function animate() {
  ctx.fillStyle = "rgba(77, 141, 98, 0.09)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < 500; i++) {
    particleArray[i].update();
  }
  window.requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
