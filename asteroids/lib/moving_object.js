

const MovingObject = function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
  this.isWrappable = true;
};

MovingObject.prototype.draw = function draw(ctx) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.restore();
};

MovingObject.prototype.move = function move() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.isWrappable) {
    this.pos = this.game.wrap(this.pos);
  }
};

MovingObject.prototype.isCollidingWith = function isCollidingWith() {
};

export default MovingObject;
