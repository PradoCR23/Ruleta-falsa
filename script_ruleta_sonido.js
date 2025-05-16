
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

const colors = ["#ff3c00", "#444", "#ff3c00", "#444", "#ff3c00", "#444", "#ff3c00", "#444"];
let angle = 0;
let spinning = false;

const audio = new Audio("click.mp3");

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
    ctx.font = "16px Arial";
    ctx.fillText(segments[i], 100, 0);
    ctx.restore();
  }
}

drawWheel();

document.getElementById("spin").addEventListener("click", () => {
  if (spinning) return;
  spinning = true;
  let spins = Math.floor(Math.random() * 20 + 30);
  let interval = setInterval(() => {
    audio.currentTime = 0;
    audio.play();
    angle += 0.15;
    ctx.clearRect(0, 0, 500, 500);
    drawWheel();
    spins--;
    if (spins <= 0) {
      clearInterval(interval);
      const index = Math.floor((segments.length - (angle / (2 * Math.PI)) % 1 * segments.length)) % segments.length;
      document.getElementById("result").innerText = `Resultado: ${segments[index]}`;
      spinning = false;
    }
  }, 80);
});
