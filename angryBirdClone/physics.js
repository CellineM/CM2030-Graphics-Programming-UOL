function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}


function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}

function setupPropeller(){
    propeller = Bodies.rectangle(150, 480, 200, 15,{isStatic: true, angle: angle}); 
    
    World.add(engine.world, [propeller]);
    
}

//updates and draws the propeller
function drawPropeller(){
    push();
    Body.setAngle(propeller, angle);
    Body.setAngularVelocity(propeller, angleSpeed);
    angle += angleSpeed;
    drawVertices(propeller.vertices);
    pop();
    
}

function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}

function drawBirds(){
  push();
    // I wrote this code
    for (var i=birds.length-1; i>=0; i--){
        image(angryBird, birds[i].position.x, birds[i].position.y - 20 , 40, 40);
    // end of code I wrote
        
        if(isOffScreen(birds[i]))
        {
            removeFromWorld(birds[i]);
            birds.splice(i, 1);
        }
        
    }
  
  pop();
}

//creates a tower of boxes
function setupTower(){
    var numOfRows = 6;
    var numOfCols = 3;
    var size = 80;
    var startX = width-size;
    var startY = height-size;
    for(var row = 0; row<numOfRows; row++){
        for(var col = 0; col<numOfCols; col++){
            var box = Bodies.rectangle(startX-(col*size), startY-(row*size), size, size);
            World.add(engine.world, [box]);
            boxes.push(box);
            //I wrote this code
            colors.push(color(random(255), random(255), random(255))); // the boxes will appear in random colour
//            colors.push(color(0, random(50, 200), 0));
            // end of code I wrote
        }
    }
}

//draws tower of boxes
function drawTower(){
  push();
  for(var i=0; i<boxes.length; i++){
      fill(colors[i]);
      drawVertices(boxes[i].vertices);
      
      if(isOffScreen(boxes[i])){
          removeFromWorld(boxes[i]);
          boxes.splice(i, 1);
          // I wrote this code
          score++;  // every tower that is off the screen, score +1 point
          return;
          // End of code I wrote
      }
      
  }
  pop();
}

function setupSlingshot(){
    slingshotBird = Bodies.circle(180, 180, 20,{friction: 0, restitution: 0.95, mass: 10});
    slingshotConstraint = Constraint.create({
        pointA: {x:200, y:200},
        bodyB: slingshotBird,
        pointB: {x:0, y:0},
        stiffness: 0.01,
        damping: 0.0001
    });
    
    World.add(engine.world, [slingshotBird, slingshotConstraint]);
}

//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  fill('orange');
    drawVertices(slingshotBird.vertices);
    drawConstraint(slingshotConstraint);
  pop();
}

function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}


////////////////////// lvl 2
// I wrote this code
function setupTower2(){
    numOfRows = 6;
    numOfCols = 4;
    size = 80;
// end of the code I wrote
    startX = width-size;
    startY = height-size;
    for(row = 0; row<numOfRows; row++){
        for(col = 0; col<numOfCols; col++){
            box = Bodies.rectangle(startX-(col*size), startY-(row*size), size, size);
            World.add(engine.world, [box]);
            boxes.push(box);
            // I wrote this code
            colors.push(color(random(255), random(255), random(255))); 
            // end of the code I wrote
        }
    }
}
function drawTower2(){
  push();
  for(var i=0; i<boxes.length; i++){
      fill(colors[i]);
      drawVertices(boxes[i].vertices);
      
      if(isOffScreen(boxes[i])){
          removeFromWorld(boxes[i]);
          boxes.splice(i, 1);
          // i wrote thhis code
          score2++;  // every tower that is off the screen, score +1 point
          return;
          // end of the code i wrote
      }
      
  }
  pop();
}
 