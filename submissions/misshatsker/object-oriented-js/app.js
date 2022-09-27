const leftSide = 0;
const topSide = 0;
const rightSide = 500;
const bottomSide = 500;

const initialGroundY = 60;
const tileHeight = 80;

const enemySprite = 'images/enemy-bug.png';
const enemyWidth = 80;
const enemyHeight = 70;
const enemyMinSpeed = 100;
const enemyMaxSpeed = 300;
const enemyMinX = -rightSide;
const enemyMaxX = enemyWidth - rightSide;

const playerSprite = 'images/char-princess-girl.png';
const playerWidth = 70;
const playerHeight = 70;
const playerSpeed = 75;
const playerInitialX = 200;
const playerInitialY = 400;

const Character = function(x, y, speed, sprite, width, height) {
    this.sprite = sprite;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Enemy = function(x, y, speed, sprite, width, height) {
    Character.call(this, x, y, speed, sprite, width, height);
};

Enemy.prototype.update = function(dt) {
    const shift = this.speed * dt;
    this.x = this.x + shift;
    if (this.x >= rightSide) {
        this.x = -this.width;
    }
};

Object.setPrototypeOf(Enemy.prototype, Character.prototype);

const Player = function(x, y, speed, sprite, width, height, enemies) {
    Character.call(this, x, y, speed, sprite, width, height);
    this.enemies = enemies;
};

Player.prototype.update = function() {
    if (this.checkPlayerOverlapWithEnemies()) {
        gameOver(false);
    }
}

Player.prototype.handleInput = function(action) {
    switch (action) {
        case 'left': {
            if (this.x > leftSide) {
                this.x -= this.speed;
            }
            break;
        }
        case 'right': {
            if (this.x + this.width + this.speed < rightSide) {
                this.x += this.speed;
            }
            break;
        }
        case 'down': {
            if (this.y + this.height + this.speed < bottomSide) {
                this.y += this.speed;
            }
            break;
        }
        case 'up': {
            this.y -= this.speed;
            if (this.y <= 0) {
                gameOver(true);
            }

            break;
        }
    }
}

Player.prototype.checkPlayerOverlapWithEnemies = function() {
    return this.enemies.some((enemy) => {
        return checkIsOverlap(
            {
                x: this.x,
                y: this.y
            },
            {
                x: this.x + this.width,
                y: this.y + this.height
            },
            {
                x: enemy.x,
                y: enemy.y
            },
            {
                x: enemy.x + enemy.width,
                y: enemy.y + enemy.height
            }
        );
    });
}

Player.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
}

Object.setPrototypeOf(Player.prototype, Character.prototype);

function getRandomNumberFromARange(min, max) {
    return (Math.random() * (max - min)) + min;
}

function createRandomEnemy(row) {
    const x = getRandomNumberFromARange(enemyMinX, enemyMaxX);
    const y = initialGroundY + row * tileHeight;
    const speed = getRandomNumberFromARange(enemyMinSpeed, enemyMaxSpeed);

    return new Enemy(x, y, speed, enemySprite, enemyWidth, enemyHeight);
}

function createRandomEnemies(amount) {
    return new Array(amount).fill(null).map((elem, i) => createRandomEnemy(i));
}

const amountOfEnemies = 3;
const allEnemies = createRandomEnemies(amountOfEnemies);

const player = new Player(
    playerInitialX,
    playerInitialY,
    playerSpeed,
    playerSprite,
    playerWidth,
    playerHeight,
    allEnemies
);

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function checkIsOverlap(l1, r1,  l2,  r2) {
    const isRectangleOnLeftSideOfAnother = (l1.x > r2.x || l2.x > r1.x);
    if (isRectangleOnLeftSideOfAnother) {
        return false;
    }

    const isOneRectangleAboveAnother = (r1.y < l2.y || r2.y < l1.y);
    if (isOneRectangleAboveAnother) {
        return false;
    }

    return true;
}

let wins = 0;
let losses = 0;

function gameOver(isWin) {
    if (isWin) {
        wins++;
    } else {
        losses++;
    }

    scoreEl.innerText = `${wins}:${losses}`;
    player.setPosition(playerInitialX, playerInitialY);
}

const scoreEl = document.createElement('div');
scoreEl.className = 'score';
scoreEl.innerText = '0:0';
document.body.appendChild(scoreEl);
