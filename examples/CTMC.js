// CTMC(transMatrix, T, start, path)

var stoch = require('../index');
var report = require('./report');

var transMatrixTwo = [
        [0.1, 0.9],
        [0.5, 0.5]
];

var CTMC = stoch.CTMC(transMatrixTwo, 20, 0, true);

report('CTMC', CTMC);
