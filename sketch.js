const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var bg, edges;
var gameState = "start" 

function preload()
{
rocketdown = loadImage('rocketdown.png')
rocketleft = loadImage('rocketleft.png')
rocketright = loadImage('rocketright.png')
rocketup = loadImage('rocketupimage.png')
bgimg = loadImage('bgimg.jpeg')
openingpicture = loadImage('opening picture.png') 
brick = loadImage('brick.png')
}

function setup() {
	createCanvas(1000,600);

	//creating the sprites
  
  //THE BG IMG 
	bg = createSprite(700,300)
	bg.addImage(openingpicture)
	bg.scale = 0.2
	bg.visible = false

  //The PC
  player = createSprite(90,520)
  player.addImage(rocketup);
  player.scale = 0.7;
  

  //THE MAZE - NPC
  wall1 = createSprite(50, 500, 10, 300);
  wall2 = createSprite(150, 550, 10, 200);
  wall3 = createSprite(350, 450, 400, 10);
  wall4 = createSprite(250, 350, 400, 10);
  wall5 = createSprite(455,255, 10, 200);

  //THE MOVING WALL
  wall6 = createSprite(555,250, 10, 20);
  wall6.addImage(brick);
  wall6.velocityY = -4;

  wall7 = createSprite(250,157,400,10); 
  wall8 = createSprite(555,112,10,100);
  wall9 = createSprite(360,60,400,10);
  wall10 = createSprite(161,40,10,50);

  wall1.shapeColor="red";
  wall2.shapeColor="red";
  wall3.shapeColor="red";
  wall4.shapeColor="red";
  wall5.shapeColor="red";
  //wall6.shapeColor="red";
  wall7.shapeColor="red";
  wall8.shapeColor="red";
  wall9.shapeColor="red";
  wall10.shapeColor="red";

  wall1.visible = false;
  wall2.visible = false;
  wall3.visible = false;
  wall4.visible = false;
  wall5.visible = false;
  wall6.visible = false;
  wall7.visible = false;
  wall8.visible = false;
  wall9.visible = false;
  wall10.visible = false;


  //Edges
  edges = createEdgeSprites();

  //PLANET MARS
  mars = createSprite(880, 70);
  mars.shapeColor="red";
  mars.visible = false;
  
	//Engine.run(engine);
  
}


function draw() {
  //rectMode(CENTER);
  background(bgimg);

  drawSprites();

  ///////---------------------------------------> GAMESTATE  __ START <---------------------------------------------

  if(gameState==="start"){
	
    bg.visible = true;

    fill ("white");
    stroke ("black");
    strokeWeight(5);
    textSize(20);
    text("PRESS SPACE TO PLAY ",590,440);

    if(keyCode === 32){
      gameState = "play";
    }
  }

  ///////---------------------------------------> GAMESTATE  __ PLAY <---------------------------------------------

  if(gameState==="play"){

   bg.visible = false

   //THE MOUSE CURSOR
   fill("white");
   text(mouseX+','+ mouseY,mouseX,mouseY);

   //PLAYER IMAGE CHANGE
   if(keyIsDown(DOWN_ARROW)){
    player.addImage(rocketdown);
    player.setCollider("rectangle", 0, 0, 35, player.height);
    playerMovment(0, 6)
   }

   if(keyIsDown(RIGHT_ARROW)){
    player.addImage(rocketright);
    player.setCollider("rectangle", 0, 0, player.width, 35);
    playerMovment(6, 0)
   }

   if(keyIsDown(LEFT_ARROW)){
    player.addImage(rocketleft);
    player.setCollider("rectangle", 0, 0, player.width, 35);
    playerMovment(-6, 0)
   }

   if(keyIsDown(UP_ARROW)){
    player.addImage(rocketup);
    player.setCollider("rectangle", 0, 0, 35, player.height);
    playerMovment(0, -6)
   }

   //THE MAZE 
    wall1.visible = true;
    wall2.visible = true;
    wall3.visible = true;
    wall4.visible = true;
    wall5.visible = true;
    wall6.visible = true;
    wall7.visible = true;
    wall8.visible = true;
    wall9.visible = true;
    wall10.visible = true;

   //THE LIMIT OF THE 6TH WALL
   if(wall6.y <= 160){
    wall6.velocityY = 4;
   }

   if(wall6.y >= 450){
    wall6.velocityY = -4;
   }


   //THE PLANET MARS
   mars.visible = true;

   //WIN STATE
   if(player.isTouching(mars)){
     gameState="win"
   }

   //Setting the position of the player back to it's initial position when it touches the walls of the maze
   if(player.isTouching(wall1) || player.isTouching(wall2) ||
   player.isTouching(wall3) ||player.isTouching(wall4) ||
   player.isTouching(wall5) ||player.isTouching(wall6) ||
   player.isTouching(wall7) ||player.isTouching(wall8) ||
   player.isTouching(wall9) ||player.isTouching(wall10) ){

    player.x = 90;
    player.y = 520;

   }

 
  }

  ///////---------------------------------------> GAMESTATE  __ END <---------------------------------------------
  if(gameState === "end"){

    wall1.visible = false;
    wall2.visible = false;
    wall3.visible = false;
    wall4.visible = false;
    wall5.visible = false;
    wall6.visible = false;
    wall7.visible = false;
    wall8.visible = false;
    wall9.visible = false;
    wall10.visible = false;

  }

  ///////---------------------------------------> GAMESTATE  __ WIN <---------------------------------------------
  if(gameState === "win"){
    
    wall1.visible = false;
    wall2.visible = false;
    wall3.visible = false;
    wall4.visible = false;
    wall5.visible = false;
    wall6.visible = false;
    wall7.visible = false;
    wall8.visible = false;
    wall9.visible = false;
    wall10.visible = false;

    player.x = 90;
    player.y = 520;

  }
  
 
}

function playerMovment(x, y){
  player.x = player.x + x;
  player.y = player.y + y;
}

