import MovingObject from './moving_object';
import Util from './util';
import Bullet from './bullet';

function Ship(options) {
  MovingObject.call(this, {
    pos: options.pos,
    vel: [0, 0],
    radius: Ship.RADIUS,
    color: Ship.COLOR,
    game: options.game,
  });
}

Ship.COLOR = 'rgb(100,139,141)';
Ship.RADIUS = 6;

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function relocate() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function power(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.shoot = function shoot() {
  const [x, y] = this.vel;
  if (!(x < 0.1 && x > -0.1) || !(y < 0.1 && y > -0.1)) {
    const bullet = new Bullet({
      pos: this.pos,
      vel: [x * 3, y * 3],
      game: this.game,
    });
    this.game.addBullet(bullet);
  }
};


export default Ship;
