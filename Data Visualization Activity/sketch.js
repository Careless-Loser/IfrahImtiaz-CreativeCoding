let salesData;
let maxSales;
let canvasWidth = 500;
let canvasHeight = 500;
let barWidth;
let barSpacing = 50;
let tooltip;
let animationSpeed = 0.05;
let animatedHeights = {};

// Function to generate random product names
function getRandomProductName() {
  const products = ['Books', 'Lamps', 'Shirts', 'Pants', 'Can food'];
  return products[Math.floor(Math.random() * products.length)];
}

function preload() {
  // Assuming we have a salesData.json file in the same directory
  salesData = loadJSON('salesData.json');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  maxSales = max(Object.values(salesData));
  let numBars = Object.keys(salesData).length;
  barWidth = (canvasWidth - (barSpacing * (numBars + 1))) / numBars;
  tooltip = createDiv('');
  tooltip.style('position', 'absolute');
  tooltip.style('padding', '5px');
  tooltip.style('background', '#333');
  tooltip.style('color', '#fff');
  tooltip.style('border-radius', '3px');
  tooltip.style('display', 'none');
  tooltip.style('font-size', '12px');
  
  // Initialize animated heights and add random product names
  for (let product in salesData) {
    animatedHeights[product] = 0;
    salesData[product] = {
      sales: salesData[product],
      name: getRandomProductName()
    };
  }
}

function draw() {
  background(255);

  // Draw grid lines
  stroke(200);
  for (let i = 0; i <= 10; i++) {
    let y = map(i, 0, 10, canvasHeight - 100, 50);
    line(50, y, canvasWidth - 50, y); // Adjusted grid line length
    noStroke();
    fill(0);
    textAlign(RIGHT, CENTER);
    text((maxSales / 10) * i, 40, y);
  }

  // Calculate the starting x position to center the bars
  let chartWidth = (Object.keys(salesData).length * (barWidth + barSpacing)) - barSpacing;
  let startX = (canvasWidth - chartWidth) / 2;

  // Draw bars
  let x = startX;
  let y = canvasHeight - 70;
  
  for (let product in salesData) {
    let sales = salesData[product].sales;
    let name = salesData[product].name;
    let targetHeight = map(sales, 0, maxSales, 0, canvasHeight - 150);
    animatedHeights[product] = lerp(animatedHeights[product], targetHeight, animationSpeed);
    let barHeight = animatedHeights[product];
    
    // Draw bar with gradient
    let color1 = color(100, 150, 250);
    let color2 = color(200, 100, 250);
    for (let i = 0; i < barHeight; i++) {
      let inter = map(i, 0, barHeight, 0, 1);
      let c = lerpColor(color1, color2, inter);
      stroke(c);
      line(x, y - i, x + barWidth, y - i);
    }
    
    noStroke();
    if (mouseX > x && mouseX < x + barWidth && mouseY > y - barHeight && mouseY < y) {
      fill(200, 250, 100, 150);
      rect(x, y - barHeight, barWidth, barHeight);
      showTooltip(mouseX, mouseY, `${name}: ${sales}`);
    }
    
    // Draw product names
    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(name, x + barWidth / 2, y + 20);
    
    x += barWidth + barSpacing;
  }
  
  // Draw axes
  stroke(0);
  line(50, y, canvasWidth - 50, y); // Adjusted X-axis length
  line(50, 50, 50, y); // Y-axis
  
  // Axis labels
  textSize(16);
  fill(0);
  textAlign(CENTER);
  text('Products', canvasWidth / 2, canvasHeight - 20); // X-axis label
  textAlign(CENTER, CENTER);
  push();
  translate(20, canvasHeight / 2);
  rotate(-HALF_PI);
  text('Sales', -20, -13); // Y-axis label
  pop();

  // Chart title
  textSize(20);
  textAlign(CENTER);
  text('Sales Data Visualization', canvasWidth / 2, 30); // Chart title
}

function showTooltip(x, y, content) {
  tooltip.html(content); // Set the content of the tooltip
  tooltip.position(x + 10, y - 30); // Position the tooltip near the mouse
  tooltip.style('display', 'block'); // Display the tooltip
}

// Function to hide the tooltip when the mouse is moved away
function mouseMoved() {
  if (tooltip) {
    tooltip.style('display', 'none'); // Hide the tooltip
  }
}
