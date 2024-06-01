var img;
function preload() {
img = loadImage("Lain.gif");
}

function setup () {
createCanvas (220, 250);
background(0);
}

function draw() {
background(0);
  x = mouseX
  y = mouseY
image(img, 0, 0);
  var c = get (x,y);
  fill(c);
  ellipse ( x, y, 50, 50);
}
