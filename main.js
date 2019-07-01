const food = document.getElementById("head");
var canv = document.getElementById("mycan");
ctx = canv.getContext("2d");
document.addEventListener("keydown", move);
document.getElementById("btn").addEventListener("click", launch);
var s = [];
for (var i = 0; i < 5; i++) {
  s[i] = i;
}
function launch() {
  game();
}
//setInterval(game, 1000);
var speed = 1;
var xv = 0;
var yv = 0;

var length = 5;
var snake = [];
function point() {
  this.x;
  this.y;
}
var head = new point();
head.x = 40;
head.y = 40;
//initialize snake
for (var i = 0; i < 5; i++) {
  var pp = new point();
  pp.x = 0;
  pp.y = 0;
  snake[i] = pp;
}
function game() {
  for (var i = 0; i < snake.length; i++) {
    snake[i].x = snake[i + 1].x;
  }
  //snake[4].x = head.x;
  //snake[4].y = head.y;
  for (var i = 0; i < snake.length; i++) {
    console.log("||" + i + "||" + snake[i].x);
  }
  head.x += xv;
  head.y += yv;
  // food.style.top = y + "px";
  //food.style.left = x + "px";

  print(head);
  printS(snake);
}
// use arrow keys to move the snake
function move(e) {
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
  ctx.fillRect(0, 0, 400, 800);
  ctx.fillStyle = "red";
  ctx.fillRect(p.x, p.y, 10, 10);
}
function printS(snake) {
  ctx.fillStyle = "black";
  for (var i = 0; i < snake.length; i++) {
    ctx.fillStyle = "lime";
    ctx.fillRect(snake[i].x, snake[i].y, 3, 3);
  }
}
