//player box
let cube; //Image for player sprite
let bg; //background
let startSprite;
let endSprite;

let startGameImg;
let endGameImg;

// game variables
let tileMap1; //Tilemap for level design
let tileMap2; //Tilemap for level 2
let spike; //img for spike
const TILE_SIZE = 50;
let playerJump = 0;
let mapUsed;
let player;
let startCoordinate;

// world building groups
let ground;
let spikes;
let orbs;
let finish;

let startGame = false;
let gameover = false;
let endTimer = 0;
let level = 1;
let lastlevel = 2; // total number of levels you have (was 1, but you have 2 tile maps)

function preload() {
  cube = loadImage("assets/cube.png");
  bg = loadImage("assets/geobg.png");
  tileMap1 = loadStrings("stages/tiles1.txt");
  tileMap2 = loadStrings("stages/tiles2.txt"); // was declared but never loaded — adjust path if your file lives elsewhere
  spike = loadImage("assets/spike.png");
  startGameImg = loadImage("assets/startgame.png");
  endGameImg = loadImage("assets/clear.png");
}

function setup() {
  new Canvas(800, 600);
  world.gravity.y = 25;

  startSprite = new Sprite(width / 2, height / 2, 190, 90);
  startSprite.img = startGameImg;
  startSprite.collider = 'none';

  startCoordinate = [TILE_SIZE, height - TILE_SIZE / 2];
  player = new Sprite(startCoordinate[0], startCoordinate[1], TILE_SIZE, TILE_SIZE);
  player.img = cube;
  player.friction = 0;
  player.bounciness = 0;
  player.collider = "dynamic";

  ground = new Group();
  ground.tile = "g"; //represent g in the tile map
  ground.w = TILE_SIZE;
  ground.h = TILE_SIZE;
  ground.color = "black";
  ground.stroke = "white";
  ground.collider = "static";

  spikes = new Group();
  spikes.tile = "s";
  spikes.w = TILE_SIZE;
  spikes.h = TILE_SIZE;
  spikes.img = spike;
  spikes.collider = "static";

  orbs = new Group();
  orbs.tile = "o";
  orbs.d = 24;
  orbs.collider = "static";
  orbs.color = "yellow";
  orbs.strokeWeight = 0;

  finish = new Group();
  finish.tile = "f";
  finish.w = TILE_SIZE;
  finish.h = height * 2;
  finish.collider = "static";
  finish.color = "red";
  finish.visible = true;

  new Tiles(tileMap1, 0, 0, TILE_SIZE, TILE_SIZE);

  mapUsed = tileMap1;
}

function draw() {
  clear(); //erase the previous frame
  image(bg, 0, 0, 800, 600);
  drawBackground();

  if (!startGame && (mouse.presses() || kb.presses("space"))) {
    startGame = true;
    startSprite.visible = false;
  } else if (!startGame) {
    if (frameCount % 60 < 30) {
      startSprite.visible = true;
    } else {
      startSprite.visible = false;
    }
  }

  if (startGame) {
    player.vel.x = 5.5;

    if (player.collides(finish)) {
      loadLevel();
    }

    if (player.x >= width / 2) {
      camera.x = player.x;
    }

    if ((kb.presses("space") || mouse.presses("left")) && playerJump == 0) {
      player.vel.y = -10;
      player.rotateTo(player.rotation + 359.9, 15);
      playerJump++;
    }

    if (player.collides(ground)) {
      playerJump = 0;
    }

    if (player.collides(spikes)) {
      resetGame();
    }

    for (let tile of ground) {
      if (player.collides(tile)) {
        let leftEdge = tile.x - tile.w / 2;
        let leftEgeHeight = tile.y - tile.h / 2;
        if (player.x < leftEdge && player.y > leftEgeHeight) {
          resetGame();
        }
      }
    }

    for (let orb of orbs) {
      if (player.colliding(orb)) {
        orb.visible = false;
        orb.collider = "none";
        player.vel.y = -5;
        playerJump = 0;
      }
    }
  }
}

function resetGame() {
  player.x = startCoordinate[0];
  player.y = startCoordinate[1];
  player.rotation = 0;
  playerJump = 0;
  camera.x = width / 2;

  for (let orb of orbs) {
    orb.visible = true;
    orb.collider = "static";
  }
}

function triggerGameOver() {
  if (!gameover) {
    gameover = true;

    player.vel.x = 0;
    playerJump = 0;
    endTimer = frameCount;

    if (endSprite) {
      endSprite.remove();
    }
    endSprite = new Sprite(player.x, height / 2, 126, 24);
    endSprite.collider = "none";
    endSprite.img = endGameImg;
  }
}

function loadLevel() {
  ground.removeAll();
  spikes.removeAll();
  orbs.removeAll();
  finish.removeAll();

  level++; // was never incremented, so this never advanced

  if (level > lastlevel) {
    // finished the last level — wrap back to 1 and show the clear screen
    level = 1;
    triggerGameOver();
  }

  if (level === 1) {
    new Tiles(tileMap1, 0, 0, 50, 50);
    mapUsed = tileMap1;
  } else if (level === 2) {
    new Tiles(tileMap2, 0, 0, 50, 50);
    mapUsed = tileMap2;
  }

  player.x = startCoordinate[0];
  player.y = startCoordinate[1];
  camera.x = width / 2;

  
}

function drawBackground() {
  let lastRow = mapUsed[mapUsed.length - 1];

  // guard against a trailing blank line in the tilemap .txt file
  if (lastRow.length === 0 && mapUsed.length > 1) {
    lastRow = mapUsed[mapUsed.length - 2];
  }
  let numCols = lastRow.length;
  let totalJourney = numCols * 50;
  let progress = map(player.x, 0, totalJourney, -100, 0);
  let c1 = color("#9933ff");
  let c2 = color("#4169e1");
  let amt = (sin(frameCount * 0.5) + 1) / 2;
  let blend = lerpColor(c1, c2, amt);
  tint(blend);
  image(bg, progress, 0, 800, 600);
  noTint();
}