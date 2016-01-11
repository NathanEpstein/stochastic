// norm(mu, sigma, num)

var stoch = require('../index');
var report = require('./report');

var norm = stoch.norm(.5, 10, 20);

console.log(norm);
