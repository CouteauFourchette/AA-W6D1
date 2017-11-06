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

Game.prototype.moveObjects = function moveObjects() {
  this.asteroids.forEach((ast) => {
    ast.move();
  });
};

export default Game;
