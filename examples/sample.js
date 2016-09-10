// sample(arr, n)

var stoch = require('../index');
var report = require('./report');

// Random number between 0 and 100, excluding 25 - 75
// [ 31, 63, 41, 60, 35...]
var arr = Array
      .apply(
        null,
        Array(2000))
      .map(
        function(e, i, c) {
          return Math.round(Math.random() * 100);
        })
    .filter(function(e, i, c) {
        return e > 75 || e < 25;
    });

var sample = stoch.sample(arr, 10);

console.log(sample);
