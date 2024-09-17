var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

// i wrote this code
///////////////////////////// additional level 1
var score;
var timer = 60;
var splashScreen = 0; // page shown before the game start
var backgroundScreen;
var backgroundMusic;
var hit;
var dead;
var rocket; // the spaceship icon
var totalTimer;
var gameTime;
var splashTimer;
var spaceship1;


// level 2  
var score2 = 0; // game score for level 2 start from 0.
var gameTime2;
var splashTimer2;
var timer2 = 60;
var spaceship2;
var asteroids2;
var winGame; // font
var winSound; // when you won the game sound effect
var levelFont;
var ufo;
var robotoFont;




// load font, image, sound
function preload(){
    backgroundScreen = loadImage("background.jpg");
    backgroundMusic = loadSound("save.mp3");
    hit = loadSound("hit.ogg");
    dead = loadSound("dead.wav");
    rocket = loadImage("rocket.png");
    winGame = loadFont("youWin.otf");
    winSound = loadSound("winSound.mp3");
    spaceship1 = loadImage("spaceship1.png");
    levelFont = loadFont("paladin.ttf");
    ufo = loadImage("ufo.png");
    robotoFont = loadFont("robotoRegular.ttf");
    
}

function backgroundSong(){
    backgroundMusic.play();
    backgroundMusic.loop(); // when the background song end, the song will repeat.
    userStartAudio();
}
// end of the code i wrote
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
// i wrote this code 
  spaceship2 = new Spaceship();
  asteroids2 = new AsteroidSystem();
// end of the code i wrote

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
    
  var locA = createVector(50, 50);
  var sizeA = 10;
  var locB = createVector(100, 100);
  var sizeB = 10;
  var t = isInside(locA, sizeA, locB, sizeB);
  console.log(t);
    
  locA = createVector(50, 50);
  sizeA = 10;
  locB = createVector(55, 55);
  sizeB = 10;
  t = isInside(locA, sizeA, locB, sizeB);
  console.log(t);
   
// i wrote this code    
  // additional    
  score = 0;
  //setInterval(gameTime, 1000); // 1000 = 1 sec
    
  firstSplashPage();
  backgroundSong();
    
}

function draw(){
    totalTimer = millis(); // change the timer to milliseconds
    
    if (splashScreen == 0){ // if splashScreen = 0, the first splash screen will be shown.
        firstSplashPage()
    }
    else if(splashScreen == 1){ // if splashscreen = 1, the game function will be shown. game play.
        game1()
    }
    else if(splashScreen == 2){
        lvl2Screen()
    }
    else if(splashScreen == 3){
        game2()
    }
    else if(splashScreen == 4){
        winScreen()
    }
    
}

function firstSplashPage(){
    splashTimer = totalTimer;
    
    image(backgroundScreen, 0, 0, 1400, 1000);
    fill(255);
    textAlign(CENTER);
    textSize(40);
    text("!! WELCOME TO ASTEROIDS GAME !! ", width/2, height/2-120);
    textSize(35);
    text("Rules to the Game: ", width/2, height/2 - 50);
    textSize(30);
    text("- Arrow keys: To move the spaceship ", width/2, height/2);
    text("- SpaceBar: To Shoot", width/2, height/2+30);
    
    textSize(35);
    text("Objectives: ", width/2, height/2 + 120);
    textSize(30);
    text("Shoot 20 asteroids within 60 seconds", width/2, height/2 + 170);
    text("Press S to start the game", width/2, height/2 + 220);
    
    textSize(40);
    text("BETTER SURVIVE COMRADES", width/2, height/2 + 350); 
    
    
    image(spaceship1, 840, 630, 70, 70);
    image(spaceship1, 700, 450, 80, 80);
    
}
// end of the code i wrote


////////////////////////////////////////////////// game1 = level 1
function game1() {  
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
// i wrote this code
  gameScore();
  gameTimer();
// end of the code i wrote
    
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i=0; i<asteroids.locations.length; i++){
        var asteroidsLoc = asteroids.locations[i];
        var asteroidsDiam = asteroids.diams[i];
        if(isInside(asteroidsLoc, asteroidsDiam, spaceship.location, spaceship.size)){
            gameOver();
        }
    }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i=0; i<asteroids.locations.length; i++){
        var asteroidsLoc = asteroids.locations[i];
        var asteroidsDiam = asteroids.diams[i];
        if(isInside(asteroidsLoc, asteroidsDiam, earthLoc, earthSize.y)){
            gameOver();
        }
    }

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location, spaceship.size, earthLoc, earthSize.y)){
         gameOver();
     }

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.y)){
         spaceship.setNearEarth();
     }

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    var bulletSys = spaceship.bulletSys;
     var bullets = bulletSys.bullets;
     for(var i=0; i<bullets.length; i++){
         for(var j=0; j<asteroids.locations.length; j++){
             var asteroidsLoc = asteroids.locations[j];
             var asteroidsDiam = asteroids.diams[j];
             if(isInside(asteroidsLoc, asteroidsDiam,  bullets[i], bulletSys.diam)){
                 asteroids.destroy(j);
                 // i wrote this code
                 score++;
                 return;
                 // end of the code i wrote
             }
         }
     }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    var d = dist(locA.x, locA.y, locB.x, locB.y);
    var maxDist = sizeA/2 + sizeB/2;
    if(maxDist < d){
        return false;
    } else{
        return true;
    }
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
    // i wrote this code
    spaceship2.fire();
      
    hit.play();
  }
    
  if(key === 's'){
      if(splashScreen == 0){
          splashScreen = 1;
          backgroundSong.loop();
          backgroundSong.play();
          
      }
  }
    
    if(key === "n"){
        if(splashScreen == 2){
            splashScreen = 3;
        }
    }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
    
    if(dead.isPlaying() == false){
        dead.play();
    }
}
//end of the code i wrote

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}

