import Asteroid from './asteroid';

const Game = function Game() {
  this.asteroids = [];
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

Game.prototype.removeAsteroid = function removeAsteroid(asteroid) {
  const newAsteroids = [];
  for (let i = 0; i < this.asteroids.length; i += 1) {
    if (this.asteroids[i] !== asteroid) {
      newAsteroids.push(this.asteroids[i]);
    }
  }
  this.asteroids = newAsteroids;
};

Game.prototype.moveObjects = function moveObjects() {
  this.asteroids.forEach((ast) => {
    ast.move();
  });
};

Game.prototype.checkCollisions = function checkCollisions() {
  for (let i = 0; i < this.asteroids.length; i += 1) {
    for (let j = i + 1; j < this.asteroids.length; j += 1) {
      if (this.asteroids[i].isCollidingWith(this.asteroids[j])) {
        this.removeAsteroid(this.asteroids[j]);
        this.removeAsteroid(this.asteroids[i]);
      }
    }
  }
};

Game.prototype.step = function step() {
  this.moveObjects();
  this.checkCollisions();
};

export default Game;
