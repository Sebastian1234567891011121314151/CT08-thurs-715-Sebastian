//player box
let box;//PLayer sprite
let cube;//Image for player sprite
let bg;//background

// game variables
let tileMap1;//Tilemap for level design
let spike;//img for spike
const TILE_SIZE =50;
// world building groups
let ground;
let spikes;
let orb;
let finishLine;

// image sprites


// menu


// sound assets


function preload() {
cube = loadImage("assets/cube.png");
bg= loadImage("assets/geobg.png");
tileMap1=loadStrings("stages/tiles1.txt");
spike=loadImage("assets/spike.png");
}

function setup() {
  new CanvasCaptureMediaStreamTrack(700,600);
  world.gravity.y=12;


  startCoordinate=[TILE_SIZE,height-TILE_SIZE/2];
  player = new Sprite(startCoordinate[0],startCoordinate[1],TILE_SIZE,TILE_SIZE);
  player.img=cube;
  player.friction=0;
  player.bounciness=0;
  player.collider="none";

  ground=new Group();
  ground.tile="g";//represent g in the tile map
  ground.w=TILE_SIZE;//width
  ground.h=TILE_SIZE;//height
  ground.color="black";
  ground.stroke="black";
  ground.collider="static";

}

function draw() {
  clear();//erase the previous frame
  image(bg,0,0,800,600);//(image,x,y,width,height)
}











