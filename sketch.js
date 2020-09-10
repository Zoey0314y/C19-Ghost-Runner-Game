var bg,backgroundImage;
var ghost,ghostImage,tower,towerImage,door,doorImage,climber,climberImage;

var gamestate = "play";



function preload(){
 ghostImage = loadAnimation ("ghost-jumping.png","ghost-standing.png");
  
 towerImage = loadImage("tower.png");
 doorImage = loadImage("door.png");
 climberImage = loadImage("climber.png");
 spookySound = loadSound("spooky.wav");
  
  
}

function setup() {
 createCanvas(600,600);
 
 tower = createSprite(300,300,40,40);
 tower.addImage(towerImage);
 tower.velocityY = 1;
  
 ghost = createSprite(200,200,30,30);
 ghost.addAnimation("ghost",ghostImage);
 ghost.scale = 0.5;
  
  
 createGroup();
 doorGroup = new Group();
 climberGroup = new Group();
 invisibleBlockGroup = new Group();
 
  
  
}

function draw() {
  background("black");
  //spookySound.play();
  
  if(gamestate === "play"){
    if(keyDown("left_arrow")){
      ghost.x = ghost.x -3;
      
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x +3;
      
    }
    if(keyDown("space")){
      ghost.velocityY =-10;
      
    }
    ghost.velocityY = ghost.velocityY +0.5;
    
  if(tower.y > 400){
    tower.y = 300;
    
  }
    
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
  
  if(invisibleBlockGroup.isTouching(ghost)){
    ghost.destroy(); 
    gamestate = "end";
    
  }
  
  spawndoors();
  
  drawSprites();

}
if(gamestate === "end"){
  fill("yellow");
  textSize(30);
  text("gameover",250,250);
  
}
}
function spawndoors(){
  if(frameCount % 200 === 0){
  var door = createSprite(200,-50);
  var climber = createSprite(200,10);
  var invisibleBlock = createSprite(200,15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = true;
  door.x = Math.round(random(120,400));
  climber.x = door.x;
  invisibleBlock.x = door.x;
  door.addImage(doorImage);
  climber.addImage(climberImage);
  door.velocityY = 2;
  climber.velocityY = 2;
  invisibleBlock.velocityY = 2;
    
  ghost.depth = door.depth;
  ghost.depth = ghost.depth +1;
  
  door.lifetime = 300;
  climber.lifetime = 300;
  invisibleBlock.lifetime = 300;
  
  doorGroup.add(door);
  climberGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
  
  }
    
}















