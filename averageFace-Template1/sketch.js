var imgs = [];
var avgImg;
var numOfImages = 30;

// i wrote this code
var loadCounter = 0;

var imageOneCol = 0;
var imageTwoCol = 0;

var showAverageFace = false; // when first open, it won't show the average face
var averageFaceFilter = false; // when first open, won't show the filter until the user click on the checkbox

var averageSize = 1; // initialise to the first picture which is 0.jpg
var pictureSize = 1;
var slider;
// end of the code i wrote

function preload() {
    for (var i = 0; i < numOfImages; i++) {
        var img = loadImage("assets/" + i + ".jpg", imageLoadSuccess);
        imgs.push(img);
    }
}

function imageLoadSuccess() {
    loadCounter++;
}

function setup() {
    createCanvas(imgs[0].width * 3, imgs[0].height);
    pixelDensity(1);
    
// i wrote this code
    // dropdown boxes for the first picture and the second picture
    var firstChoice = createSelect();
    for (var i = 0; i < numOfImages; i++) {
        firstChoice.option("Face: " + i);
    }
    firstChoice.position(10, imgs[0].height + 15);
    firstChoice.changed(firstChoicePic);

    var secondChoice = createSelect();
    for (var i = 0; i < numOfImages; i++) {
        secondChoice.option("Face: " + i);
    }
    secondChoice.position(550, imgs[0].height + 15);
    secondChoice.changed(secondChoicePic);

    // check boxes to check on the average face and the filter
    var firstCheck = createCheckbox("Check to show the Average Face", false);
    firstCheck.position(1050, imgs[0].height + 15);
    firstCheck.changed(checkAverageFace);

    var secondCheck = createCheckbox("Check to show Grayscale filter", false);
    secondCheck.position(1050, imgs[0].height + 35);
    secondCheck.changed(checkGrayscale);

    // slider to adjust the size of the average face
    // slider
    averageFaceSlider = createSlider(0, 2, 1, 0.01);
    averageFaceSlider.position(1050, imgs[0].height + 60);
    averageFaceSlider.changed(averageFaceSize);
    
// end of the code i wrote    
}

function draw() {
    background(125);
    if (loadCounter != numOfImages) {
        console.log("not ready");
        return;
    }

    console.log("All images loaded, ready for average face");

    // i wrote this code
    var leftPic = imgs[imageOneCol];
    var rightPic = imgs[imageTwoCol];

    if (showAverageFace) {
        var avgImage = averageFace([leftPic, rightPic]); 

        if (averageFaceFilter) {
            avgImage.filter(GRAY); // make the filter to grayscale filter
        }

        var sizeWidth = imgs[0].width * pictureSize;
        var sizeHeight = imgs[0].height * pictureSize; 

        var averageWidth = avgImage.width * averageSize;
        var averageHeight = avgImage.height * averageSize;

        image(leftPic, 0, 0, sizeWidth, sizeHeight);
        image(rightPic, sizeWidth, 0, sizeWidth, sizeHeight);
        image(avgImage, sizeWidth * 2, 0, averageWidth, averageHeight);
    } else {
        image(leftPic, 0, 0);
        image(rightPic, imgs[0].width, 0);
        // end of the code i wrote
    }
    noLoop();
}

function averageFace(images) {
    for (var i = 0; i < images.length; i++) {
        images[i].loadPixels();
    }

    var imgOut = createImage(images[0].width, images[0].height);
    imgOut.loadPixels();

    for (var y = 0; y < imgOut.height; y++) {
        for (var x = 0; x < imgOut.width; x++) {
            var pixelIndex = ((imgOut.width * y) + x) * 4;
            var redSum = 0;
            var greenSum = 0;
            var blueSum = 0;
            var alphaSum = 0;

            for (var j = 0; j < images.length; j++) {
                var img = images[j];
                redSum += img.pixels[pixelIndex + 0];
                greenSum += img.pixels[pixelIndex + 1];
                blueSum += img.pixels[pixelIndex + 2];
                alphaSum += img.pixels[pixelIndex + 3];
            }

            imgOut.pixels[pixelIndex + 0] = redSum / images.length;
            imgOut.pixels[pixelIndex + 1] = greenSum / images.length;
            imgOut.pixels[pixelIndex + 2] = blueSum / images.length;
            imgOut.pixels[pixelIndex + 3] = alphaSum / images.length;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

// i wrote this code
function firstChoicePic() {
    imageOneCol = int(this.value().split(' ')[1]); // 
    redraw(); // Executes the code within draw() one time. Allows the program to update the display window 
}

function secondChoicePic() {
    imageTwoCol = int(this.value().split(' ')[1]);
    redraw();
}

function checkAverageFace() {
    showAverageFace = this.checked();
    redraw();
}

function checkGrayscale() {
    averageFaceFilter = this.checked();
    redraw();
}

function averageFaceSize() {
    averageSize = averageFaceSlider.value();
    redraw();
}
// end of the code i wrote