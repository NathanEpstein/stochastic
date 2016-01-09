// GBM(S0, mu, sigma, T, steps, path)

var stoch = require('../index');

var GBM = stoch.GBM(10, .5, 10, true, 20, true);

console.log(GBM);
