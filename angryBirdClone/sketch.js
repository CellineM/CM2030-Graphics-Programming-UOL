/*
The game is called the angryBird Clone, the game itself is similar to the actual game called angry birds. However, this is my own implementation of the game.
In this game, before starting the game, the user will see a page screen where the user can read the instructions on how to play the game.
Once the user press spacebar, the game will commence (level 1), and have 60 seconds to hit all the blocks out of the screen using slingshot and bird.
To hit the blocks using bird, the user can use the propeller by pressing right or left, the more time it's being pressed, the faster the propeller would go based on the direction pressed. When the propeller runs, the user can press b and the bird will appear based on where the current position of mouse.
When all the 18 blocks is out of the screen, the user will be shown the next splash screen on what the user have to do to win the game for level 2. 
Once the user press 'n', game2(level 2) will commence, and the user will have the same amount of time of 60 seconds to get the blocks out of the screen, but have a higher number of blocks to get rid of. If the user manage to get the blocks out within 60 seconds, the user will be shown a winning page, where the user win the game, if the user did not manage to get all of the blocks out within  60 seconds, the screen will be shown Game Over.
*/

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;

// I write this code
//////////////// additional for level 1
var score;
var timer = 60; // total of 60 secs
var backgroundSong;
var boingSong;
var boxOutSong;
var splashScreen = 0; // 1st page before the game start
var backgroundPic;
var angryBird;
var dingSound;
var cashRegister;
var yh= 20; // yh = y height - of the angry bird above the bottom of the screen.
// timer
var totalTimer; // the total time of the game + splash screen
var splashTimer; // timer for splash screen
var gameTime;
var timer2 = 60;
var yellowBird;
var blueBird;

/////////////////// splashScreen level 2
var lvlTwoScreen;
var nextLevelFont;
var nxtFont;
var scoreFont;
var score2 = 0;
var gameTime2; // timer for game in level 2
var splashTimer2; /// splash timer for level 2 splash screen

///////////////////// winScreen
var win;
var winPic;
var winSound;





///////////////////////////// load font/image/sound

function preload(){
    backgroundSong = loadSound("background.mp3")
    boingSong = loadSound("boing.mp3")
    boxOutSong = loadSound("boxout.mp3")
    backgroundPic = loadImage("backgroundpic.jpg")
    dingSound = loadSound("ding.mp3")
    angryBird = loadImage("angry-birds.png")
    cashRegister = loadSound("cash-register.mp3")
    lvlTwoScreen = loadImage("angryScreenTwo.jpg")
    nextLevelFont = loadFont("level2.ttf")
    nxtFont = loadFont("lvl22.otf")
    scoreFont = loadFont("Roboto-Regular.ttf")
    win = loadImage("win.jpeg")
    winFont = loadFont("youWin.otf")
    winPic = loadImage("win-logo.png")
    yellowBird = loadImage("yellowBird.png")
    winSound = loadSound("levelWin.mp3")
    blueBird = loadImage("blueBird.png")
    
}

function backgroundMusic(){
    backgroundSong.play();
    backgroundSong.loop();
    userStartAudio();
}
// end of the code 

function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();
    
// I write this code        
  score = 0; // start from 0
    
  setInterval(gameTimer, 1000); // gameTimer, 1000 =  1 sec
    
  setInterval(gameTimer2, 1000);
    
  backgroundMusic();
    
  firstSplashScreen(); // show the first splash screen first
   
}

function draw(){
    totalTimer = millis(); // the time are in milliseconds
    
    if(splashScreen == 0){   // if screen = 0, first splash screen will be shown
        firstSplashScreen()
    }
    else if(splashScreen == 1){  // else if screen = 1, the game function will be shown. Game play
        game()
    }
    else if(splashScreen == 2){
        secondSplashScreen()
    }
    else if(splashScreen == 3){
        game2()
    }
    else if(splashScreen == 4){
        winScreen()
    }
}

function firstSplashScreen(){
    splashTimer = totalTimer; 
    
    image(backgroundPic, 0, 0, 1000, 600);
    fill(0);
    textAlign(CENTER);
    textSize(40);
    text("WELCOME TO ANGRY BIRDZZZZZ PEW PEW", width/2, height/2);
    fill(169, 50, 38);
    textSize(20);
    text("Press Spacebar to Play!", width/2, height/2 + 40 );
    text("Press B - New Angry Bird!", width/2, height/2 + 70);
    text("Press R - Reset Slingshot", width/2, height/2 + 100);
    text("Shoot 18 boxes in 60 sec!", width/2, height/2 + 130);
    
    image(yellowBird, 240, 460, 150, 138);
    image(yellowBird, 400, 455, 100, 88);
    image(yellowBird, 490, 445, 60, 48 );    
    
    image(blueBird, 60, 380, 150, 150);

    
}
// end of the code i write 


