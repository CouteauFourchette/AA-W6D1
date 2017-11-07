import Asteroid from './asteroid';
import Ship from './ship';
import Bullet from './bullet';

const Game = function Game() {
  this.asteroids = [];
  this.bullets = [];
  this.ship = new Ship({
    pos: this.randomPosition(),
    game: this,
  });
  this.addAsteroids();
};

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 10;

Game.prototype.randomPosition = function randomPosition() {
  const x = Math.random() * Game.DIM_X;
  const y = Math.random() * Game.DIM_Y;
  return [x, y];
};

Game.prototype.addAsteroids = function addAsteroids() {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i += 1) {
    const ast = new Asteroid({
      pos: this.randomPosition(),
      game: this,
    });
    this.asteroids.push(ast);
  }
};

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach((ast) => {
    ast.draw(ctx);
  });
  this.bullets.forEach((bull) => {
    bull.draw(ctx);
  })
  this.ship.draw(ctx);
};

Game.prototype.wrap = function wrap(pos) {
  let [x, y] = pos;
  if (x >= Game.DIM_X) {
    x = 0;
  } else if (x <= 0) {
    x = Game.DIM_X;
  }

  if (y >= Game.DIM_Y) {
    y = 0;
  } else if (y <= 0) {
    y = Game.DIM_Y;
  }

  return [x, y];
};

Game.prototype.addBullet = function addBullet(bullet) {
  this.bullets.push(bullet);
};

Game.prototype.remove = function remove(object) {
  let objects = [];
  const newObjects = [];
  if (object instanceof Bullet) {
    objects = this.bullets;
  } else if (object instanceof Asteroid) {
    objects = this.asteroids;
  }
  console.log(objects);
  for (let i = 0; i < objects.length; i += 1) {
    if (objects[i] !== object) {
      newObjects.push(objects[i]);
    }
  }
  console.log(newObjects);
  if (object instanceof Bullet) {
    this.bullets = newObjects;
  } else if (object instanceof Asteroid) {
    this.asteroids = newObjects;
  }
};

Game.prototype.removeAsteroid = function removeAsteroid(asteroid) {
  this.remove(asteroid);
};

Game.prototype.removeBullet = function removeBullet(bullet) {
  this.remove(bullet);
};

Game.prototype.isOutOfBounds = function isOutOfBounds(pos) {
  const [x, y] = pos;
  if ((x >= Game.DIM_X) || (x <= 0) || (y >= Game.DIM_Y) || (y <= 0)) {
    return true;
  }
  return false;
};

Game.prototype.moveObjects = function moveObjects() {
  this.asteroids.forEach((ast) => {
    ast.move();
  });
  this.bullets.forEach((bull) => {
    bull.move();
  });
  this.ship.move();
};

Game.prototype.checkCollisions = function checkCollisions() {
  for (let i = 0; i < this.asteroids.length; i += 1) {
    this.asteroids[i].isCollidingWith(this.ship);
    for (let j = 0; j < this.bullets.length; j += 1) {
      this.bullets[j].isCollidingWith(this.asteroids[i]);
    }
  }
};

Game.prototype.step = function step() {
  this.moveObjects();
  this.checkCollisions();
};

export default Game;
