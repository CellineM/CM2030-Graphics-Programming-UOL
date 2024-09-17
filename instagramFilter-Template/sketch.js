// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
//////////////////////// enhancement
var defaultImgFilter = 0;


var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
    // pixelDensity(1);

}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    
    var changeFilter = earlyBirdFilter(defaultImgFilter, imgIn);
    image(changeFilter, imgIn.width, 0);
    
    //image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
///////////////////////////////////
function keyPressed(){
    // i wrote this code
    if (keyCode === UP_ARROW){
        defaultImgFilter++;
        // can press till 6 times, if it's the 7th time the up arrow is pressed, then it will go to the default filter
        if (defaultImgFilter >= 7){ 
            defaultImgFilter = 0;
        }
        redraw();
    } else if (keyCode == DOWN_ARROW){
        defaultImgFilter--;
        // if the user press down arrow on the default filter, the filter will go to the latest case filter.
        if (defaultImgFilter < 0){
            defaultImgFilter = 6; 
        }
        redraw();
    }
    
    
}
// end of the code i wrote

/////////////////////////////////////////////////////////////////
function earlyBirdFilter(filterCaseNum, img){
  
    var resultImg = createImage(imgIn.width, imgIn.height);
    // i wrote this code
    switch (filterCaseNum){
            // the first filter shown
       case 0:
            resultImg = imgIn;
            break;
            
        case 1:
            resultImg = sepiaFilter(resultImg);
            break;
            
        case 2:
            resultImg = sepiaFilter(resultImg);
            resultImg = darkCorners(resultImg);
            break;
            
        case 3:
            resultImg = sepiaFilter(resultImg);
            resultImg = darkCorners(resultImg);
            resultImg = radialBlurFilter(resultImg);
            resultImg = borderFilter(resultImg);
            break;
            
        case 4:
            resultImg = negativeFilter(resultImg);
            break;
            
        case 5: 
            resultImg = invertFilter(imgIn);
            break;
            
        case 6:
            resultImg = thresholdFilter(imgIn);
            break;
//            
//        case 7: // watercolour filter
//            resultImg = waterFilter(imgIn);
//            break;
        default: 
            resultImg = imgIn;
            break;
    }
    return resultImg;     
    
    // end of the code i wrote
    
//  var resultImg = createImage(imgIn.width, imgIn.height);
//  resultImg = sepiaFilter(resultImg);
//  resultImg = darkCorners(resultImg);
//  resultImg = radialBlurFilter(resultImg);
//  resultImg = borderFilter(resultImg)
//  return resultImg;
}



// create the filter for each instagram filter
function sepiaFilter(resultImg)
{
    imgIn.loadPixels();
    resultImg.loadPixels();
    
    for(var x=0; x<imgIn.width; x++){
        for (var y=0; y<imgIn.height; y++){
            var pixelIndex = ((imgIn.width * y) + x) * 4;
            var oldRed = imgIn.pixels[pixelIndex + 0];
            var oldGreen = imgIn.pixels[pixelIndex + 1];
            var oldBlue = imgIn.pixels[pixelIndex + 2];
            
            var newRed = (oldRed * .393) + (oldGreen * .769) + (oldBlue * .189);
            var newGreen = (oldRed * .349) + (oldGreen * .686) + (oldBlue * .168);
            var newBlue = (oldRed * .272) + (oldGreen * .534) + (oldBlue * .131);
            
            newRed = constrain(newRed, 0, 255);
            newGreen = constrain(newGreen, 0, 255);
            newBlue = constrain(newBlue, 0, 255);
            
            resultImg.pixels[pixelIndex + 0] = newRed;
            resultImg.pixels[pixelIndex + 1] = newGreen;
            resultImg.pixels[pixelIndex + 2] = newBlue;
            resultImg.pixels[pixelIndex + 3] = 255; 
            
        }
    }
    resultImg.updatePixels();
    return resultImg;
}


