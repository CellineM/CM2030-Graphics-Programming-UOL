// i wrote this code
var speed;
// end of the code i wrote
function setup() {
    createCanvas(900, 700);
}

var sun = 0;
var earth = 0;
var moon = 0;
// i wrote this code
var moon2 = 0;
var asteroids = 0;
// end of the code i wrote
function draw() {
    background(0);
    speed = frameCount;

    // SUN
    push();
    translate(width/2, height/2);
    rotate(sun);
    // i wrote this code
    celestialObj(color(255,150,0), 200); // SUN
    // end of the code i wrote
    sun+= 0.01;
    pop();
    
    // EARTH
    push();
    translate(width/2, height/2);
    rotate(sun);
    
    // translate from sun and rotate
    translate(300, 0, width/4, height/4);
    // i wrote this code
    rotate(radians(speed));
    celestialObj(color(0, 0, 255), 80); // EARTH
    // end of the code i wrote
    earth+= 0.1;
    pop();
    
    // moon
    push();
    // follow sun to the centre
    translate(width/2, height/2);
    rotate(sun);
    
    //translate from sun and rotate
    translate(300, 0, width/4, height/4);
    rotate(radians(speed));// earth
    
    // translate from earth and rotate
    translate(100, 0, width/8, height/8);
    rotate(radians(speed * (-2)));
    
    // i wrote this code
    celestialObj(color(255, 255, 255), 30); // MOON
    // end of the code i wrote
    moon+= 0.5;
    pop();
    
    // i wrote this code
    // moon 2
    push();
    translate(width/2, height/2);
    rotate(sun);
    
    translate(300, 0, width/4, height/4);
    rotate(radians(speed));// earth
    
    translate(-90, 0, width/8, height/8);
    rotate(radians(speed * (2))); // moon 2
    celestialObj(color(255, 255, 255), 35);
    moon2+= 0.5;
    pop();
    
    // asteroids
    push();
    translate(width/2, height/2);
    rotate(sun);
    
    translate(300, 0, width/4, height/4);
    rotate(radians(speed));// earth
    
    translate(100, 0, width/8, height/8);
    rotate(radians(speed * (-2))); // moon
    
    translate(30, 0, width/10, height/10);
    rotate(radians(speed * (0.5))); // asteroids
    celestialObj(color(255, 102, 102), 20);
    asteroids+= 0.01;
    pop();
    
// end of the code i wrote  
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
