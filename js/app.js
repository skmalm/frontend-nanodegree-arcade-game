// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.left = this.x;
      this.right = this.x + 101;
      this.speed = speed;
      // The image/sprite for our enemies, this uses
      // a helper we've provided to easily load images
      this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
      this.x += this.speed * dt;
      enemyCollide(this);
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
    }
    // Draw the enemy on the screen, required method for game
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let xChange = 0;
let yChange = 0;

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
  }
  handleInput(keyCode) {
    if (keyCode === 'left') {
      this.x -= 101;
    } else if (keyCode === 'right') {
      this.x += 101;
    } else if (keyCode === 'up') {
      this.y -= 80;
    } else if (keyCode === 'down') {
      this.y += 80;
    }
  }
  update() {
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  reset() {
    this.x = 202;
    this.y = 380;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemyOffScreen = -101;
const enemyYArray = [60, 145, 225];
const enemySpeedArray = [50, 100, 150, 200];
const allEnemies = [];
function generateEnemy() {
  const enemyY = enemyYArray[Math.floor(Math.random() * enemyYArray.length)];
  const enemySpeed = enemySpeedArray[Math.floor(Math.random() * enemySpeedArray.length)];
  const newEnemy = new Enemy(enemyOffScreen, enemyY, enemySpeed);
  allEnemies.push(newEnemy);
  clearInterval(timer);
  timer = setInterval(generateEnemy, parseInt(Math.random() * randomWidth));
}
const randomWidth = 5000;
// The random range will be from 0 to 5000
let timer = setInterval(generateEnemy, 1000);
// 1000 = Initial timer when the page is first loaded

// Place the player object in a variable called player
player = new Player(202, 380);

function enemyCollide(thisEnemy) {
  if (player.x < (thisEnemy.x + 101) && (player.x + 101) > thisEnemy.x &&
      player.y < (thisEnemy.y + 101) && (player.y + 101) > thisEnemy.y) {
    player.reset();
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
