// sample(arr, n)

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

var sample = stoch.sample(arr, 5);

console.log(sample);
