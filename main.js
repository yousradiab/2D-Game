window.addEventListener("load", initApp);

let lastTime = 0;
function initApp() {
  console.log("App initialized");

  window.addEventListener("keydown", keyPressed);
  window.addEventListener("keyup", keyUpped);
  requestAnimationFrame(tick);

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
