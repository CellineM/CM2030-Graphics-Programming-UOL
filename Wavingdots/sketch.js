// In comparison to gaussian noise, random noise is less complicated to generate, uses simpler and easier algorithms and random noise can be implemented in a short amount of time. 
// In addition, random noise also offers more customization which allows for greater flexibility when it comes to the properties of a noise, in this case a random noise, it create flexibility properties like magnitude, amplitude, size, speed, range, and many other properties that can be altered to meet the requirements of different applications(eg: waving dots)

// I write this code
var speedSlider;
var magnitudeSlider;
var frequencySlider; 
// end of the code I wrote

function setup()
{
    createCanvas(500, 500);
    background(255);
    
    // I write this code
    // moves horizontally
    speedSlider = createSlider(0, 0.5, 0.1, 0.01);
    speedSlider.position(500, 50);
    
    magnitudeSlider = createSlider(0, 150, 50, 1);
    magnitudeSlider.position(500, 80);
    
    frequencySlider = createSlider(0, 10, 5, 0.1);
    frequencySlider.position(500, 110);
    // end of the code i wrote

    
    
}

function draw()
{
    background(255);

    // I wrote this code
    textSize(13);
    fill(36, 113, 163 );
    text("Wave Speed", 420, 64);
    text("Wave Magnitude", 400, 95);
    text("Wave Frequency", 400, 124);
    // end of the code I wrote
    
    var noOfDots = 20;
    var size = width/noOfDots;

    for (var x = 0; x < noOfDots; x++)
    {
      for (var y = 0; y < noOfDots; y++)
      {
        var pos_x = size*x + size/2;
        var pos_y = size*y + size/2;
        var dot_size = size/2;
        
        // clrpart = colour part
        var clrpart = 100; 
        var n1 = ((x + frameCount)/clrpart);
        var n2 = ((y + frameCount)/clrpart);
          
        var clrpart2 = 50;
        var stage_x = noise(n1)*clrpart2;
        // add 1000 to shift noise y
        var stage_y = noise(n2 + 1000) * clrpart2;  
        
        var n3 = frameCount/clrpart;
        var colour = color(noise(n1) * 255, noise(n2) * 155, noise(n3) * 255);
        
        // I write this code
        var wavingSpeed = speedSlider.value();
        var wavingMagnitude = magnitudeSlider.value();
        var wavingFrequency = frequencySlider.value();
        // end of the code I wrote
          

        
        
        wave(pos_x, pos_y, dot_size, colour, stage_x, stage_y,wavingSpeed, wavingMagnitude, wavingFrequency);
          
        }    
      }
}



function wave(pos_x, pos_y, dot_size, colour, stage_x, stage_y,wavingSpeed, wavingMagnitude, wavingFrequency) 
{
 push();
 translate(pos_x, pos_y);
 fill(colour);
    
 var rfactor = 10;
 rotate((stage_x + stage_y) / rfactor);
// i write this code
 translate(stage_x, stage_y + sin(frameCount * wavingSpeed + (pos_y + pos_x) * wavingFrequency) * wavingMagnitude);
// end of the code i write

 ellipse(0, 0, dot_size);
 pop();
    
}

