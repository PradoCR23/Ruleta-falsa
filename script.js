
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const segments = [
  "Suerte para la próxima",
  "Girá otra vez",
  "Casi, casi",
  "Volvé mañana",
  "Ups… sin premio",
  "Suerte para la próxima",
  "No fue hoy",
  "Nada por ahora"
];

const colors = ["#ff3c00", "#222", "#ff3c00", "#222", "#ff3c00", "#222", "#ff3c00", "#222"];
let angle = 0;
let spinning = false;

const audio = new Audio("click.mp3");

function drawPointer() {
  ctx.beginPath();
  ctx.moveTo(250, 20);
  ctx.lineTo(240, 50);
  ctx.lineTo(260, 50);
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.stroke();
}

function drawWheel() {
  const arc = (2 * Math.PI) / segments.length;
  for (let i = 0; i < segments.length; i++) {
    const start = angle + i * arc;
    const end = start + arc;
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 200, start, end);
    ctx.fill();
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(start + arc / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "right";
    ctx.fillText(segments[i], 190, 5);
    ctx.restore();
  }
  drawPointer();
}

drawWheel();

document.getElementById("spin").addEventListener("click", () => {
  if (spinning) return;
  spinning = true;
  let spins = Math.floor(Math.random() * 30 + 30);
  let interval = setInterval(() => {
    audio.currentTime = 0;
    audio.play();
    angle += 0.12;
    ctx.clearRect(0, 0, 500, 500);
    drawWheel();
    spins--;
    if (spins <= 0) {
      clearInterval(interval);
      const arc = (2 * Math.PI) / segments.length;
      const index = Math.floor((segments.length - ((angle + arc / 2) % (2 * Math.PI)) / arc)) % segments.length;
      document.getElementById("result").innerText = `Resultado: ${segments[index]} - #COMARICO`;
      spinning = false;
    }
  }, 70);
});
