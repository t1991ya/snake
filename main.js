var canv = document.getElementById("mycan");
ctx = canv.getContext("2d");
document
  .getElementById("btn")
  .addEventListener("click", () => window.location.reload());
document.addEventListener("keydown", move);
var hit = new Audio("hit.mp3");
var gameoverSound = new Audio("over.mp3");
var eat = new Audio("eat.mp3");

var score = document.getElementById("score");
//function to define a point
function point(x, y) {
  this.x = x;
  this.y = y;
}

var basicGridUnit = 3;
var xSpeed = 0;
var ySpeed = 0;
var food_y = 50;
var food_x = 50;
var initpoint = new point();
initpoint.x = -5;
initpoint.y = -5;
var length = 5;
var snake = [];

var Speed = length;
var first = true;
var gameover = 0;
var head = new point(40, 40);
//initialize snake
for (var i = 0; i < length; i++) {
  snake[i] = initpoint;
}

function showScore() {
  score.innerText = length - 5;
}
draw();

showScore();
function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 300, 150);
  ctx.fillStyle = "red";
  ctx.fillRect(head.x, head.y, 3, 3);
  // snake body
  for (var i = 0; i < snake.length; i++) {
    ctx.fillStyle = "lime";
    ctx.fillRect(snake[i].x, snake[i].y, 3, 3);
  }
  // food
  ctx.fillStyle = "blue";
  ctx.fillRect(food_x, food_y, 3, 3);
  // border
  ctx.fillStyle = "gold";
  ctx.fillRect(0, 0, 300, 3);
  ctx.fillRect(0, 147, 300, 3);
  ctx.fillRect(0, 0, 3, 150);
  ctx.fillRect(297, 0, 3, 150);
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
  ctx.fillRect(food_x, food_y, 3, 3);
}
function frandom() {
  food_x = Math.floor(Math.random() * 290) + 5;
  food_y = Math.floor(Math.random() * 140) + 5;
}
function borders() {
  ctx.fillStyle = "gold";
  ctx.fillRect(0, 0, 300, 3);
  ctx.fillRect(0, 147, 300, 3);
  ctx.fillRect(0, 0, 3, 150);
  ctx.fillRect(297, 0, 3, 150);
}
function game() {
  //hit.play();
  for (var i = 0; i < snake.length - 1; i++) {
    snake[i] = snake[i + 1];
  }
  snake[length - 1] = { x: head.x, y: head.y };

  head.x += xSpeed;
  head.y += ySpeed;
  // when food is eaten :
  if (
    head.x - food_x <= 3 &&
    head.x - food_x >= -3 &&
    head.y - food_y <= 3 &&
    head.y - food_y >= -3
  ) {
    //increase the lenght of the snake
    length++;
    // double the speed
    Speed += 2;
    // add a new point to the snake
    snake.unshift(initpoint);
    console.log(Speed);
    // generate new food X and Y
    frandom();
    eat.play();
    showScore();
    clearInterval(gameover);
    gameover = setInterval(game, 1000 / Speed);
  }
  // if the snake hit the walls then the game is over
  if (head.x <= 3 || head.x >= 297 || head.y <= 3 || head.y >= 147) {
    console.log("game over");
    gameoverSound.play();
    clearInterval(gameover);
  }
  //if the snake hit her tail then the game is over
  if (snake.find(x => x.x == head.x && x.y == head.y)) {
    console.log(snake.indexOf(head));
    console.log("game over");
    clearInterval(gameover);
    gameoverSound.play();
  }
  //print(head);
  // printS(snake);

  //food();
  //borders();
  draw();
}
// use arrow keys to move the snake
function move(e) {
  if (first == true) {
    gameover = setInterval(game, 1000 / length);
    first = false;
  }
  if (e.code == "ArrowDown") {
    xSpeed = 0;
    ySpeed = basicGridUnit;
  }
  if (e.code == "ArrowUp") {
    xSpeed = 0;
    ySpeed = -basicGridUnit;
  }
  if (e.code == "ArrowRight") {
    xSpeed = basicGridUnit;
    ySpeed = 0;
  }
  if (e.code == "ArrowLeft") {
    xSpeed = -basicGridUnit;
    ySpeed = 0;
  }
}
function blocks() {}
