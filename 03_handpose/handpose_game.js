

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
let bounceSound
//===============
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

    bounceSound = loadSound("assets/bounce.mp3");
} function setup() {
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
}
```javascript
//=========================================
// Variables
//=========================================
let handPose;
let video;
let videoW = 640;
let videoH = 480;
let hands = [];
let balloon;
let ball;
let fingerTip;
let bounceSound;

//=========================================
// Code
//=========================================

function preload() {
    let options = {
        flipped: true,
        runtime: "tfjs",
        modelType: "full",
        detectorModeUrl: undefined,
    };

    handPose = ml5.handPose(options);

    bounceSound = loadSound("assets/bounce.mp3");
}

function setup() {
    createCanvas(videoW, videoH);

    world.gravity.y = 1;

    //=========================================
    // Camera
    //=========================================
    video = createCapture(VIDEO);
    video.size(videoW, videoH);
    video.hide();

    handPose.detectStart(video, gotHands);

    //=========================================
    // Finger tip
    //=========================================
    fingerTip = new Sprite();
    fingerTip.diameter = 30;
    fingerTip.collider = "kinematic";
    fingerTip.color = "white";

    //=========================================
    // Balloon
    //=========================================
    balloon = new Sprite();
    balloon.x = width / 2;
    balloon.y = 100;
    balloon.diameter = 70;
    balloon.collider = "dynamic";
    balloon.color = "red";
    balloon.bounciness = 0.8;

    //=========================================
    // Ball
    //=========================================
    ball = new Sprite();
    ball.x = width / 2;
    ball.y = 200;
    ball.diameter = 40;
    ball.collider = "dynamic";
    ball.color = "blue";
    ball.bounciness = 0.9;

    //=========================================
    // Walls
    //=========================================

    // Left wall
    let leftWall = new Sprite(0, height / 2, 10, height, "static");

    // Right wall
    let rightWall = new Sprite(width, height / 2, 10, height, "static");

    // Top wall
    let topWall = new Sprite(width / 2, 0, width, 10, "static");

    // Bottom wall
    let bottomWall = new Sprite(width / 2, height, width, 10, "static");
}

//=========================================
// Hand Pose
//=========================================
function gotHands(results) {
    hands = results;
}

//=========================================
// Draw
//=========================================
function draw() {
    image(video, 0, 0, videoW, videoH);

    //=========================================
    // Move finger tip to index finger
    //=========================================
    for (let i = 0; i < hands.length; i++) {

        let hand = hands[i];

        // Index finger tip = keypoint 8
        let keypoint = hand.keypoints[8];

        fingerTip.x = keypoint.x;
        fingerTip.y = keypoint.y;
    }

    //=========================================
    // Balloon collision
    //=========================================
    if (balloon.collides(fingerTip)) {
        balloon.vel.y = -8;

        if (bounceSound && !bounceSound.isPlaying()) {
            bounceSound.play();
        }
    }

    //=========================================
    // Ball collision
    //=========================================
    if (ball.collides(fingerTip)) {
        ball.vel.y = -8;

        if (bounceSound && !bounceSound.isPlaying()) {
            bounceSound.play();
        }
    }
}
```
