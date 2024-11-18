window.addEventListener("load", initApp);

function initApp() {
  console.log("App initialized");
  createTiles();
  getClassForTileType();
  displayTiles();
}
const tiles = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1], // 2 represents water
  [1, 2, 3, 3, 3, 3, 3, 3, 2, 1], // 3 represents grass
  [1, 2, 3, 0, 0, 0, 0, 3, 2, 1], // 0 represents open space
  [1, 2, 3, 0, 1, 1, 0, 3, 2, 1], // 1 represents wall
  [1, 2, 3, 0, 1, 1, 0, 3, 2, 1],
  [1, 2, 3, 0, 0, 0, 0, 3, 2, 1],
  [1, 2, 3, 3, 3, 3, 3, 3, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const GRID_HEIGHT = tiles.length;
const GRID_WIDTH = tiles[0].length;
const TILE_SIZE = 32;

function getTileAtCord(row, col) {
  return tiles[row][col];
}

function coordFromPos(position) {
  const row = Math.floor(position.y / TILE_SIZE);
  const col = Math.floor(position.x / TILE_SIZE);
  return { row, col };
}
console.log(coordFromPos({ x: 148, y: 64 }));

//kombiner coordFromPos og GetTileAtCord
function getTileAtPos(position) {
  const { row, col } = coordFromPos(position);
  return tiles[row][col];
}

function createTiles() {
  const background = document.querySelector("#background");
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      background.appendChild(tile);
    }
  }
  background.style.setProperty("--TILE_SIZE", TILE_SIZE);
  background.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);
  background.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
}

function displayTiles() {
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const index = row * GRID_WIDTH + col;
      const visualTile = visualTile[index];
      const tileType = getTileAtCord({ row, col });
      const tileClass = getClassForTileType(tileType);
      visualTile.classList.add(tileClass);
    }
  }
}

function getClassForTileType(tileType) {
  switch (tileType) {
    case 1:
      return "wall";
    case 2:
      return "water";
    default:
    case 3:
      "grass";
      return "grass";
  }
}
