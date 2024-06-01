function setup() {
    createCanvas(650, 600);
    background("#000000");
    
    // Shapes behind the text
    let shapesBehind = createGraphics(width, height);
    shapesBehind.noStroke();
    shapesBehind.circle(150, 275, 60);
    
    // Additional shapes
    shapesBehind.fill(30, 30, 100); // Dark blue fill color
    shapesBehind.triangle(470, 100, 600, 400, 320, 400); // Dark blue triangle
    shapesBehind.fill(200, 0, 200); // Magenta fill color
    shapesBehind.ellipse(250, 270, 30, 200); // Magenta ellipse with width 200 and height 120
    
    image(shapesBehind, 0, 0);
    
    // Text with clipped background
    let clippedText = createGraphics(width, height);
    clippedText.fill(200, 0, 0); // Red text color
    clippedText.rect(100, 200, 410, 150); // Red rectangle
    clippedText.erase();
    clippedText.textSize(80); // Smaller text size
    clippedText.textAlign(LEFT, TOP);
    clippedText.text('BATH SPA', 110, 240);
    clippedText.noErase();
    image(clippedText, 0, 0);
  }
  