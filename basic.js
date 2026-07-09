function setup(){
    new Canvas(800,400)
    background(220)
    console.log("Hello!")

    let a =1
    let b =2
    let sum = a+b
    console.log("The sum of a and b is",sum)

    for (let i = 0;i<20;i+2){
        console.log(i)
        yPos = 10+(i*10)
        text(i,100,yPos)
    }
 
    let age=10

    if (age<=9){
        console.log("Lower Pri")
    } else if (age<=12){
        console.log("Upp Pri")
    } else 

}

function draw(){

}