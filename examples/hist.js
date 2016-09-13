// hist(arr)
var plot = require('plotter').plot;

var stoch = require('../src/index');
var report = require('./report');

// [ 31, 63, 41, 60, 35...]
var arr = Array
      .apply(
        null,
        Array(200))
      .map(
        function(e, i, c) {
          return Math.round(Math.random() * 100);
        });

var hist = stoch.hist(arr);

console.log(arr, hist);


plot({
    data: Object.keys(hist).sort().reduce(function(p, c) { p.push(hist[c]); return p;  }, []),
   style: 'boxes',
    boxwidth: '0.5',
    filename:   'hist.png',
    xlabel:     'bucket',
    ylabel:     'count',
    format:     'png'
});


