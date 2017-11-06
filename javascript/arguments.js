// Write a sum function that takes any number of arguments with arguments
function sum1() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i += 1) {
    sum += arguments[i]; // eslint-disable-line prefer-rest-params
  }
  return sum;
}

console.log(sum1(1, 2, 3, 4) === 10);
console.log(sum1(1, 2, 3, 4, 5) === 15);

// Write a sum function that takes any number of arguments with args
function sum2(...args) {
  const sum = args.reduce((total, num) => total + num);
  return sum;
}

console.log(sum2(1, 2, 3, 4) === 10);
console.log(sum2(1, 2, 3, 4, 5) === 15);

Function.prototype.myBind = function myBind(ctx, ...args) {
  return (...args2) => {
    this.apply(ctx, args.concat(args2));
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat('Markov');
const breakfast = new Cat('Breakfast');

markov.says('meow', 'Ned');

markov.says.myBind(breakfast, 'meow', 'Kush')();
markov.says.myBind(breakfast)('meow', 'a tree');
markov.says.myBind(breakfast, 'meow')('Markov');

function curriedSum(numberOfElements) {
  const numbers = [];
  const sumNumbers = (num) => {
    numbers.push(num);
    if (numbers.length < numberOfElements) {
      return sumNumbers;
    }
    return sum2(...numbers);
  };

  return sumNumbers;
}

const sum = curriedSum(4);
console.log(sum(5)(30)(20)(1));


Function.prototype.curry = function curry(numArgs) {
  const args = [];
  const curryHelper = (arg) => {
    if (args.length < numArgs - 1) {
      args.push(arg);
      return curryHelper;
    }
    args.push(arg);
    return this(...args);
  };
  return curryHelper;
};

let f1 = sum1.curry(3);
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30
console.log(f1);

Function.prototype.curry2 = function curry2(numArgs) {
  const args = [];
  const thisFunction = this;
  const curryHelper = (arg) => {
    if (args.length < numArgs - 1) {
      args.push(arg);
      return curryHelper;
    }
    args.push(arg);
    return thisFunction.apply(this, args);
  };
  return curryHelper;
};

let f2 = sum1.curry2(3);
f2 = f2(4); // [Function]
f2 = f2(20); // [Function]
f2 = f2(6); // = 30
console.log(f2);
