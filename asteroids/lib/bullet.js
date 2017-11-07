import MovingObject from './moving_object';
import Asteroid from './asteroid';
import Util from './util';

// function setVelocity(vel) {
//   const bulletVel = [vel[0] * 3, vel[1] * 3];
//   return bulletVel;
// }

function Bullet(options) {
  // const velocity = setVelocity(options.vel.slice(0));
  MovingObject.call(this, {
    pos: options.pos,
    vel: options.vel,
    radius: Bullet.RADIUS,
    color: Bullet.COLOR,
    game: options.game,
  });
  this.isWrappable = false;
}

Bullet.COLOR = 'rgb(0, 0, 0)';
Bullet.RADIUS = 1;

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isCollidingWith = function isCollidingWith(otherObject) {
  if (otherObject instanceof Asteroid) {
    const distance = Util.dist(this.pos, otherObject.pos);
    const radiusSum = this.radius + otherObject.radius;
    if (distance < radiusSum) {
      this.game.removeAsteroid(otherObject);
      return true;
    }
  }
  return false;
};
export default Bullet;