function game() {
  background(0);
  Engine.update(engine);
  drawGround();
  drawPropeller();
  drawTower();
  drawBirds();
  drawSlingshot();
   
// I wrote this code    
  numberScore();
    
  if(timer >= 10){ // timer for the game played
      splashTimer = splashTimer; // stop splashTimer and start gameTime
      gameTime = int((totalTimer - splashTimer) / 1000);
      text("0:" + timer, 50, 50 );
  }
   if(timer < 10){
      text("0:0" + timer, 50, 50 );
  }
   if(timer == 0){
      textAlign(CENTER);
      textFont(nextLevelFont);
      text("GAME OVER", width/2, height/2);
       game.stop();
  }    
}
// end of the code i write

//use arrow keys to control propeller
function keyPressed(){
  if (keyCode == LEFT_ARROW){
    //your code here
      angleSpeed += 0.01;
  }
  else if (keyCode == RIGHT_ARROW){
    //your code here
      angleSpeed -= 0.01;
  }
}

function keyTyped(){
  //if 'b' create a new bird to use with propeller
  if (key==='b'){
    setupBird();
    // i write this code
    dingSound.play();     // when press 'b' the sound will play
    // end of the code i write  
  }

  //if 'r' reset the slingshot
  if (key==='r'){
    // i write this code
    cashRegister.play();     // when press 'r', the sound will play
    // end of the code i wrote
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
      
  }
    
  if (key === ' '){
      if(splashScreen == 0){
        splashScreen = 1;
          // i write this code 
        backgroundMusic.loop(); // when the song ends, the song will play again.
        backgroundMusic.play(); // song play
         
    }
  }
    
  if (key === 'n'){
      if(splashScreen == 2){ // when press 'n' on screen 2, it will proceed to the screen 3 = game2()
          splashScreen = 3;
      }
  }
}
// end of the code I wrote



//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
    // i write this code
    boingSong.play();
    // end of the code i wrote
}

//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}

//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
    boxOutSong.play();
}

function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}

function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}

// i write this code 
// display the score on the screen
function numberScore(){
    noStroke();
    fill(255);
    textSize(30);
    textAlign(LEFT);
    text(score, 50, 100);
    
    if(score >= 18){ // when get 18 pts, move to the next level
        splashScreen = 2;
        setupTower2(); // the colour taken from setupTower2
        setupSlingshot(); // move the slingshot to its original position
        
    }
    
}


function gameTimer(){  
    if((timer - gameTime) > 0){   // as long as the timer of the game is above 0 secs, decrease by 1 sec each time
        timer--; // decrease the countdown timer.
    } 
}

//////////////////////////////////////////// lvl 2

function secondSplashScreen(){
    splashTimer2 = totalTimer;
    
    image(lvlTwoScreen, 0, 0, 1000, 600);
    textFont(nextLevelFont); // different font
    textAlign(CENTER);
    fill(155, 255, 100);
    textSize(80);
    text("LEVEL 2!!", width/2, height/2 - 80);
    
    textFont(nxtFont);
    textSize(50);
    fill(255);
    text("Hit all of the boxes within 60 secs", width/2, height/2+110);
    
    textSize(75);
    fill(255, 77, 77);
    text("GOODLUCK LITTLE BIRDS!", width/2, height/2 + 200)
    
    textSize(50);
    fill(255);
    text("press N to go to start level 2", width/2, height/2 + 250);
    
}
// end of the code i wrote

///////////////////////////////// lvl 2 game
// i wrote this code
function game2(){
// end of the code i wrote
  background(0);
  Engine.update(engine);
  drawGround();
  drawPropeller();
  drawTower2();
  drawBirds();
  drawSlingshot();
// i wrote this code  
  numberScore2();
    
    // timer for game 2
    if(timer2 >= 10){
      splashTimer2 = splashTimer2;
      gameTime2 = int((totalTimer - splashTimer2) / 1000);
      text("Timer: ", 10, 50);
      text("0:" + timer2, 100, 52 );
  }
   if(timer2 < 10){
      text("Timer: ", 10, 50);
      text("0:0" + timer2, 100, 52 );
  }
   if(timer2 == 0){
      textAlign(CENTER);
      textFont(nextLevelFont);
      text("GAME OVER", width/2, height/2);
       game2.stop();
  }
    
}

function numberScore2(){
    noStroke();
    fill(255);
    textSize(30);
    textFont(scoreFont);
    textAlign(LEFT);
    text("Score: ", 10, 98);
    text(score2, 100, 100);
    
    if(score2 >= 24){ 
        splashScreen = 4;
        winSound.play();
        winSound.loop();
    }
    
}

function gameTimer2(){  
    if((timer2 - gameTime2) > 0){
        timer2--;
    } 
}



//////////////////////////////////////////////////// win
var r;
var g;
var b;
var col4;

function winScreen(){
    image(win, 0, 0, 1000, 600);
    
    image(winPic, 50, 195, 80, 170);
    image(winPic, 890, 195, 80, 170);
    
    // make the colour of the text in random colour.
    r = random(255);
    g = random(50, 200);
    b = random(150);
    fill(r, g, b);
    textFont(winFont);
    textSize(80);
    textAlign(CENTER);
    text("!!! You WIN !!!!", width/2, height/2);
    backgroundSong.stop(); // background song will stop, to let the win song play, if not the 2 songs play together and they'll clash
    
}
// end of the code i wrote





