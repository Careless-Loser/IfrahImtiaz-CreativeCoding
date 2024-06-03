// Declare microphone input and Fast Fourier Transform (FFT) analyzer objects
let mic, fft;

// Set number of bars to visualize
let numBars = 64;

// Declare variables for bar width, height, and spacing between bars
let barWidth, barHeight;
let barSpacing = 2;

// Create an array to hold the particles
let particles = [];

function setup() {
  // Create canvas sized to the window dimensions
  createCanvas(windowWidth, windowHeight);

  // Create the microphone input object and start it
  mic = new p5.AudioIn();
  mic.start();

  // Create the FFT object and set its input to the microphone input object
  fft = new p5.FFT();
  fft.setInput(mic);

  // Calculate the width of each bar
  barWidth = width / numBars - barSpacing;

  // Create the particle array
  for (let i = 0; i < 200; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  // Set background color to black
  background(0);

  // Draw the background particles with trails
  for (let i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].display();
  }

  // Draw the sound visualizer
  let spectrum = fft.analyze();
  for (let i = 0; i < numBars; i++) {
    barHeight = map(spectrum[i], 0, 255, 0, height);
    let x = i * (barWidth + barSpacing);
    let y = height - barHeight;
    let col = color(lerpColor(color('#FF0066'), color('#00CCFF'), i / numBars));
    col.setAlpha(200); // Set transparency
    fill(col);
    rect(x, y, barWidth, barHeight);
  }
}

// Define a particle class with a constructor, display method, and move method
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = random(2, 6);
    this.history = [];
    this.maxHistory = 50; // Number of history points
  }

  display() {
    noStroke();
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      let alpha = map(i, 0, this.history.length, 0, 255);
      fill(255, 255, 255, alpha);
      ellipse(pos.x, pos.y, this.size * 2, this.size * 2);
    }
    endShape(CLOSE);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.vy *= -1;
    }

    // Store current position in history
    let v = createVector(this.x, this.y);
    this.history.push(v);

    // Remove oldest history point if exceeding max history length
    if (this.history.length > this.maxHistory) {
      this.history.splice(0, 1);
    }
  }
}