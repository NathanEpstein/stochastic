// GBM(S0, mu, sigma, T, steps, path)
var plot = require('plotter').plot;

var stoch = require('../src/index');

var GBM = stoch.GBM(1.0, -0.1, 0.1, 1.0, 100, true);

console.log(GBM);

plot({
    data:       GBM,
    filename:   'out/GBM.png',
    xlabel:     'index',
    ylabel:     'GBM',
    format:     'png'
});

