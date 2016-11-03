"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    colorPallete = ["#FF7433", "#F5F5F5", "F5F5F5"],
    stats = new Stats(),
    div = document.getElementById("stats");

div.appendChild(stats.domElement);

var width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    origin = { x: width / 2, y: height / 2 },
    mouse = { x: width / 2, y: height / 2 },
    balls = [],
    count = 0,
    randomCount = 1;

window.onresize = function () {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  origin = { x: width / 2, y: height / 2 };
};

var Ball = function () {
  function Ball() {
    _classCallCheck(this, Ball);

    this.x = origin.x;
    this.y = origin.y;
    this.angle = Math.PI * 2 * Math.random();
    this.vx = (1.3 + Math.random() * .3) * Math.cos(this.angle);
    this.vy = (1.3 + Math.random() * .3) * Math.sin(this.angle);
    this.r = 6 + 3 * Math.random();
    this.color = colorPallete[Math.floor(Math.random() * colorPallete.length)];
  }

  Ball.prototype.update = function update() {
    this.x += this.vx;
    this.y += this.vy;
    this.r -= .01;
  };

  return Ball;
}();

loop();
function loop() {
  stats.begin();
  context.clearRect(0, 0, width, height);
  if (count === randomCount) {
    balls.push(new Ball());
    count = 0;
    randomCount = 3 + Math.floor(Math.random() * 5);
  }
  count++;
  for (var i = 0; i < balls.length; i++) {
    var b = balls[i];
    context.fillStyle = b.color;
    context.beginPath();
    context.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
    context.fill();
    b.update();
  }

  origin.x += (mouse.x - origin.x) * .25;
  origin.y += (mouse.y - origin.y) * .25;

  context.fillStyle = "#FF7433";
  context.beginPath();
  context.arc(origin.x, origin.y, 40, 0, Math.PI * 2, false);
  context.fill();

  removeBall();
  stats.end();
  requestAnimationFrame(loop);
}

function removeBall() {
  for (var i = 0; i < balls.length; i++) {
    var b = balls[i];
    if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
      balls.splice(i, 1);
    }
  }
}

window.addEventListener("mousemove", function (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}, false);