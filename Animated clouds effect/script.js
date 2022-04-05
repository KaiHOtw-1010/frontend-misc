const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colors = [
  "white"
  // "rgba(255,255,255,0.3)",
  // "rgba(173,216,230,0.8)",
  // "rgba(211,211,211,0.8)"
];
const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

let mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// constructor function for particle
function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}

// add draw method to Particle prototype
Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  // ctx.fillRect(this.x, this.y, this.size, this.size);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
};

// add update method to Particle prototype
Particle.prototype.update = function () {
  if (this.x + this.size > canvas.width || this.x - this.size < 0)
    this.directionX = -this.directionX;
  if (this.y + this.size > canvas.height || this.y - this.size < 0)
    this.directionY = -this.directionY;
  this.x += this.directionX;
  this.y += this.directionY;

  // mouse interactivity
  if (
    mouse.x - this.x < mouseRadius &&
    mouse.x - this.x > -mouseRadius &&
    mouse.y - this.y < mouseRadius &&
    mouse.y - this.y > -mouseRadius
  ) {
    if (this.size < maxSize) this.size += 4;
  } else {
    this.size - 0.1 < minSize ? (this.size = 0) : (this.size -= 0.1);
  }

  this.draw();
};

// create particle array
function init() {
  particleArray = new Array(1000).fill(null).map(() => {
    let size = 0;
    let x = Math.random() * (window.innerWidth - size * 2) + size;
    let y = Math.random() * (window.innerHeight - size * 2) + size;
    let directionX = Math.random() * 0.2 - 0.1;
    let directionY = Math.random() * 0.2 - 0.1;
    let color = colors[Math.floor(Math.random() * colors.length)];

    return new Particle(x, y, directionX, directionY, size, color);
  });
}

// animation loop
function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particleArray.forEach((particle) => particle.update());

  window.requestAnimationFrame(animate);
}

init();
animate();

// resize event
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// remove mouse position periodically
setInterval(() => {
  mouse.x = undefined;
  mouse.y = undefined;
}, 1000);
