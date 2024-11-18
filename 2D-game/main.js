window.addEventListener("load", initApp);

let lastTime = 0;
requestAnimationFrame(tick);

function initApp() {
  console.log("App initialized");
  enemy.speed = 100; // Hastighed i pixels per sekund
  enemy.direction = 1;
  window.addEventListener("keydown", keyPressed);
  window.addEventListener("keyup", keyUpped);
  tick(lastTime);
}

const player = {
  x: 0,
  y: 0,
  speed: 100,
  width: 32,
  height: 40,
};

const gameField = {
  width: 600,
  height: 600,
};

const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
};

const enemy = {
  x: 100,
  y: 100,
  width: 32,
  height: 32,
  speed: 100, // Fjendens hastighed i pixels/sekund
  direction: 1, // Bevægelsesretning (1 = højre, -1 = venstre)
};

function movePlayer(deltaTime) {
  const newPosition = {
    x: player.x,
    y: player.y,
  };

  if (controls.left) {
    newPosition.x -= player.speed * deltaTime;
  }
  if (controls.right) {
    newPosition.x += player.speed * deltaTime;
  }
  if (controls.up) {
    newPosition.y -= player.speed * deltaTime;
  }
  if (controls.down) {
    newPosition.y += player.speed * deltaTime;
  }

  if (canMove(newPosition)) {
    player.x = newPosition.x;
    player.y = newPosition.y;
  }
}

function moveEnemy(deltaTime) {
  // Kontroller grænserne for fjenden
  if (enemy.x <= 0) {
    enemy.x = 0; // Hold fjenden inden for venstre kant
    enemy.direction = 1; // Skift retning til højre
  } else if (enemy.x + enemy.width >= gameField.width) {
    enemy.x = gameField.width - enemy.width; // Hold fjenden inden for højre kant
    enemy.direction = -1; // Skift retning til venstre
  }
  displayEnemy(); // Opdater fjendens visuelle position
}

function displayEnemy() {
  const visualEnemy = document.querySelector("#enemy");
  visualEnemy.style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;
}
function checkCollision() {
  const playerRect = {
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
  };

  const enemyRect = {
    x: enemy.x,
    y: enemy.y,
    width: enemy.width,
    height: enemy.height,
  };

  if (
    playerRect.x < enemyRect.x + enemyRect.width &&
    playerRect.x + playerRect.width > enemyRect.x &&
    playerRect.y < enemyRect.y + enemyRect.height &&
    playerRect.y + playerRect.height > enemyRect.y
  ) {
    // Skift fjendens farve
    const visualEnemy = document.querySelector("#enemy");
    visualEnemy.style.backgroundColor = "red"; // Ændrer farven ved kollision
  }
}

function startMovementAnimation(direction) {
  const visualPlayer = document.querySelector("#player");
  visualPlayer.setAttribute("class", "");
  visualPlayer.classList.add(`playerMove${direction}`);
}

function stopMovementAnimation(direction) {
  const visualPlayer = document.querySelector("#player");
  visualPlayer.setAttribute("class", "");
  visualPlayer.classList.add(`playerLook${direction}`);
}

function canMove(newPosition) {
  if (newPosition.x < 0 || newPosition.x + player.width > gameField.width) {
    return false;
  }
  if (newPosition.y < 0 || newPosition.y + player.height > gameField.height) {
    return false;
  }

  return true;
}

function displayPlayer() {
  const visualPlayer = document.querySelector("#player");

  visualPlayer.style.translate = `${player.x}px ${player.y}px`;
}

function tick(time) {
  requestAnimationFrame(tick);
  console.log("tick");
  const deltaTime = (time - lastTime) / 1000;
  lastTime = time;
  moveEnemy(deltaTime); // Fjendens bevægelse
  checkCollision(); /// Tjek for kollision
  movePlayer(deltaTime);
  displayPlayer();
}

function keyPressed(e) {
  switch (e.key) {
    case "ArrowUp":
      controls.up = true;
      startMovementAnimation("Up");
      break;
    case "ArrowDown":
      controls.down = true;
      startMovementAnimation("Down");
      break;
    case "ArrowLeft":
      controls.left = true;
      startMovementAnimation("Left");
      break;
    case "ArrowRight":
      controls.right = true;
      startMovementAnimation("Right");
      break;
  }
}

function keyUpped(e) {
  switch (e.key) {
    case "ArrowUp":
      controls.up = false;
      stopMovementAnimation("Up");
      break;
    case "ArrowDown":
      controls.down = false;
      stopMovementAnimation("Down");
      break;
    case "ArrowLeft":
      controls.left = false;
      stopMovementAnimation("Left");
      break;
    case "ArrowRight":
      controls.right = false;
      stopMovementAnimation("Right");
      break;
  }

  console.log(controls);

  displayPlayer();
}
