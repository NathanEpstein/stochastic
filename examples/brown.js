// brown(mu, sigma, T, steps, path)

var stoch = require('../index');
var report = require('./report');

var brown = stoch.brown(10, .5, 20, true, 20, true);

console.log(brown);
