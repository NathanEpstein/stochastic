// sample(arr, n)

import * as stoch from '../src/index';

// Random number between 0 and 100, excluding 25 - 75
// [ 31, 63, 41, 60, 35...]
const arr = Array
      .apply(
        null,
        Array(2000))
      .map(
        (e, i, c) => Math.round(Math.random() * 100))
    .filter((e, i, c) => e > 75 || e < 25);

const sample = stoch.sample(arr, 10);

console.log(sample);