// i wrote this code
// score that will be displayed on the screen
function gameScore(){
    noStroke();
    fill(255);
    textSize(30);
    textAlign(LEFT);
    text('Score: ', 10, 30);
    text('/ 20', 140, 30);
    text(score, 110, 30);
    
    if(score >= 20){ // change to 20
        splashScreen = 2;
    }
}

// timer
function gameTimer(){
    splashTimer = splashTimer; // stop the timer for splash screen
    gameTime = int((totalTimer - splashTimer)/1000);
    
    fill(255);
    textSize(30);
    text("Timer: ", 10, 60 );
    text(timer-gameTime, 100, 62);
    
    if(gameTime >= timer){
      fill(255);
      textSize(80);
      textAlign(CENTER);
      text("GAME OVER", width/2, height/2);
      dead.play();
      game1.stop();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////lvl 2 splash screen
function lvl2Screen(){
  splashTimer2 = totalTimer;

  background(0);
  sky();
    
  image(ufo, 30, 30, 50, 50);
  image(ufo, 1110, 30, 50, 50);
  image(ufo, 30, 725, 50, 50);
  image(ufo, 1110, 725, 50, 50);
    
  textFont(levelFont);
  textAlign(CENTER);
  fill(200, 100, 255);
  textSize(40);
  text("CONGRATULATIONS!", width/2, height/2-40);
  fill(260, 255, 100);
  textSize(30);
  text("Press N to go to level 2", width/2, height/2+ 20);
  fill(105, 63, 50);
  text("Shoot 40 asteroids within 60 seconds", width/2, height/2 + 60);
  fill(255, 165, 0);
  textSize(40);
  text("GOODLUCK COMRADES", width/2, height/2+ 200);
    
}
// end of the code i wrote

//////////////////////////////// game 2 = level 2
function game2(){
  background(0);
  sky();
  drawEarth();
// i wrote this code 
  spaceship2.run();
  asteroids2.run();
  
  checkCollisions2(spaceship2, asteroids2);
    
  gameScore2();
  gameTimer2();
    
}
// end of the code i wrote

function checkCollisions2(spaceship2, asteroids2){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i=0; i<asteroids2.locations.length; i++){
        var asteroids2Loc = asteroids2.locations[i];
        var asteroids2Diam = asteroids2.diams[i];
        if(isInside(asteroids2Loc, asteroids2Diam, spaceship2.location, spaceship2.size)){
            gameOver();
        }
    }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i=0; i<asteroids2.locations.length; i++){
        var asteroids2Loc = asteroids2.locations[i];
        var asteroids2Diam = asteroids2.diams[i];
        if(isInside(asteroids2Loc, asteroids2Diam, earthLoc, earthSize.y)){
            gameOver();
        }
    }

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship2.location, spaceship2.size, earthLoc, earthSize.y)){
         gameOver();
     }

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship2.location, spaceship2.size, atmosphereLoc, atmosphereSize.y)){
         spaceship2.setNearEarth();
     }

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    var bulletSys = spaceship2.bulletSys;
     var bullets = bulletSys.bullets;
     for(var i=0; i<bullets.length; i++){
         for(var j=0; j<asteroids2.locations.length; j++){
             var asteroids2Loc = asteroids2.locations[j];
             var asteroids2Diam = asteroids2.diams[j];
             if(isInside(asteroids2Loc, asteroids2Diam,  bullets[i], bulletSys.diam)){
                 asteroids2.destroy(j);
                 // i wrote this code
                 score2++;
                 return;
                 
             }
         }
     }
}


function gameScore2(){
    noStroke();
    fill(255);
    textFont(robotoFont);
    textSize(30);
    textAlign(LEFT);
    text('Score: ', 10, 30);
    text('/ 40', 140, 30)
    text(score2, 110, 30);
    
    if(score2 >= 40){ // change to 40
        splashScreen = 4; // if score >= 40, win page will be shown.
    }
}

function gameTimer2(){
    splashTimer2 = splashTimer2; // stop the timer for splash screen
    gameTime2 = int((totalTimer - splashTimer2)/1000);
    
    fill(255);
    textFont(robotoFont);
    textSize(30);
    text("Timer: ", 10, 60 );
    text(timer2-gameTime2, 100, 62);
    
    if(gameTime2 >= timer2){
      fill(255);
      textSize(80);
      textAlign(CENTER);
      text("GAME OVER", width/2, height/2);
      dead.play();
      game2.stop();
    }
}



////////////////////////////////////////////////////////// make win screen // splashpage 4
var r;
var g;
var b;

function winScreen(){
    background(0);
    sky();
    
    r = random(255);
    g = random(255);
    b = random(255);
    
    fill(r, g, b);
    textFont(winGame);
    textAlign(CENTER);
    textSize(80);
    text("You WIN!", width/2, height/2);
    
    backgroundMusic.stop();
    
    if(winSound.isPlaying() == false){
        winSound.play();
    }
    
}
// end of the code i wrote










