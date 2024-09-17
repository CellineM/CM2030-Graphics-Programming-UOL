class Grid {
  /////////////////////////////////
  constructor(_w, _h) {
    this.gridWidth = _w;
    this.gridHeight = _h;
    this.noteSize = 40;
    this.notePos = [];
    this.noteState = [];

    // initalise grid structure and state
    for (var x=0;x<_w;x+=this.noteSize){
      var posColumn = [];
      var stateColumn = [];
      for (var y=0;y<_h;y+=this.noteSize){
        posColumn.push(createVector(x+this.noteSize/2,y+this.noteSize/2));
        stateColumn.push(0);
      }
      this.notePos.push(posColumn);
      this.noteState.push(stateColumn);
    }
  }
  /////////////////////////////////
  run(img) {
    img.loadPixels();
    this.findActiveNotes(img);
    this.drawActiveNotes(img);
      // i wrote this code
    this.circularLineNotes(img);
    this.outerGlowEffect();
      // emd of the code i wrote
  }
  /////////////////////////////////
  drawActiveNotes(img){
    // draw active notes
    fill(255);
    noStroke();
    for (var i=0;i<this.notePos.length;i++){
      for (var j=0;j<this.notePos[i].length;j++){
        var x = this.notePos[i][j].x;
        var y = this.notePos[i][j].y;
        if (this.noteState[i][j]>0) {
          var alpha = this.noteState[i][j] * 200;
//          var c1 = color(255,0,0,alpha);
//          var c2 = color(0,255,0,alpha);
//          var mix = lerpColor(c1, c2, map(i, 0, this.notePos.length, 0, 1));
//          fill(mix);
           
            // i wrote this code
          // to make the circle random colour
          var randomCircleCoulour = color(random(255), random(255), random(255), alpha);
          fill(randomCircleCoulour);
        
          var s = this.noteState[i][j] * 0.5; // 0.7 to change the size of the circle to be smaller
          ellipse(x, y, this.noteSize*s, this.noteSize*s);

          var blueOpacity = this.noteState[i][j] * 125; // how opaque the blue colour will be
          var strokeColour = color(0,0,200, blueOpacity);
          stroke(strokeColour); 
          strokeWeight(2.5); // how thick the blue stroke will be
        // end of the code i wrote
        
        }
          
        this.noteState[i][j]-=0.05;
        this.noteState[i][j]=constrain(this.noteState[i][j],0,1);
      }
    }
  }
  /////////////////////////////////
  findActiveNotes(img){
    for (var x = 0; x < img.width; x += 1) {
        for (var y = 0; y < img.height; y += 1) {
            var index = (x + (y * img.width)) * 4;
            var state = img.pixels[index + 0];
            if (state==0){ // if pixel is black (ie there is movement)
              // find which note to activate
              var screenX = map(x, 0, img.width, 0, this.gridWidth);
              var screenY = map(y, 0, img.height, 0, this.gridHeight);
              var i = int(screenX/this.noteSize);
              var j = int(screenY/this.noteSize);
              this.noteState[i][j] = 1;
            }
        }
    }
  }
    
    // i wrote this code
  // white rotating lines appear when i move on the camera
  circularLineNotes(img){
      stroke(255); // rotation line in white colour
      strokeWeight(1.5); // the width of the lines
      
      for (var i=0;i<this.notePos.length;i++){
        for (var j=0;j<this.notePos[i].length;j++){
            var x = this.notePos[i][j].x;
            var y = this.notePos[i][j].y;
          
            // TWO_PI is twice the ratio of the circumference of a circle to its diameter (ref: https://p5js.org/reference/#/p5/TWO_PI)
            var lineRotate = this.noteState[i][j] * TWO_PI; // the line rotate a whole circle, 360 degrees
            // how long is the line
            var longLine = this.noteSize * 0.9;
            
            if (this.noteState[i][j] > 0){
                ding.play();
                push();
                translate(x, y);
                rotate(lineRotate); // to rotate the line
                line(0, 0, longLine, 0);
                pop();
                
                 this.noteState[i][j] -= 0.002; // Reduce the rotation speed, make it slower to rotate 360 degrees
                 this.noteState[i][j] = constrain(this.noteState[i][j], 0, 1);

            }
        }
      }
      
  }
   
 outerGlowEffect(){
     noFill(); // the ellipse but don't have the fill 
     strokeWeight(4); // adjust the outer weight(thinkness)
     
     for (var i=0;i<this.notePos.length;i++){
      for (var j=0;j<this.notePos[i].length;j++){
        var x = this.notePos[i][j].x;
        var y = this.notePos[i][j].y;
        if (this.noteState[i][j]>0) {
            var alpha = this.noteState[i][j] * 200;
            stroke(200, 128, 120, alpha); // pale pink colour - the ellipse
            
            var s = this.noteState[i][j] * 1.5; // how big is the circle
            ellipse(x, y, this.noteSize*s, this.noteSize*s);
            
     
            // over time, the glow of the circle will reduce
            this.noteState[i][j] -=0.002;
            this.noteState[i][j] = constrain(this.noteState[i][j], 0, 1);
     
        }
      }
  }
    
 }
    

   
  
}

 // end of the code i wrote