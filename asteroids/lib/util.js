const Util = {
  inherits(BaseClass, SuperClass) {
    console.log(`inheriting from ${SuperClass}`);
    BaseClass.prototype = Object.create(SuperClass.prototype); // eslint-disable-line no-param-reassign
    BaseClass.prototype.constructor = BaseClass; // eslint-disable-line no-param-reassign
  },

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  dist(pos1, pos2) {
    const [x1, y1] = pos1;
    const [x2, y2] = pos2;
    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));
  },
};

export default Util;
