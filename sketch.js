const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world
var ninja, ninja_running, thunder
var obsGroup, obs1Image, obs2Image, obs3Image
var bg, train, trainImg
var drops=[]
var a=0
var gameState=0
var coinGroup, coinA, coinSound
var score=0
var start

function preload(){
ninja_running = loadAnimation('Images/n1.png','Images/n2.png','Images/n3.png','Images/n4.png','Images/n5.png','Images/n6.png')
ninja_end = loadAnimation('Images/n1.png')
thunder= loadAnimation('Images/thunderbolt/1.png','Images/thunderbolt/2.png','Images/thunderbolt/3.png','Images/thunderbolt/4.png')
bg=loadImage('Images/bg.png')
bg2=loadImage('Images/night.jpg')
trainImg=loadImage('Images/trainside.png')
thunder= loadAnimation('Images/thunderbolt/1.png','Images/thunderbolt/2.png','Images/thunderbolt/3.png','Images/thunderbolt/4.png')
obs1Image=loadImage('Images/obs1.png')
obs2Image=loadImage('Images/obs2.png')
obs3Image=loadImage('Images/obs3.png')
coinA=loadAnimation('Images/coin0.png')
coinSound=loadSound('Sound/coin.mp3')

}

function setup(){
    var canvas = createCanvas(displayWidth, displayHeight);
    engine = Engine.create();
    world = engine.world;
    train=createSprite(displayWidth/2,displayHeight-150,10,10)
    train.scale=2
    train.velocityX=-10
    train.setCollider('rectangle',0,0,displayWidth,100)
    train.addImage(trainImg)
    ninja=createSprite(displayWidth/2-200,displayHeight/2+50,10,10)
    ninja.addAnimation("run", ninja_running)
    ninja.addAnimation("end", ninja_end)
    ninja.scale=0.5
    ninja.setCollider('rectangle',0,0,250,200)
    obsGroup=createGroup()
    coinGroup=createGroup();
    start=createSprite(displayWidth/2,displayHeight/2,50,50)
    start2=createSprite(displayWidth/2,displayHeight/2,50,50)
    //add image
   
    /*if(frameCount%100===0){
        for(var i =0; i<100; i++){
            drops.push(new Drops(random(0,displayWidth),random(0,displayHeight),5))
        }
    }
    */
    
}

function draw(){
    Engine.update(engine)
    /*for(var i=0;i<100;i++){
        drops[i].display();
        drops[i].update();
    }*/
    if (gameState===0){
        background(0)
        ninja.visible=false
        train.visible=false
        stroke('aqua')
        strokeWeight(4)
        fill('white')
        textSize(21)
        //text
        if(mousePressedOver(start)){
            gameState=1
        }
    }
    if(gameState===1){
        background(bg)
        play();
        if(score===100){
            gameState=2

        }
    }
    if (gameState===2){
        background(0)
        ninja.visible=false
        train.visible=false
        stroke('aqua')
        strokeWeight(4)
        fill('white')
        textSize(21) 
        if(mousePressedOver(start2)){
            gameState=3
    }
    if (gameState===3){
        background(bg2)
        play();
        spawnThunder();
          for(var i=0;i<100;i++){
        drops[i].display();
        drops[i].update();
    }


}
    
   ninja.collide(train)
 
    
    //spawnThunder();
    
    
    if(gameState===2){
        textSize(60)
        fill("red")
        text("GAME OVER",displayWidth/2, displayHeight/2-100) 
     }
  drawSprites();
}   

function keyPressed(){
    if(keyIsDown(RIGHT_ARROW)){
        //Matter.Body.setPosition(umbrella.body,{x:umbrella.body.position.x+4, y:umbrella.body.position.y})
        //man.x=man.x+4
    }   
}
function spawnThunder(){
    if(frameCount%50===0){
        var t = createSprite(random(0,displayWidth),50,10,10)
        t.addAnimation('lightning',thunder);
        t.lifetime=50
    }
}
function spawnOBS(){
    if(frameCount%100===0){
        var obs=createSprite(displayWidth-100,displayHeight/2+40,10,10)
        obs.scale=0.6
        obs.velocityX=-10
        obs.setCollider("circle",0,0,20)
        var r= Math.round(random(1,3))
        console.log(r)
        switch(r){
            case 1:obs.addImage(obs1Image);
            break;
            case 2:obs.addImage(obs2Image);
            break;
            case 3:obs.addImage(obs3Image);
            break;
            

        }
        obsGroup.add(obs)
        obs.lifetime=displayWidth-100
    }
}
function spawnCoins(){
    if (frameCount%Math.round(random(50,90))===0){
        var coin=createSprite(displayWidth-100,Math.round(random(displayHeight/2-50,displayHeight/2-100)),10,10)
        coin.scale=0.4
        coin.addAnimation("animation", coinA)
        coin.lifetime=displayWidth-100
        coin.velocityX=-10
        coinGroup.add(coin)
    }
}
function spawnScore(){
    textSize(35)
    stroke("aqua")
    strokeWeight(4)
    fill('black')
    text("SCORE:"+ score, displayWidth-200,70)
}

function play(){
    spawnScore();
    ninja.visible=true
    train.visible=true
    start.destroy();
        if (keyWentDown("space")&&ninja.y>displayHeight/2-49){
            ninja.y-=200
            }
           ninja.velocityY+=0.5
        if(train.x<50){
            train.x=displayWidth/2    
        }
        spawnOBS();
        spawnCoins();
        for(var i=0; i<obsGroup.length;i++){
            obsGroup.get(i).rotation=a
            a=a+5
            if(a>300){
                a=0
            }
        }
        if(obsGroup.isTouching(ninja)){
            gameState=2
            train.velocityX=0 
        }
        if(coinGroup.isTouching(ninja)){
            score+=10
            coinGroup[0].destroy();
            coinSound.play()
        }
    }