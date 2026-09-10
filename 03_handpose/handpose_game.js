

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
}


function gotHands(results) {
    hands = results;
}
function draw() {
    image(video, 0, 0, videoW, videoH);

    for(let i=0; i<hands.length; i++){
        let hand = hands[i];
        // loop through all the 21 keypoints
        for (let j = 0; j < hand.keypoints.length; j++) {
            let keypoint = hand.keypoints[8];

            // for every keypoint, draw a circle.
            circle(keypoint.x, keypoint.y, 10);
        }
    }
}