// Variables for car speed and Sun button
var speed = 2.2;
var on = false;

function setup() {
  createCanvas(500, 500);
}

// Car properties
var car = {
  x: 0, // Initial position along the x-axis
  g: 0 // Blue component for the car color
};

// Sky properties for background color
var sky = {
  col1: 255, // Initial sky color component 1
  col2: 220, // Initial sky color component 2
  col3: 0,   // Initial sky color component 3
  col4:100,//inital sky color component 4
  col5:100// Initial concrete color
};

function draw() {
  // Update sky color based on car's position
  sky.col1 = map(car.x, 0, 500, 255, 0);
  sky.col2 = map(car.x, 0, 500, 220, 0);
  sky.col3 = map(car.x, 0, 500, 0, 255);
  sky.col4 = map(car.x, 0, 500, 150, 80);
  car.g = map(car.x, 0, 500, 250, 0);

  // Draw sky background
  background(0, sky.col2, sky.col1);

  // Draw stars
  noStroke();
  fill(0, 220, 255, 140);
  ellipse(150, 80, 9, 8);
  ellipse(280, 60, 8, 9);
  ellipse(50, 180, 9, 9);
  ellipse(200, 180, 9, 9);
  ellipse(320, 150, 8, 8);
   ellipse(420, 150, 9, 8);

  // Draw sun or moon
  fill(255, 255, sky.col3);
  ellipse(50, 50, 60, 60);

 // Draw concrete
fill(0, 200, 0); // Green color for land
rect(0, 250, 499, 250);

// Draw car body
fill(0, 0, car.g); // Adjusted car color to dark blue
rect(car.x, 198, 110, 50, 20);

  // Draw windows
  fill(150); // Gray color for windows
  rect(car.x + 10, 205, 50, 30, 5); // Left window
  rect(car.x + 70, 205, 30, 30, 5); // Right window

  // Draw headlights
  fill(255); // White color for headlights
  ellipse(car.x + 78, 223, 10, 10); // Left headlight
  ellipse(car.x + 90, 223, 10, 10); // Right headlight

  // Draw taillights
  fill(255, 0, 0); // Red color for taillights
  ellipse(car.x + 78, 233, 12, 7); // Left taillight
  ellipse(car.x + 90, 233, 10, 10); // Right taillight

 // Draw wheels
fill(0); // Black color for wheels
ellipse(car.x + 30, 250, 30, 30); // Front left wheel
ellipse(car.x + 90, 250, 30, 30); // Front right wheel
fill(150); // Grey color for inner wheel
ellipse(car.x + 30, 250, 20, 20); // Front left inner wheel
ellipse(car.x + 90, 250, 20, 20); // Front right inner wheel
fill(0); // Black color for inner wheel
ellipse(car.x + 30, 250, 10, 10); // Front left innermost wheel
ellipse(car.x + 90, 250, 10, 10); // Front right innermost wheel

  // Update car position
  if (car.x + 110 >= width || car.x < 0) {
    speed = speed * -1;
  }
  car.x = car.x + speed;

  // Sun button functionality
  if (on) {
    background(0);
    fill(255, 255, 0);
    ellipse(50, 50, 60, 60);
  }
}

// Toggle function for Sun button
function mousePressed() {
  if (mouseX >= 20 && mouseX < 80 && mouseY >= 20 && mouseY < 80) {
    on = !on;
  }
}