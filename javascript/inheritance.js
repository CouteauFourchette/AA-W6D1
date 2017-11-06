// Using surrogate
// Function.prototype.inherits = function inherits(SuperClass) {
//   function Surrogate() {}
//   Surrogate.prototype = SuperClass.prototype;
//   this.prototype = new Surrogate();
//   this.prototype.constructor = this;
// };

// Using Object create
Function.prototype.inherits = function inherits(SuperClass) {
  this.prototype = Object.create(SuperClass.prototype);
  this.prototype.constructor = this;
};

function MovingObject() {}

MovingObject.prototype.moves = function moves() {
  console.log(`${this.name} moves`);
};

function Ship(name) { this.name = name; }
Ship.inherits(MovingObject);
Ship.prototype.navigate = function navigate() {
  console.log(`${this.name} is navigating`);
};

function Asteroid(name) { this.name = name; }
Asteroid.inherits(MovingObject);

const ship = new Ship('ship');
const asteroid = new Asteroid('asteroid');

ship.moves();
asteroid.moves();

ship.navigate();

try {
  asteroid.navigate();
} catch (e) {
  if (e instanceof TypeError) {
    console.log('An asteroid cannot navigate because it\'s not a ship');
  } else {
    console.log(e);
  }
}