function darkCorners(resultImg){
    
    resultImg.loadPixels();
    var midX = resultImg.width/2;
    var midY = resultImg.height/2;
    var maxDist = abs(dist(midX, midY, 0, 0));
    
    for (var x = 0; x<resultImg.width; x++){
        for (var y = 0; y<resultImg.height; y++){
            var d = abs(dist(midX, midY, x, y));
            if(d>300){
                var pixelIndex = ((resultImg.width * y) + x)*4;
                var oldRed = resultImg.pixels[pixelIndex + 0];
                var oldGreen = resultImg.pixels[pixelIndex + 1];
                var oldBlue = resultImg.pixels[pixelIndex + 2];
                
                if(d<=450){
                    // from 300 to 450 scale by 1 to 0.4 depending on distance
                    var dynLum = map(d, 300, 450, 1, 0,4);
                } else{
                    var dynLum = map(d, 450, maxDist, 0.4, 0);
                }
                dynLum = constrain(dynLum, 0, 1);
                resultImg.pixels[pixelIndex + 0] = oldRed * dynLum;
                resultImg.pixels[pixelIndex + 1] = oldGreen * dynLum;
                resultImg.pixels[pixelIndex + 2] = oldBlue * dynLum;
                
            }
        }
    }
    resultImg.updatePixels();
    return resultImg;
}

