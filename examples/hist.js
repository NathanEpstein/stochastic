// hist(arr)

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
