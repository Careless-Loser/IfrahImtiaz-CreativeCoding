let trail = [];
let maxTrailLength = 200;
let colorPalette = [];
function setup() {
  createCanvas(800, 600);
  // Initialize a vibrant color palette
  colorPalette = [
    color(255, 0, 0),    // Red
    color(255, 165, 0),  // Orange
    color(255, 255, 0),  // Yellow
    color(0, 128, 0),    // Green
    color(0, 0, 255),    // Blue
    color(75, 0, 130),   // Indigo
    color(238, 130, 238) // Violet
  ];
}
function draw() {
  background(0);
  // Add the current mouse position to the trail
  trail.push(createVector(mouseX, mouseY));
  // Remove the oldest position if the trail exceeds the maximum length
  if (trail.length > maxTrailLength) {
    trail.shift();
  }

  // Draw the trail with heart shapes and vibrant colors
  noStroke();
  for (let i = 0; i < trail.length; i++) {
    let pos = trail[i];
    // Calculate alpha for fade effect
    let alpha = map(i, 0, trail.length, 255, 0);
    // Calculate size with variability
    let size = map(i, 0, trail.length, 20, 5);
    // Choose color from the palette based on position in the trail
    let col = colorPalette[i % colorPalette.length];
    fill(red(col), green(col), blue(col), alpha);
    // Draw the heart shape
    drawHeart(pos.x, pos.y, size);
  }
}

function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}
