var start = 0;

function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES);
    rectMode(CENTER);
    noiseDetail(1);
}

function draw() {
    background("#000000");

    translate(width / 2, height / 2); // Move the origin to the center of the canvas

    var maxDistance = sqrt(sq(width / 2) + sq(height / 2)); // Maximum distance from the center

    for (var n = 0; n < 500; n++) {
        beginShape();
        for (var angle = 0; angle < 360; angle += 3) {
            var rad = n * 2;
            var x = rad * cos(angle);
            var y = rad * sin(angle);
            var z = map(sin(frameCount * 5 + n * 10), -1, 1, -200, 200); // Make the shapes move in a swirling motion
            
            // Check if the shape is within the maximum distance
            var distance = dist(0, 0, x, y);
            if (distance <= maxDistance) {
                var r = map(cos(frameCount * 20 + n), -1, 1, 0, 255); // Red component varies with time and distance
                var g = map(sin(frameCount * 20 + n), -1, 1, 0, 255); // Green component varies with time and distance
                var b = map(cos(frameCount * 20 + n), -1, 1, 255, 0); // Blue component varies with time and distance

                stroke(r, g, b);
                vertex(x, y, z);
            }
        }
        endShape(CLOSE);
    }

    start += 0.05;
}
