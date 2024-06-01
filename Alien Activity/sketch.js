function setup() {
    createCanvas(400, 400);
    background("#000000");
    noStroke();
    //legs
    fill("#F9CC7A");
    rect(160,220,15,(20,50),10);
    rect(190,215,15,(40,80),10);
    rect(220,222,15,(30,70),10);
    //body
    fill("#48426d");
    rect(150,50,100,(110,150),20);
    //eye
    fill("#ffffff");
    ellipse(200,100,(50,70));
    //inner eye
    fill("#000000");
    ellipse(200,100,(20,50));
    //mouth
    fill("#fe2343");
    ellipse(200,150,(7,16));
  }
  
  function draw() {
  }
  