// norm(mu, sigma, num)

var stoch = require('../src/index');
var report = require('./report');
var plot = require('plotter').plot;


var norm = stoch.norm(1, 1, 100);
var hist = stoch.hist(norm);

var data = Object.keys(hist).map((e, i, c) => { return hist[e]; }); 
console.log(hist, data);

plot({
  data: data,
  style: 'boxes',
  boxwidth: '1',
  filename:   'out/norm.png',
  xlabel:     'bucket',
  ylabel:     'count',
  format:     'png'
});



console.log(norm);
