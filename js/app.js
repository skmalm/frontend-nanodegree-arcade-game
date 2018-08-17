// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
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
    }
    // Draw the enemy on the screen, required method for game
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
  }
  handleInput(keyCode) {
    if (keyCode === 'left') {
      if (this.x >= 101) {
          this.x -= 101;
      }
    } else if (keyCode === 'right') {
      if (this.x <= 303) {
          this.x += 101;
      }
    } else if (keyCode === 'up') {
      if (this.y >= 60) {
          this.y -= 80;
      }
    } else if (keyCode === 'down') {
      if (this.y <= 300) {
        this.y += 80;
      }
    }
  }
  update() {
    this.winCheck();
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  reset() {
    this.x = 202;
    this.y = 380;
  }
  winCheck() {
    if (this.y < 60) {
      this.reset();
    }
  }
}

const enemyOffScreen = -101;
// array of the three different enemy y positions
const enemyYArray = [60, 145, 225];
// array of all possible enemy speeds
const enemySpeedArray = [50, 100, 150, 200, 250];
const allEnemies = [];
// randomly generates an enemy, with position and speed random
function generateEnemy() {
  const enemyY = enemyYArray[Math.floor(Math.random() * enemyYArray.length)];
  const enemySpeed = enemySpeedArray[Math.floor(Math.random() * enemySpeedArray.length)];
  const newEnemy = new Enemy(enemyOffScreen, enemyY, enemySpeed);
  allEnemies.push(newEnemy);
  clearInterval(timer);
  timer = setInterval(generateEnemy, parseInt(Math.random() * randomWidth));
}
const randomWidth = 2000;
// set the random time interval range to 0-2000
let timer = setInterval(generateEnemy, 100);
// set the initial delay before first enemy to 100ms

player = new Player(202, 380);

function enemyCollide(thisEnemy) {
  // set player & enemy dimensions to be reasonable for playability
  let playerLeft = player.x + 16;
  let playerRight = player.x + 85;
  let playerTop = player.y + 89;
  let playerBottom = player.y + 139;
  let enemyLeft = thisEnemy.x + 2;
  let enemyRight = thisEnemy.x + 98;
  let enemyTop = thisEnemy.y + 77;
  let enemyBottom = thisEnemy.y + 143;
  if (playerLeft < enemyRight && playerRight > enemyLeft &&
      playerTop < enemyBottom && playerBottom > enemyTop) {
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
