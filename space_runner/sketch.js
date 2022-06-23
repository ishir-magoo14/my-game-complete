var obstacles, spaceShip, back, over, missileImg, medalImg;
var PLAY = 1
var END = 0
var gameState = PLAY;
var score = 0 ;
var countd = 0;

//preload
function preload() {
background1 = loadImage("background3.png");
spaceShipImg = loadImage("pngfind.com-spaceship-png-transparent-3878988.png");
obImg = loadImage("pngfind.com-meteor-png-447721.png")
blastImg = loadAnimation("pngfind.com-energy-blast-png-1637037.png")
gameoImg = loadImage("game-over.png")
missileImg = loadImage("pngfind.com-missile-png-456979.png")
medalImg = loadImage("medal.png");
}

//setup
function setup() {
createCanvas(600,300) 

medal0 = createSprite(500, 270,50,50)
medal0.addImage(medalImg)
medal0.scale = 0.04
medal0.visible= false;

medal1 = createSprite(520, 270,50,50)
medal1.addImage(medalImg)
medal1.scale = 0.04;
medal1.visible= false;

medal2 = createSprite(540, 270,50,50)
medal2.addImage(medalImg)
medal2.scale = 0.04;
medal2.visible= false;

medal3 = createSprite(560, 270,50,50)
medal3.addImage(medalImg)
medal3.scale = 0.04;
medal3.visible= false;

spaceShip = createSprite(50,150,50,50);
spaceShip.addImage(spaceShipImg)
spaceShip.scale = 0.04;

obstaclesGroup = new Group()
missileGroup = new Group()


over = createSprite(300,150,50,50)
over.addImage(gameoImg)
over.scale = 0.3
over.visible = false;
}

//draw
function draw() {
background(182);
background(background1);

medal0.visible= false;
medal1.visible= false;
medal2.visible= false;
medal3.visible= false;

//gamestate play
if(gameState===PLAY){

    if(score >= 100){
      medal3.visible = true
    }
    
    if(score >= 75){
      medal2.visible = true;
    }
  
    if(score >= 50){
      medal1.visible= true;
    }
    
    if(score >= 25){
      medal0.visible = true;
    }
    if(score >=25){
      fill("pink")
    textSize(17)
    text("click 'a' key to shoot bullets" , 150 ,30)
    }
    
    

    if(score >= 5){
      
    }

    over.visible = false;

    if(keyDown("A") && score >= 25){
      missileLaunch();
    }

  
 

  score = score + Math.round(getFrameRate()/61);

  if(obstaclesGroup.isTouching(missileGroup)){ 
    for(var i=0;i<obstaclesGroup.length;i++){
       if(obstaclesGroup[i].isTouching(missileGroup)){
        
         obstaclesGroup[i].destroy() 
         missileGroup.destroyEach()
         // explosionSound.play(); 
         
         console.log(score);
       } 
    } 
  }

if(keyDown("space") && spaceShip.y >= 80){
    spaceShip.velocityY = -8;
}

spaceShip.velocityY = spaceShip.velocityY + 0.8


if(obstaclesGroup.isTouching(spaceShip) || spaceShip.y >= 300){
    
      gameState = END;
}
spawnobstacles();
}

//gamestate end
if(gameState===END){
    if(keyDown("S")){
      gameState = PLAY;
      over.visible = false;
      obstaclesGroup.destroyEach();
      spaceShip.destroy();
      score= 0;
      over.visible = false;

      spaceShip = createSprite(50,150,50,50);
      spaceShip.addImage(spaceShipImg)
      spaceShip.scale = 0.04;
    }

    

    console.log("stop");
    spaceShip.changeAnimation(blastImg);
    spaceShip.velocityY = 0;
    over.visible = true;
    obstaclesGroup.destroyEach();
    missileGroup.destroyEach();

    fill("pink")
    textSize(17)
    text("click 's' key to restart the game", 180, 290)
  
}


drawSprites();
textSize(25);
fill("yellow")
text("Score = "+ score ,10,30)




}

function spawnobstacles() {
    //write code here to spawn the clouds
    if (frameCount % 70 === 0) {
      var obstacle = createSprite(600,120,40,10);
      obstacle.y = Math.round(random(60,210));
      obstacle.addImage(obImg);
      obstacle.scale = 0.08;
      obstacle.velocityX = -3;
      
       //assign lifetime to the variable
       obstacle.lifetime = 200;
       
       
      //adjust the depth
      
      
      //add each cloud to the group
      obstaclesGroup.add(obstacle);
    }
    
    
  }
  function missileLaunch(){
    missile = createSprite(spaceShip.x,spaceShip.y,50,50)
    missile.addImage(missileImg)
    missile.velocityX = 5;
    missile.scale = 0.03;
    missileGroup.add(missile)

    
  }
 