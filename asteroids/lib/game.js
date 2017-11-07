import Asteroid from './asteroid';
import Ship from './ship';

const Game = function Game() {
  this.asteroids = [];
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
  this.ship.move();
};

Game.prototype.checkCollisions = function checkCollisions() {
  for (let i = 0; i < this.asteroids.length; i += 1) {
    this.asteroids[i].isCollidingWith(this.ship);
  }
};

Game.prototype.step = function step() {
  this.moveObjects();
  this.checkCollisions();
};

export default Game;
