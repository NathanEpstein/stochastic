// brown(mu, sigma, T, steps, path)

var plot = require('plotter').plot;
var stoch = require('../src/index');
var report = require('./report');

var brown = stoch.brown(1.0, -0.1, 0.1, 100, true);

console.log(brown);


plot({
    data:       brown,
    filename:   'out/brown.png',
    xlabel:     'index',
    ylabel:     'goal',
    format:     'png'
});

