import Game from './game';

const GameView = function GameView(ctx) {
  this.ctx = ctx;
  this.game = new Game();
};

GameView.prototype.start = function start() {
  setInterval(() => {
    this.game.moveObjects();
    this.game.draw(this.ctx);
  }, 20);
};

export default GameView;
