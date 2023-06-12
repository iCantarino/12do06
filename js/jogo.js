// Variaveis
var score = 0;
var lives = 3;
var gameContainer = document.getElementById("game-container");

// Jogador
var player = document.getElementById("player");
var playerX = 175;
var playerSpeed = 20; //Velocidade

// Loop
setInterval(function() {
  // Movimentacao
  player.style.left = playerX + "px";

  // Colisão com os objetos + vida
  var objects = document.getElementsByClassName("falling-object");
  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];

    if (object.classList.contains("heart")) {
      if (checkCollision(player, object)) {
        object.parentNode.removeChild(object);
        lives++;
        document.getElementById("lives").innerText = "Vidas: " + lives;
      } else if (object.offsetTop >= 550) {
        object.parentNode.removeChild(object);
      } else {
        object.style.top = object.offsetTop + 8 + "px";
      }
    } else {
      if (checkCollision(player, object)) {
        object.parentNode.removeChild(object);
        score += 10;
        document.getElementById("score").innerText = "Pontuação: " + score;
      } else if (object.offsetTop >= 550) {
        object.parentNode.removeChild(object);
        lives--;
        document.getElementById("lives").innerText = "Vidas: " + lives;
        if (lives === 0) {
          endGame();
        }
      } else {
        object.style.top = object.offsetTop + 8 + "px";
      }
    }
  }
}, 50);

// Keyboard controls
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft" && playerX > 0) {
    playerX -= playerSpeed;
  } else if (event.key === "ArrowRight" && playerX < 350) {
    playerX += playerSpeed;
  }
});

function checkCollision(player, object) {
  var playerRect = player.getBoundingClientRect();
  var objectRect = object.getBoundingClientRect();
  return (
    playerRect.left < objectRect.right &&
    playerRect.right > objectRect.left &&
    playerRect.top < objectRect.bottom &&
    playerRect.bottom > objectRect.top
  );
}

// Fazendo os objetos
function generateObject() {
  var object = document.createElement("div");
  object.className = "falling-object";
  
  // Posicionando aleatoriamente
  var containerWidth = gameContainer.offsetWidth;
  var maxLeft = containerWidth - object.offsetWidth;
  var randomLeft = Math.floor(Math.random() * maxLeft);
  object.style.left = randomLeft + "px";
  
  // Determinar se o objeto é vida extra
  var isHeart = Math.random() < 0.03; // 3 por cento, raro
  
  if (isHeart) {
    object.classList.add("heart");
    object.innerHTML = "&hearts;";
  }
  if (!isHeart) {
    object.classList.add("enemy");
  }
  
  gameContainer.appendChild(object);
}

// Fim do jogo
function endGame() {
  alert("GAME OVER\nPontuação: " + score);
  location.reload(); // Recarregando pra recomeçar
}

// Intervalo em que os objetos são feitos
setInterval(generateObject, 1000); // 1.5 segundo
