let player;
let enemies = [];
let bullets = [];
let score = 0;
let gameOver = false;
let gameStarted = false;
let gameDifficulty = "easy";
let bgImg;
let instructions = "Press SPACE to jump and UP ARROW to shoot. Avoid enemies and shoot them to score points.";
let gameInstructions = "Press the buttons below to choose difficulty level and start playing.";
let enemySpawnRate = 60; // Default enemy spawn rate
let enemySpeed = 5; // Default enemy speed

function preload() {
  bgImg = loadImage('backgame (1).gif'); // Background image
}

function setup() {
  createCanvas(800, 400);
  player = new Player();
}

function draw() {
  background(bgImg);

  if (!gameStarted) {
    showStartScreen();
  } else if (!gameOver) {
    player.update();
    player.show();
    updateEnemies();
    updateBullets();
    showScore();
  } else {
    showGameOver();
  }
}

function keyPressed() {
  if (gameStarted) {
    if (key === ' ') {
      player.jump();
    } else if (keyCode === UP_ARROW) {
      bullets.push(new Bullet(player.x + player.width, player.y + player.height / 2));
    } else if (key === 'R' || key === 'r') {
      resetGame();
    }
  }
}

function mousePressed() {
  if (!gameStarted) {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 - 30 && mouseY > height / 2 + 35 && mouseY < height / 2 + 65) {
      gameDifficulty = "easy";
      gameInstructions = instructions;
      startGame();
    } else if (mouseX > width / 2 - 45 && mouseX < width / 2 + 45 && mouseY > height / 2 + 35 && mouseY < height / 2 + 65) {
      gameDifficulty = "medium";
      gameInstructions = instructions;
      startGame();
    } else if (mouseX > width / 2 + 30 && mouseX < width / 2 + 100 && mouseY > height / 2 + 35 && mouseY < height / 2 + 65) {
      gameDifficulty = "hard";
      gameInstructions = instructions;
      startGame();
    }
  }
}

function startGame() {
  gameStarted = true;
  if (gameDifficulty === "easy") {
    enemySpawnRate = 60;
    enemySpeed = 5;
  } else if (gameDifficulty === "medium") {
    enemySpawnRate = 45;
    enemySpeed = 7;
  } else if (gameDifficulty === "hard") {
    enemySpawnRate = 30;
    enemySpeed = 10;
  }
}

function resetGame() {
  player = new Player();
  enemies = [];
  bullets = [];
  score = 0;
  gameOver = false;
  gameStarted = false;
  gameInstructions = "Press the buttons below to choose difficulty level and start playing.";
}

function updateEnemies() {
  if (frameCount % enemySpawnRate === 0) {
    if (gameDifficulty === "medium" || gameDifficulty === "hard") {
      let enemyType = random([0, 1]); // 0 for normal, 1 for jumping (or flying)
      enemies.push(new Enemy(enemyType));
    } else {
      enemies.push(new Enemy(0));
    }
  }
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update();
    enemies[i].show();
    if (enemies[i].hits(player)) {
      gameOver = true;
    }
    if (enemies[i].offScreen()) {
      enemies.splice(i, 1);
    }
  }
}

function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].show();
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (bullets[i].hits(enemies[j])) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        score += 1; // Increase score when enemy is hit
        break;
      }
    }
    if (bullets[i] && bullets[i].offScreen()) {
      bullets.splice(i, 1);
    }
  }
}

function showScore() {
  fill("Black");
  textSize(20);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);
}

function showGameOver() {
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
  textSize(16);
  text("Press 'R' to Restart", width / 2, height / 2 + 30);
}

function showStartScreen() {
  fill("Black");
  textAlign(CENTER);
  textSize(20);
  text(gameInstructions, width / 2, height / 2 - 50);
  drawDifficultyButtons();
  showInstructions();
}

function drawDifficultyButtons() {
  fill("Black");
  textSize(18);
  text("Choose Difficulty Level", width / 2, height / 2 + 20);
  drawButton("Easy", width / 2 - 100, height / 2 + 50, 70, 30);
  drawButton("Medium", width / 2, height / 2 + 50, 90, 30);
  drawButton("Hard", width / 2 + 100, height / 2 + 50, 70, 30);
}

function drawButton(label, x, y, w, h) {
  if (mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2) {
    fill(100);
  } else {
    fill(200);
  }
  rect(x - w / 2, y - h / 2, w, h, 10);
  fill(0);
  text(label, x, y + 5);
}

function showInstructions() {
  fill("White");
  textAlign(CENTER);
  textSize(16);
  text(instructions, width / 2, height - 50);
}

class Player {
  constructor() {
    this.width = 30;
    this.height = 50;
    this.x = 50;
    this.y = height - this.height - 20;
    this.gravity = 0.8;
    this.lift = -15;
    this.velocity = 0;
  }
  
  show() {
    fill(0, 102, 255); // Blue player
    rect(this.x, this.y, this.width, this.height);
  }
  
  jump() {
    if (this.y === height - this.height - 20) {
      this.velocity = this.lift;
    }
  }
  
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    
    if (this.y > height - this.height - 20) {
      this.y = height - this.height - 20;
      this.velocity = 0;
    }
  }
}

class Enemy {
  constructor(type) {
    this.width = 30;
    this.height = 30;
    this.x = width;
    this.y = height - this.height - 20;
    this.speed = enemySpeed; // Use the global enemySpeed variable
    this.type = type; // 0 for normal, 1 for jumping/flying
    this.jumpVelocity = -10; // Velocity for jumping enemies
    this.gravity = 0.5;
    this.velocity = 0;
  }
  
  show() {
    fill(255, 0, 0); // Red enemy
    rect(this.x, this.y, this.width, this.height);
  }
  
  update() {
    this.x -= this.speed;
    if (this.type === 1) {
      this.velocity += this.gravity;
      this.y += this.velocity;
      if (this.y > height - this.height - 20) {
        this.y = height - this.height - 20;
        this.velocity = this.jumpVelocity;
      }
    }
  }
  
  offScreen() {
    return this.x < -this.width;
  }
  
  hits(player) {
    return (
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y
    );
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 10;
  }
  
  show() {
    fill(255);
    ellipse(this.x, this.y, 10, 5);
  }
  
  update() {
    this.x += this.speed;
  }
  
  offScreen() {
    return this.x > width;
  }
  
  hits(enemy) {
    return (
      this.x > enemy.x &&
      this.x < enemy.x + enemy.width &&
      this.y > enemy.y &&
      this.y < enemy.y + enemy.height
    );
  }
}
