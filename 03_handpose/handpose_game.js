

//=========================================
// Variables
//=========================================
let handPose;
let video;
let videoW = 640;
let videoH = 480;
let hands=[];
let balloon;
let fingerTip;
//=========================================
// Code
//=========================================

function preload() {
    let options={
        flipped:true,
        runtime:"tfjs",
        modelType:"full",
        detectorModeUrl:undefined,
        landmarkModelUrl:undefined,
    };
    handPose = ml5.handPose(options);
}   

function setup() {
    world.gravity.y=1;
    createCanvas(videoW, videoH);
    let constraints = {
        video: {
            mandatory: {
                minWidth: videoW,
                minHeight: videoH
            },
            optional: [{ minFrameRate: 60 }]
        },
        audio: false,
        flipped: true
    };

    video = createCapture(constraints);
    video.size(640, 480);
    video.hide();

    handPose.detectStart(video, gotHands);

    fingerTip=new Sprite();
    fingerTip.diameter=60;
    fingerTip.collider="kinematic";
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

    leftWall=new Sprite();
    leftWall.x=0;
    leftWall.y=height/2;
    leftWall.width=10;
    leftWall.height=height;
    leftWall.collider="static";

    rightWall=new Sprite();
    rightWall.x=width;
    rightWall.y=height/2;
    rightWall.width=10;
    rightWall.height=height;
    rightWall.collider="static";

    topWall=new Sprite();
    topWall.x=width/2;
    topWall.y=0;
    topWall.width=width;
    topWall.height=10;
    topWall.collider="static";

    bottomWall=new Sprite();
    bottomWall.x=width/2;
    bottomWall.y=height;
    bottomWall.width=width;
    bottomWall.height=10;
    bottomWall.collider="static";
}


function gotHands(results) {
    hands = results;
}
function draw() {
    image(video, 0, 0, videoW, videoH);

    for(let i=0; i<hands.length; i++){ 
        let hand = hands[i]; 
        let keypoint = hand.keypoints[8]; 
        fingerTip.x=keypoint.x; 
        fingerTip.y=keypoint.y;
    }


}
