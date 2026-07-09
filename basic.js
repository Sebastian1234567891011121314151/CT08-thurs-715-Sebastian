function setup(){
    new Canvas(800,400)
    background(220)
    console.log("Hello!")

    let a =1
    let b =2
    let sum2 = a+b
    console.log("The sum of a and b is",sum2)
    let sum=0
    for (let i = 0;i<20;i+2){
        sum+=i
    }
    console.log(sum)

}

function draw(){

}