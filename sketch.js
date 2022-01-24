const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg.jpg";
var score = 0;

function preload() {
    getBackgroundImg();
     p_running=loadAnimation("sprites/personaje 1.png","sprites/personaje 2.png","sprites/personaje 3.png")
}

function setup(){
    var canvas = createCanvas(displayWidth, displayHeight-120);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(600,height,1600,20);
    persona=createSprite(100,height-100,40,20);
    persona.addAnimation("running",p_running);
    persona.scale=0.5;
    ground = createSprite(200,height,400,20);
    //slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    
     if(keyDown("space")&& persona.y >= 400) {
        persona.velocityY = -12;
     }
     persona.velocityY = persona.velocityY + 0.8;
     ground.display();
     persona.collide(ground);
     //slingshot.display();
   drawSprites();
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && persona.velocityY>=100){
       bird.trajectory = [];
       Matter.Body.setPosition(bird.body,{x:200, y:50});
       slingshot.attach(bird.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/Mexico_City");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg.jpg";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}