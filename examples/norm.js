// norm(mu, sigma, num)

var stoch = require('../index');
var report = require('./report');

var norm = stoch.norm(1, 1, 3);

console.log(norm);
