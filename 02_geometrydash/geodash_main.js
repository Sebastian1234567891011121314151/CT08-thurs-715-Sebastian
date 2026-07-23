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
  new Canvas(800,600);
  world.gravity.y=12;


  startCoordinate=[TILE_SIZE,height-TILE_SIZE/2];
  player = new Sprite(startCoordinate[0],startCoordinate[1],TILE_SIZE,TILE_SIZE);
  player.img=cube;
  player.friction=0;
  player.bounciness=0;
  player.collider="dynamic";

  ground=new Group();
  ground.tile="g";//represent g in the tile map
  ground.w=TILE_SIZE;//width
  ground.h=TILE_SIZE;//height
  ground.color="black";
  ground.stroke="white";
  ground.collider="static";

  spikes=new Group();
  spikes.tile="s";
  spikes.w=TILE_SIZE;
  spikes.h=TILE_SIZE
  spikes.img=spike;
  spikes.collider="static";

  orbs=new Group();
  orbs.tile="o";
  orbs.d=24;
  orbs.collider="static";
  orbs.color="yellow";
  orbs.strokeWeight=0;

  finish = new Group();
  finish.tile="f";
  finish.w=TILE_SIZE;
  finish.h=height*2;
  finish.collider="static";
  finish.color="red";
  finish.visible="true";

  new Tiles(tileMap1,0,0,TILE_SIZE,TILE_SIZE);
}

function draw() {
  clear();//erase the previous frame
  image(bg,0,0,800,600);//(image,x,y,width,height)

   player.vel.x=8;
  
   if (player.x >= width/2){
    
   }

   camera.x=player.x


   if(kb.presses("space")||mouse.presses("left")){
    player.vel.y=-8;
    player.rotateTo(player.rotation + 359.9,15);
   }
  // player.vel.y=-8
}











