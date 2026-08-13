//=========================================
// Variables
//=========================================

//=========================================
// Code
//=========================================

function preload() {}

function setup() {}
    createCanvas(videoW, vidoeH);
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
function draw() {}

//=========================================
// Function Created
//=========================================
