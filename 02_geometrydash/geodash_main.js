//player box
let box;//PLayer sprite
let cube;//Image for player sprite
let bg;//background
let startSprite;
let endSprite;

let startGameImg;
let endGameImg;


// game variables
let tileMap1;//Tilemap for level design
let spike;//img for spike
const TILE_SIZE =50;
let playerJump = 0;
let mapused;
// world building groups
let ground;
let spikes;
let orb;
let finishLine;

let startGame = false;
let gameover = false;
let endTimer =0;

// image sprites


// menu


// sound assets


function preload() {
cube = loadImage("assets/cube.png");
bg= loadImage("assets/geobg.png");
tileMap1=loadStrings("stages/tiles1.txt");
spike=loadImage("assets/spike.png");
startGameImg = loadImage("assets/startgame.png");
endGameImg= loadImage("assets/clear.png");
}

function setup() {
  new Canvas(800,600);
  world.gravity.y=25;

  // startSprite.visible=true;
  startSprite=new Sprite(width/2,height/2,190,90);
  startSprite.img=startGameImg;
  startSprite.collider ='none';



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

  mapUsed=tileMap1;
}

function draw() {
   clear();//erase the previous frame
   image(bg,0,0,800,600);//(image,x,y,width,height)

 
   if(!startGame &&(mouse.presses()||kb.presses("space"))){
    startGame=true;
    startSprite.visible=false;
   }else if (!startGame){
    if (frameCount % 60 <30){
      startSprite.visible=true;
    }else{
      startSprite.visible=false;
    }
   }
   if(startGame){
    player.vel.x=5.5;
    if (box.collides(finishLine)){
      triggerGameOver();
    }
    if (player.x >= width/2){
      camera.x=player.x;
    }

    if((kb.presses("space")||mouse.presses("left"))&&playerJump==0){
      player.vel.y=-10;
      player.rotateTo(player.rotation + 359.9,15);
      playerJump++;
    }

    if (player.collides(ground)){
      playerJump = 0;
    }

    if(player.collides(spikes)){
      resetGame();
    }

    for (let tile of ground){
      if(player.collides(tile)){
        let leftEdge= tile.x-tile.w/2;
        let leftEgeHeight= tile.y- tile.h/2;
        if(player.x<leftEdge&&player.y>leftEgeHeight){
          resetGame();
        }
      }
    }

    for(let orb of orbs){
      if (box.colliding(orb)){
        orb.visible=false;
        orb.collider="none";
        box.vel.y=-5;
        jumpChance=MAX_JUMP;
      }
    }
   }

}

function resetGame(){
    player.x=startCoordinate[0];
    player.y=startCoordinate[1];
    player.rotation=0;
    playerJump=0;
    camera.x=width/2;

    for(let orb of orbs){
      orb.visible=true;
      orb.collider="static";
    }
}

function triggerGameOver(){
  if(!gameover){
    gameover=true;

    box.vel.x=0
    jumpChance=0 
    endTimer=frameCount;

    if(endSprite){
      ensSprite.remove();
    }
    endSprite=new Sprite(box.x,height/2,126,24);
    endSprite.collider="none";
    endSprite.img=endGameImg;
  }
}

function loadLevel(){
  ground.removeAll();
  sharp.removeAll();
  orbs.removeAll();
  finishLine.removeAll();

  if (lastlevel< level){
    level=1
    
  if (level===1){
    new Tiles(tilesMap1,0,0,50,50);
    mapUsed=tileMap1;
  }else if (level ===2){
    new Tiles(tileMap2,0,0,50,50)
    mapUsed=tileMap2;
  }
  
  }

  drawBackground()
}

function drawBackground() {

  let lastRow = mapUsed[mapUsed.length - 1]; //Get the final row of the current tile map.
  let numCols = lastRow.length; //Count how many tiles are in the row.
  let totalJourney = numCols * 50; //each tile is around 50px. this gives the total length

  let progress = map(box.x, 0, totalJourney, -100, 0);

  let c1 = color("#9933ff"); //colours for lerping
  let c2 = color("#4169e1");

  let amt = (sin(frameCount * 0.5) + 1) / 2; //Create a value that repeatedly changes between 0 and 1.
  let blend = lerpColor(c1, c2, amt); //lerp between two colours

  tint(blend); //turn on the tint
  image(bg, progress, 0, 800, 600); //draw and move background 
  noTint(); //remove tint on all other objects
}