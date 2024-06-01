let img;

function preload() {
  img = loadImage('Butterfly.jpeg');
}

function setup() {
  createCanvas(700, 700);
  background("#000000");
  
  // Image inside shape, using clip function - only works with one shape
  img.resize(300, 300);
  let cnv7 = createGraphics(300, 300);
  cnv7.beginShape();
  cnv7.vertex(50, 200);
  cnv7.vertex(250, 0);
  cnv7.vertex(300, 300);
  cnv7.endShape(CLOSE);
  cnv7.canvas.getContext("2d").clip();
  cnv7.image(img, 0, 0);
  image(cnv7, 100, 300);
  
  // Image inside shape, using mask function - works with multiple shapes
  img.resize(250, 250);
  let cnv5 = createGraphics(200, 200);
  cnv5.beginShape();
  cnv5.vertex(0, 200);
  cnv5.vertex(100, 0);
  cnv5.vertex(200, 200);
  cnv5.endShape(CLOSE);
  img.mask(cnv5);
  image(img, 300, 25);
  filter(INVERT);
}
