let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; // Cada quadradinho tem 32px
let direction = "right"; // Direção inicial da cobrinha
let food = {
  // Cria posições aleatórias em (x,y) em que tanto x quanto y vão de 1*box a 16*box (ou 16 quadradinhos)
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

/* var divOverlay = document.getElementById("overlay");

function disableBtn(){
    divOverlay.style.display = "none";
}

document.getElementsById("botao-start").addEventListener("click", disableBtn);
*/

// Cria o Background (BG)
function criarBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

// Sempre cria a cobrinha a partir do centro (8*box, 8*box) quando a função é chamada
function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// Gera a comida da cobrinha
function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
  // Muda a direção da cobrinha ao atingir a borda
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      gameOver();
    }
  }

  criarBG();
  criarCobrinha();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Faz a cobrinha avançar em uma certa direção
  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  // Gera uma nova comida para a cobrinha
  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 150);

// ATIVA MODAL

const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const restartBtn = document.querySelector("#restart-btn");

function toggleModal() {
  [modal, fade].forEach((el) => {
    el.classList.toggle("hide");
  });
}

function gameOver() {
  toggleModal();
}

restartBtn.addEventListener("click", () => {
  toggleModal();
  location.reload(); // Reinicia a página
});

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    toggleModal();
    location.reload(); // Reinicia a página
  }
});
