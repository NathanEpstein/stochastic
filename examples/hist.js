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

// var hist = stoch.hist(arr);
var hist = stoch.hist([1,1,1,1,2,3,3,4,4,4]);


var data = Object.keys(hist).map((e, i, c) => { return hist[e]; }); 
console.log(hist, data);

plot({
  data: data,
  style: 'boxes',
  boxwidth: '1',
  filename:   'out/hist.png',
  xlabel:     'bucket',
  ylabel:     'count',
  format:     'png'
});