function convolution(x, y, matrix, matrixSize, img){
    var totalRed = 0.0;
    var totalGreen = 0.0;
    var totalBlue = 0.0;
    var offset = floor(matrixSize / 2);
    
    // convolution matrix loop
    for (var i = 0; i < matrixSize; i++){
        for (var j = 0; j < matrixSize; j++){
            // get pixel loc within convolution matrix
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            var index = (xloc + img.width * yloc) * 4;
            // ensure we don't address a pixel that doesn't exist
            index = constrain(index, 0, img.pixels.length - 1);
            
            // multiply all values with the mask and sum up
            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }
    // return the new colour as an array
    return [totalRed, totalGreen, totalBlue];
}

function radialBlurFilter(resultImg){
    resultImg.loadPixels();
    var matrixSize = matrix.length;
    
    for (var x = 0; x<resultImg.width; x++){
        for (var y = 0; y<resultImg.height; y++){
            var pixelIndex = ((resultImg.width * y) + x) * 4;
            var oldRed = resultImg.pixels[pixelIndex + 0];
            var oldGreen = resultImg.pixels[pixelIndex + 1];
            var oldBlue = resultImg.pixels[pixelIndex + 2];
            
            var c = convolution(x, y, matrix, matrixSize, resultImg);
            
            /* Where c[0] is the red channel returned from the convolution, r is the red channel in the original image
            dynBlur is a value we generated using the distance from the mouse.
            For each pixel we need to calculate the distance between it and the mouse on the colour image. We need to remap the distance from a range 100 to 300 to a new range from 0 to 1. We then need to constrain the return value from 0 to 1 and save it in the dynBlur variable. */
            
            var mouseDist = abs(dist(x, y, mouseX, mouseY));
            var dynBlur = map(mouseDist, 100, 300, 0, 1);
            dynBlur = constrain(dynBlur, 0, 1);
            
            var newRed = c[0] * dynBlur + oldRed * (1 - dynBlur);
            var newGreen = c[1] * dynBlur + oldGreen * (1 - dynBlur);
            var newBlue = c[2] * dynBlur + oldBlue * (1 - dynBlur);
            
            resultImg.pixels[pixelIndex + 0] = newRed;
            resultImg.pixels[pixelIndex + 1] = newGreen;
            resultImg.pixels[pixelIndex + 2] = newBlue;
        }
    }
    
    resultImg.updatePixels();
    return resultImg;
}

function borderFilter(imgIn){
    
    // take an image img as an input and the create a local buffer called buffer of the same size as the input image
    var resultImg = createGraphics(imgIn.width, imgIn.height);
    
    // Draw the img onto the buffer
    resultImg.image(imgIn, 0, 0);
    
    // And draw a big, fat, white rectangle with rounded corners around the image.
    resultImg.noFill();
    resultImg.stroke(255);
    resultImg.strokeWeight(20);
    resultImg.rect(0, 0, imgIn.width, imgIn.height, 50);
    
    // Draw another rectangle now, without rounded corners, in order to get rid of the little triangles
    resultImg.strokeWeight(20);
    resultImg.stroke(255);
    resultImg.rect(0, 0, imgIn.width, resultImg.height);
    
    // Make sure you return the buffer at the end of the function.
    return resultImg;
}

////////////////////////////////// implement other filters
// i wrote this code
/////// negative
function negativeFilter(resultImg){
    imgIn.loadPixels();
    
    var resultImg = createImage(imgIn.width, imgIn.height);
    
    resultImg.loadPixels();
    
    for (var x = 0; x < imgIn.width; x++) {
        for (var y = 0; y < imgIn.height; y++) {
            var pixelIndex = ((imgIn.width * y) + x) * 4;
            // Neg = negative, oldNegRed = old negative Red
            var oldNegRed = imgIn.pixels[pixelIndex + 0];
            var oldNegGreen = imgIn.pixels[pixelIndex + 1];
            var oldNegBlue = imgIn.pixels[pixelIndex + 2];

            var newNegRed = 255 - oldNegRed;
            var newNegGreen = 255 - oldNegGreen;
            var newNegBlue = 255 - oldNegBlue;

            resultImg.pixels[pixelIndex + 0] = 240 - newNegRed;
            resultImg.pixels[pixelIndex + 1] = newNegGreen;
            resultImg.pixels[pixelIndex + 2] = newNegBlue;
            resultImg.pixels[pixelIndex + 3] = 255;
        }
    }
    
    resultImg.updatePixels();
    return resultImg;
}

///////////////////// invert filter
function invertFilter(imgIn) {
    
    var resultImg = createImage(imgIn.width, imgIn.height);
    
    imgIn.loadPixels();
    resultImg.loadPixels();
    

    for (var x = 0; x < imgIn.width; x++){
        for (var y = 0; y < imgIn.height; y++){
            var index = (y * imgIn.width + x) * 4;
            
            var oldInvertRed = 255 - imgIn.pixels[index + 0];
            var oldInvertGreen = 255 - imgIn.pixels[index + 1];
            var oldInvertBlue = 255 - imgIn.pixels[index + 2];
            
            resultImg.pixels[index + 0] = oldInvertRed;
            resultImg.pixels[index + 1] = oldInvertGreen;
            resultImg.pixels[index + 2] = oldInvertBlue;
            resultImg.pixels[index + 3] = 255;
        }
    }
    
    resultImg.updatePixels();
    return resultImg;
}

///////////// threshold filter
function thresholdFilter(imgIn){
    
    var resultImg = createImage(imgIn.width, imgIn.height);
    
    imgIn.loadPixels();
    resultImg.loadPixels();
    
     for (var x = 0; x < imgIn.width; x++){
         for (var y = 0; y < imgIn.height; y++){
             
             var index = (y * imgIn.width + x) * 4;
             
            var oldThresholdRed = 255 - imgIn.pixels[index + 0];
            var oldThresholdGreen = 255 - imgIn.pixels[index + 1];
            var oldThresholdBlue = 255 - imgIn.pixels[index + 2];
             
            var threshold = (oldThresholdRed + oldThresholdGreen + oldThresholdBlue) / 3;
             
            resultImg.pixels[index + 0] = threshold;
            resultImg.pixels[index + 1] = threshold;
            resultImg.pixels[index + 2] = threshold;
            resultImg.pixels[index + 3] = 255;
             
         }
     }
    
    resultImg.updatePixels();
    return resultImg;
}
// end of the code i wrote





