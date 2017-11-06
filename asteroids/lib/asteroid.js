import MovingObject from './moving_object';
import Util from './util';

function Asteroid(options) {
  MovingObject.call(this, {
    pos: options.pos,
    vel: Util.randomVec(4),
    radius: Asteroid.RADIUS,
    color: Asteroid.COLOR,
  });
}

Asteroid.COLOR = 'rgb(15,139,141)';
Asteroid.RADIUS = 10;

Util.inherits(Asteroid, MovingObject);

export default Asteroid;
