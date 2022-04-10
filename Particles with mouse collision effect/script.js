const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// get mouse position
let mouse = {
  // x: null,
  // y: null,
  x: undefined,
  y: undefined,
  radius: (canvas.height / 100) * (canvas.width / 100) // trial and error
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// particle class
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // draw method
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // check particle position, check mouse position, move particle, draw particle
  update() {
    // check if particle is still within the canvas
    if (this.x + this.size > canvas.width || this.x - this.size < 0)
      this.directionX = -this.directionX;
    if (this.y + this.size > canvas.height || this.y - this.size < 0)
      this.directionY = -this.directionY;

    // collision detection between mouse and particle
    // implement collision movement
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }

    // move particle
    this.x += this.directionX;
    this.y += this.directionY;
    // draw particle
    this.draw();
  }
}

// create particles array
function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.width * canvas.height) / 9000; // trial and error
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (window.innerWidth - size * 2) + size;
    let y = Math.random() * (window.innerHeight - size * 2) + size;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    let color = "#8c5523";

    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}

// check if particles are close enough to connect them
function connect() {
  let opacityValue = 1;
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i; j < particlesArray.length; j++) {
      let dx = particlesArray[i].x - particlesArray[j].x;
      let dy = particlesArray[i].y - particlesArray[j].y;
      let distance = dx * dx + dy * dy;
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - distance / 20000; // trial and error
        ctx.strokeStyle = `rgba(140,85,31,${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

// animation loop
function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();

  window.requestAnimationFrame(animate);
}

// resize event
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  mouse.radius = (canvas.height / 100) * (canvas.width / 100);
  init();
});

// mouse out event
window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

init();
animate();
