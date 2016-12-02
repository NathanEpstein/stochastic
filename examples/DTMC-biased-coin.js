// Problem: Determine when a biased coin has been switched
import * as stoch from '../src/index';

// Is the biased or fair coin used
const coinMode = [
        [0.9, 0.1],
        [0.1, 0.9]
];

// Visualize the ground true for when a coin has been switch between fair and biased
// Use 1000 as the base example
const activeCoin = stoch.DTMC(coinMode, 1000, 0, true);
// console.log(activeCoin);
const stateCoin = ['H', 'T'];

const flips = activeCoin.map((e, i, c) => {
  // Fair
  let result = Math.random() < .5 ? 0 : 1;
  // e is 0: fair or 1: biased
  if (e === 1) {
    // Biased
    result = Math.random() < .8 ? 0 : 1;
  }
  return result;
});

const dist = flips
        .map((e, i, c) => stateCoin[e])
        .reduce((p, c) => {
  p[c] =  p[c] ?  ++p[c] : 1;
  return p;
}, {H: 0, T: 0});
console.log(dist);

// Test for when Baum-Welch 1000 Viterbi 1000
