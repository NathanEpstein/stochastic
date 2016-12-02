// Problem: Determine when a biased coin has been switched
import * as stoch from '../src/index';

// http://www.lipsum.com/
const lorem = 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec cursus velit ut metus consequat, et consequat nisl lobortis. Donec pellentesque scelerisque tincidunt. Quisque in arcu neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas aliquam ullamcorper mi porta facilisis. Morbi molestie lacus nisi, sit amet sodales mauris suscipit quis. Quisque congue faucibus orci, fermentum dapibus diam auctor et. Curabitur dictum bibendum nisl nec facilisis. Aliquam et pellentesque nisi. Fusce sollicitudin porttitor purus vel pellentesque. Nullam maximus pulvinar massa, et scelerisque nibh bibendum sit amet. Pellentesque vestibulum ultricies felis eu auctor. Maecenas vitae enim a nulla sodales eleifend. Cras interdum augue eu varius tristique. Mauris feugiat semper magna, et tincidunt urna aliquet quis.';

// http://virtualpiano.net/little-fugue-in-g-minor-j-s-bach/
const notes = `
o d P p o P p o I p y o y p y P p o p y o y o p y p P p o p y
dsPpoPpoIp
o y o p P s d f g f d
g f d S f d p d f g h g hh g h j h j J j h g f g
jhj S jhj d jhj S jhj
g dSd h dSd j dSd h dSd
p g o f i p d g D j D d h d s P s d s
jhj P hGh p GfG h
`;

// https://wickstrom.tech/generative-music/2016/08/07/generating-sight-reading-exercises-using-constraint-logic-programming-in-clojure-part-1.html
let example = lorem
  .toLowerCase()
  .replace(/[^a-z ]/g, '')
  .split('');

const dist = example
        .reduce((p, c) => {
          p[c] = p[c] ? ++p[c] : 1;
          return p;
        }, {});

const uniques = Object.keys(dist);

console.log('Unique:', uniques.join(','));

// provide a lookup table
const lookup = uniques
        .reduce((p, c, i, a) => {
          p[c] = i;
          return p;
}, {});

// coerce for use by collate
const states = example
        .map((e, i, c) => lookup[e]);

const transMatrix = stoch.collate(states);
// console.log(transMatrix);

const dtmc = stoch.DTMC(transMatrix, 100, 0, true);
console.log('Example Lorem Ipsum:', dtmc.map((e, i, c) => uniques[e]).join(''));
