import Game from './game';

const GameView = function GameView(ctx) {
  this.ctx = ctx;
  this.game = new Game();
  this.ship = this.game.ship;
};

GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
  key('w', () => {
    this.ship.power([0, -1]);
  });
  key('s', () => {
    this.ship.power([0, 1]);
  });
  key('a', () => {
    this.ship.power([-1, 0]);
  });
  key('d', () => {
    this.ship.power([1, 0]);
  });
  key('space', () => {
    this.ship.shoot();
  });
};

GameView.prototype.start = function start() {
  this.bindKeyHandlers();
  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
};

export default GameView;
