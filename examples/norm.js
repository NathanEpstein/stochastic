// norm(mu, sigma, num)

var stoch = require('../src/index');
var report = require('./report');

var norm = stoch.norm(1, 1, 3);

console.log(norm);
