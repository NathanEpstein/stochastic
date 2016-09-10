// poissP(lambda, T, path)

var plot = require('plotter').plot;
var stoch = require('../index');
var report = require('./report');

var poissP = stoch.poissP(1, 60, true);

console.log(poissP);

plot({
    data:       poissP,
    filename:   'poissP.png',
    xlabel:     'index',
    ylabel:     'goal',
    format:     'png'
});
