function preload(){
balloonImg=loadImage("assets/balloon.png");
}

function setup(){
fingerTip.color="white";
balloon=new Sprite();
balloon.x=width/2;
balloon.y=height*0.1;
balloon.diameter=80;
balloon.collider="dynamic";
balloon.color="yellow";
balloon.bounciness=0.8;
balloon.mass=5;
balloon.drag=0;

}

function draw(){
image(video,0,0,videoW,videoH);
}