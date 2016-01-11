// poissP(lambda, T, path)

var stoch = require('../index');
var report = require('./report');

var poissP = stoch.poissP(1, 20, true);

console.log(poissP);
