//player box
let box;//PLayer sprite
let cube;//Image for player sprite
let bg;//background

// game variables


// world building groups


// image sprites


// menu


// sound assets


function preload() {
cube = loadImage("assets/cube.png")
bg= loadImage("assets/geobg.png")
}

function setup() {
  new CanvasCaptureMediaStreamTrack(700,600);
  world.gravity.y=12

  player = new Sprite(50,50,50,50);
  player.img=cube;
  player.friction=0;
  player.boun
}

function draw() {
  
}











