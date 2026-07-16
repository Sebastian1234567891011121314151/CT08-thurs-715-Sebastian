//player box
let box;//PLayer sprite
let cube;//Image for player sprite
let bg;//background

// game variables
let tileMap1;//Tilemap for level design
let spike;//img for spike
// world building groups
let ground;
let spikes;
let orb
let finishLine;

// image sprites


// menu


// sound assets


function preload() {
cube = loadImage("assets/cube.png")
bg= loadImage("assets/geobg.png")
tileMap1=loadStrings9
}

function setup() {
  new CanvasCaptureMediaStreamTrack(700,600);
  world.gravity.y=12


  startCoordinate=[50,height-25];
  player = new Sprite(startCoordinate[0],startCoordinate[1],50,50);
  player.img=cube;
  player.friction=0;
  player.bounciness=0;
  player.collider="none"
}

function draw() {
  clear();//erase the previous frame
  image(bg,0,0,800,600);//(image,x,y,width,height)
}











