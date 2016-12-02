// Problem: Determine when a biased coin has been switched
import * as stoch from '../src/index';


// Is the biased or fair coin used
const coinMode = [
        [0.9, 0.1],
        [0.1, 0.9]
];

// Heads and Tails equally likely
const fairCoin = [
        [0.5, 0.5],
        [0.5, 0.5]
];

// Heads 80% of the time
const biasedCoin = [
        [0.8, 0.2],
        [0.2, 0.8]
];


// Visualize the ground true for when a coin has been switch between fair and biased
// Use 1000 as the base example
const activeCoin = stoch.DTMC(coinMode, 1000, 0, true);
const stateCoin = ['H', 'T'];
const fairCoinFlips = stoch.DTMC(fairCoin, 1000, 0, true);
const biasedCoinFlips = stoch.DTMC(biasedCoin, 1000, 0, true);

// console.log(activeCoin);

const flips = activeCoin.map((e, i, c) => {
  let result;
  if (e === 0) {
    result = fairCoinFlips.pop();
  } else {
    result = biasedCoinFlips.pop();
  }
  return stateCoin[result];
});

console.log(flips);
// Test for when Baum-Welch 1000 Viterbi 1000
