// poissP(lambda, T, path)

var plot = require('plotter').plot;
var stoch = require('../src/index');
var report = require('./report');

var poissP = stoch.poissP(1, 100, true);

console.log(poissP);

plot({
    data:       poissP,
    filename:   'out/poissP.png',
    xlabel:     'index',
    ylabel:     'goal',
    format:     'png'
});
