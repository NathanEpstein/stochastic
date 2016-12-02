// Problem: Determine when a biased coin has been switched
import * as stoch from '../src/index';

const letters = 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec cursus velit ut metus consequat, et consequat nisl lobortis. Donec pellentesque scelerisque tincidunt. Quisque in arcu neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas aliquam ullamcorper mi porta facilisis. Morbi molestie lacus nisi, sit amet sodales mauris suscipit quis. Quisque congue faucibus orci, fermentum dapibus diam auctor et. Curabitur dictum bibendum nisl nec facilisis. Aliquam et pellentesque nisi. Fusce sollicitudin porttitor purus vel pellentesque. Nullam maximus pulvinar massa, et scelerisque nibh bibendum sit amet. Pellentesque vestibulum ultricies felis eu auctor. Maecenas vitae enim a nulla sodales eleifend. Cras interdum augue eu varius tristique. Mauris feugiat semper magna, et tincidunt urna aliquet quis.'
        .toLowerCase()
        .replace(/[^a-z ]/g, '')
        .split('');

const dist = letters
        .reduce((p, c) => {
          p[c] = p[c] ? ++p[c] : 1;
          return p;
        }, {});

const uniques = Object.keys(dist);

console.log('Unique letters:', uniques.join(''));

// provide a lookup table
const lookup = uniques
        .reduce((p, c, i, a) => {
          p[c] = i;
          return p;
}, {});

// coerce for use by collate
const states = letters
        .map((e, i, c) => lookup[e]);

const transMatrix = stoch.collate(states);
// console.log(transMatrix);

const dtmc = stoch.DTMC(transMatrix, 100, 0, true);
console.log('Example Lorem Ipsum:', dtmc.map((e, i, c) => uniques[e]).join(''));
