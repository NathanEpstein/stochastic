// brown(mu, sigma, T, steps, path)

var plot = require('plotter').plot;
var stoch = require('../index');
var report = require('./report');

var brown = stoch.brown(1.0, 5.0, 60, 30, true);

console.log(brown);


plot({
    data:       brown,
    filename:   'brown.png',
    xlabel:     'index',
    ylabel:     'goal',
    format:     'png'
});

