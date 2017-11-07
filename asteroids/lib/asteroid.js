import MovingObject from './moving_object';
import Ship from './ship';
import Util from './util';

function Asteroid(options) {
  MovingObject.call(this, {
    pos: options.pos,
    vel: Util.randomVec(2),
    radius: Asteroid.RADIUS,
    color: Asteroid.COLOR,
    game: options.game,
  });
}


Asteroid.COLOR = 'rgb(15,139,141)';
Asteroid.RADIUS = 10;

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.isCollidingWith = function isCollidingWith(otherObject) {
  if (otherObject instanceof Ship) {
    const distance = Util.dist(this.pos, otherObject.pos);
    const radiusSum = this.radius + otherObject.radius;
    if (distance < radiusSum) {
      otherObject.relocate();
      return true;
    }
  }
  return false;
};

export default Asteroid;
