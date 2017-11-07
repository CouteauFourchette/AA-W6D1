/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_view__ = __webpack_require__(6);


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gameView = new __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* default */](ctx);
gameView.start();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


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

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ship__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);




function Asteroid(options) {
  __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */].call(this, {
    pos: options.pos,
    vel: __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].randomVec(2),
    radius: Asteroid.RADIUS,
    color: Asteroid.COLOR,
    game: options.game,
  });
}


Asteroid.COLOR = 'rgb(15,139,141)';
Asteroid.RADIUS = 10;

__WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].inherits(Asteroid, __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */]);

Asteroid.prototype.isCollidingWith = function isCollidingWith(otherObject) {
  if (otherObject instanceof __WEBPACK_IMPORTED_MODULE_1__ship__["a" /* default */]) {
    const distance = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].dist(this.pos, otherObject.pos);
    const radiusSum = this.radius + otherObject.radius;
    if (distance < radiusSum) {
      otherObject.relocate();
      return true;
    }
  }
  return false;
};

/* harmony default export */ __webpack_exports__["a"] = (Asteroid);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Util = {
  inherits(BaseClass, SuperClass) {
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

/* harmony default export */ __webpack_exports__["a"] = (Util);


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asteroid__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ship__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bullet__ = __webpack_require__(8);




const Game = function Game() {
  this.asteroids = [];
  this.bullets = [];
  this.ship = new __WEBPACK_IMPORTED_MODULE_1__ship__["a" /* default */]({
    pos: this.randomPosition(),
    game: this,
  });
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
    const ast = new __WEBPACK_IMPORTED_MODULE_0__asteroid__["a" /* default */]({
      pos: this.randomPosition(),
      game: this,
    });
    this.asteroids.push(ast);
  }
};

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach((ast) => {
    ast.draw(ctx);
  });
  this.bullets.forEach((bull) => {
    bull.draw(ctx);
  })
  this.ship.draw(ctx);
};

Game.prototype.wrap = function wrap(pos) {
  let [x, y] = pos;
  if (x >= Game.DIM_X) {
    x = 0;
  } else if (x <= 0) {
    x = Game.DIM_X;
  }

  if (y >= Game.DIM_Y) {
    y = 0;
  } else if (y <= 0) {
    y = Game.DIM_Y;
  }

  return [x, y];
};

Game.prototype.addBullet = function addBullet(bullet) {
  this.bullets.push(bullet);
};

Game.prototype.remove = function remove(object) {
  let objects = [];
  const newObjects = [];
  if (object instanceof __WEBPACK_IMPORTED_MODULE_2__bullet__["a" /* default */]) {
    objects = this.bullets;
  } else if (object instanceof __WEBPACK_IMPORTED_MODULE_0__asteroid__["a" /* default */]) {
    objects = this.asteroids;
  }
  console.log(objects);
  for (let i = 0; i < objects.length; i += 1) {
    if (objects[i] !== object) {
      newObjects.push(objects[i]);
    }
  }
  console.log(newObjects);
  if (object instanceof __WEBPACK_IMPORTED_MODULE_2__bullet__["a" /* default */]) {
    this.bullets = newObjects;
  } else if (object instanceof __WEBPACK_IMPORTED_MODULE_0__asteroid__["a" /* default */]) {
    this.asteroids = newObjects;
  }
};

Game.prototype.removeAsteroid = function removeAsteroid(asteroid) {
  this.remove(asteroid);
};

Game.prototype.removeBullet = function removeBullet(bullet) {
  this.remove(bullet);
};

Game.prototype.isOutOfBounds = function isOutOfBounds(pos) {
  const [x, y] = pos;
  if ((x >= Game.DIM_X) || (x <= 0) || (y >= Game.DIM_Y) || (y <= 0)) {
    return true;
  }
  return false;
};

Game.prototype.moveObjects = function moveObjects() {
  this.asteroids.forEach((ast) => {
    ast.move();
  });
  this.bullets.forEach((bull) => {
    bull.move();
  });
  this.ship.move();
};

Game.prototype.checkCollisions = function checkCollisions() {
  for (let i = 0; i < this.asteroids.length; i += 1) {
    this.asteroids[i].isCollidingWith(this.ship);
    for (let j = 0; j < this.bullets.length; j += 1) {
      this.bullets[j].isCollidingWith(this.asteroids[i]);
    }
  }
};

Game.prototype.step = function step() {
  this.moveObjects();
  this.checkCollisions();
};

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(5);


const GameView = function GameView(ctx) {
  this.ctx = ctx;
  this.game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
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

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bullet__ = __webpack_require__(8);




function Ship(options) {
  __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */].call(this, {
    pos: options.pos,
    vel: [0, 0],
    radius: Ship.RADIUS,
    color: Ship.COLOR,
    game: options.game,
  });
}

Ship.COLOR = 'rgb(100,139,141)';
Ship.RADIUS = 6;

__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].inherits(Ship, __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */]);

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
    const bullet = new __WEBPACK_IMPORTED_MODULE_2__bullet__["a" /* default */]({
      pos: this.pos,
      vel: [x * 3, y * 3],
      game: this.game,
    });
    this.game.addBullet(bullet);
  }
};


/* harmony default export */ __webpack_exports__["a"] = (Ship);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__asteroid__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);




// function setVelocity(vel) {
//   const bulletVel = [vel[0] * 3, vel[1] * 3];
//   return bulletVel;
// }

function Bullet(options) {
  // const velocity = setVelocity(options.vel.slice(0));
  __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */].call(this, {
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

__WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].inherits(Bullet, __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */]);

Bullet.prototype.isCollidingWith = function isCollidingWith(otherObject) {
  if (otherObject instanceof __WEBPACK_IMPORTED_MODULE_1__asteroid__["a" /* default */]) {
    const distance = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].dist(this.pos, otherObject.pos);
    const radiusSum = this.radius + otherObject.radius;
    if (distance < radiusSum) {
      this.game.removeAsteroid(otherObject);
      return true;
    }
  }
  return false;
};
/* harmony default export */ __webpack_exports__["a"] = (Bullet);


/***/ })
/******/ ]);