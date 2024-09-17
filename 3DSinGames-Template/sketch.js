var confLocs;  // store the location of each confetti
var confTheta; // store the initial angle of each confetti

// i wrote this code
var speedSlider; // slider to adjust the speed of the 3dSinGames
var textureTypes // to change the texture of the 3DSinGames
// end of the code i wrote

function setup() {
    createCanvas(900, 800, WEBGL);
    camera(800, -600, 800, 0, 0, 0, 0, 1, 0);
    angleMode(DEGREES);
    confLocs = [];
    confTheta = [];
    
    // i wrote this code
    // slider for speed
    speedSlider = createSlider(0, 10, 3, 0.1);
    speedSlider.position(900, 50);
    
    //createSelect -  Drop down box to choose the types of textures
    textureTypes = createSelect(); 
    textureTypes.position(910, 80);
    textureTypes.option('Default'); // normal, no change in texture is made
    textureTypes.option('Specular'); // when light is reflected
    textureTypes.option('Ambient'); // when there is no light
    textureTypes.changed(texture);
    // end of the code i wrote
    
    // spread confetti all over the structure
    for(var i = 0; i<200; i++){
        random(-500, 500);
        var a = random(-500, 500);
        var b = random(-800, 0);
        var c = random(-500, 500);
        confLocs.push(createVector(a, b, c));
        confTheta.push(random(0, 360));
    }

}

function draw() {
    background(125);
    angleMode(DEGREES);
    
    
    // rotate the cam around the center, the grid of boxes noving 
    var xLoc = cos(frameCount)*height;
    var zLoc = sin(frameCount)*height;
    camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);
    
    // i wrote this code
    // dropdown menu for types of textures
    if (textureTypes.value() === 'Default'){
        normalMaterial();
    }
    else if (textureTypes.value() === 'Specular'){
        // pointlight (255, 105, 0) - represent the rgb components
        // (100, -150, -100) - represent the coordinations of x,y,z of the lights position in the 3dSinGames.
        pointLight(255, 105, 0, 100, -150, -100);
        specularMaterial(250, 0, 0);
    }
    else if (textureTypes.value() === 'Ambient'){
        ambientMaterial(0, 0 ,255)
    }
    
    // distinguishing the boxes, set the material to normal
    //normalMaterial();
    stroke(0);
    strokeWeight(2);
    // end of the code i wrote
    var speedWave = speedSlider.value();
    
    // create a grid of boxes
    for(var x = -400; x<400; x+=50){
        for(var z = -400; z<400; z+=50){
            push();
            translate(x, 0, z);
            // animating the wave
            var distance = dist(0, 0, x, z) + frameCount * speedWave;
            var length = map(sin(distance), -1, 1, 100, 300);
            box(50, length, 50);
            pop();
        } 
    }
    
    //normalMaterial();
    confetti();
}

function confetti(){
    for(var i = 0; i<confLocs.length; i++){
        push();
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        
        // rotate x by theta which is store in confTheta
        rotateX(confTheta[i]);
        plane(15, 15);
        
        // increment the y coordinate by 1
        confLocs[i].y += 1;
        confTheta[i].y = -800;
        
        // check if y is greater than 0, if yes set to -800
        if(confLocs[i].y > 0){
            confLocs[i].y = -800;
        }
        pop();
    }
}

function texture(){
    for(var i = 0; i<confLocs.length; i++){
        confLocs[i].y = -800;
        confTheta[i] = random(0, 360);
    }
}