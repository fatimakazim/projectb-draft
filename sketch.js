let NUM_OF_SPARKLES = 11;
let sparkles = [];
let moons = [];

function setup() {
  let canvas = createCanvas(600, 600);
canvas.parent('sketch-container');
  canvas.mousePressed(castSpell);

  for (let i = 0; i < NUM_OF_SPARKLES; i++) {
    sparkles[i] = new Sparkle(random(width), random(height));
  }

  // Create multiple moons
  for (let i = 0; i < 3; i++) {
    moons.push(new Moon(random(width), random(height)))
  }
}

function draw() {
  background(0);

  for (let i = sparkles.length - 1; i >= 0; i--) {
    let sparkle = sparkles[i];
    sparkle.update();
    sparkle.display();

    // Check if a sparkle touches any of the moons
    for (let j = moons.length - 1; j >= 0; j--) {
      let moon = moons[j];
      if (moon.intersects(sparkle)) {
        moon.changeColor(color(255, 0, 0)); // Change moon color to red
        sparkles.splice(i, 1); // Remove the touching sparkle
      }
    }

    sparkle.checkBounds();
  }

  for (let i = 0; i < moons.length; i++) {
    moons[i].display();
  }
}

function castSpell() {
  for (let i = 0; i < 6; i++) {
    let newSparkle = new Sparkle(mouseX, mouseY);
    newSparkle.shape = 'star';
    newSparkle.color = color(255, 223, 0, 150);
    sparkles.push(newSparkle);
  }
}

class Sparkle {
  constructor(x, y) {
    this.x = x; // Added x and y properties
    this.y = y;
    this.size = random(5, 15);
    this.color = color(255, 223, 0, 150);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.shape = 'circle';
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.color);

    if (this.shape === 'star') {
      // Draw a star shape
      star(0, 0, this.size / 2, this.size, 5);
    } else {
      // Default: draw a circle
      ellipse(0, 0, this.size);
    }

    pop();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  checkBounds() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      sparkles.splice(sparkles.indexOf(this), 1);
    }
  }
}

class Moon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50; // Make the moon bigger
    this.color = color(255, 255, 255, 200);
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.color);
    ellipse(0, 0, this.size);
    pop();
  }

  intersects(sparkle) {
    let d = dist(this.x, this.y, sparkle.x, sparkle.y);
    return d < this.size / 2 + sparkle.size / 2;
  }

  changeColor(newColor) {
    this.color = newColor;
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


