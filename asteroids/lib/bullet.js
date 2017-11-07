import MovingObject from './moving_object';
import Util from './util';

function Buller(options) {
  MovingObject.call(this, {
    pos: options.pos,
    vel: [0, 0],
    radius: Buller.RADIUS,
    color: Buller.COLOR,
    game: options.game,
  });
}

Buller.COLOR = 'rgb(100,139,141)';
Buller.RADIUS = 1;

Util.inherits(Buller, MovingObject);


export default Buller;
