// hist(arr)
// CTMC(transMatrix, T, start, path)
var plot = require('plotter').plot;

var stoch = require('../index');
var report = require('./report');

// [ 31, 63, 41, 60, 35...]
var arr = Array
      .apply(
        null,
        Array(20))
      .map(
        function(e, i, c) {
          return Math.round(Math.random() * 100);
        });

var hist = stoch.hist(arr);

console.log(hist);

plot({
    data:       {tick: hist},
    filename:   'hist.png',
    xlabel:     'bucket',
    ylabel:     'count',
    format:     'png'
});


