// DTMC(transMatrix, steps, start, path)

var stoch = require('../index');

var transMatrixTwo = [
        [0.1, 0.9],
        [0.5, 0.5]
];

var DTMC = stoch.DTMC(transMatrixTwo, 20, 0, true);

console.log(DTMC);
