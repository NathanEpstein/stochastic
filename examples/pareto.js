// pareto(x_m,alpha)

var stoch = require('../index');
var report = require('./report');
var pareto = stoch.pareto(+20.0, -1.0);

console.log(pareto);
