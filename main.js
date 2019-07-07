var canv = document.getElementById("mycan");
ctx = canv.getContext("2d");
document.addEventListener("keydown", move);
var speed = 3;
var xv = 0;
var yv = 0;
var fy = 50;
var fx = 50;
var initpoint = new point();
initpoint.x = -5;
initpoint.y = -5;
var length = 5;
var snake = [];
function point(x, y) {
  this.x = x;
  this.y = y;
}
var vitesse = length;
var first = true;
var gameover = setInterval(game, 1000 / length);

var head = new point(40, 40);
//initialize snake
for (var i = 0; i < length; i++) {
  snake[i] = initpoint;
}

function game() {
  for (var i = 0; i < snake.length - 1; i++) {
    snake[i] = snake[i + 1];
  }
  snake[length - 1] = { x: head.x, y: head.y };

  head.x += xv;
  head.y += yv;
  if (
    head.x - fx <= 3 &&
    head.x - fx >= -3 &&
    head.y - fy <= 3 &&
    head.y - fy >= -3
  ) {
    length++;
    vitesse *= 2;
    snake.unshift(head);
    console.log(1000 / length);
    clearInterval(gameover);
    gameover = setInterval(game, 1000 / length);

    frandom();

    first = true;
  }
  if (head.x <= 3 || head.x >= 297 || head.y <= 3 || head.y >= 147) {
    console.log("game over");
    clearInterval(gameover);
  }
  if (first == false)
    if (snake.find(x => x.x == head.x && x.y == head.y)) {
      console.log(snake.indexOf(head));
      console.log("game over");
      clearInterval(gameover);
    }

  print(head);
  printS(snake);
  food();
  borders();
}
// use arrow keys to move the snake
function move(e) {
  if (first == true) first = false;
  if (e.code == "ArrowDown") {
    xv = 0;
    yv = speed;
  }
  if (e.code == "ArrowUp") {
    xv = 0;
    yv = -speed;
  }
  if (e.code == "ArrowRight") {
    xv = speed;
    yv = 0;
  }
  if (e.code == "ArrowLeft") {
    xv = -speed;
    yv = 0;
  }
}
function print(p) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 300, 150);
  ctx.fillStyle = "red";
  ctx.fillRect(p.x, p.y, 3, 3);
}
function printS(snake) {
  ctx.fillStyle = "black";
  for (var i = 0; i < snake.length; i++) {
    ctx.fillStyle = "lime";
    ctx.fillRect(snake[i].x, snake[i].y, 3, 3);
  }
}
function food() {
  ctx.fillStyle = "blue";
  ctx.fillRect(fx, fy, 3, 3);
}
function frandom() {
  fx = Math.floor(Math.random() * 296);
  fy = Math.floor(Math.random() * 146);
}
function borders() {
  ctx.fillStyle = "gold";
  ctx.fillRect(0, 0, 300, 3);
  ctx.fillRect(0, 147, 300, 3);
  ctx.fillRect(0, 0, 3, 150);
  ctx.fillRect(297, 0, 3, 150);
}
