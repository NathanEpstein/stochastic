/* @flow */
'use strict';


/**
 * Returns an array with the times of each arrival in a [Poisson Process](http://en.wikipedia.org/wiki/Poisson_process) with rate lambda until time T. 
 * 
 * ![poissP](out/poissP.png)
 * @example var poissP = stoch.poissP(1, 100, true);
 * @param {number} lambda (rate)
 * @param {number} T time as positive number
 * @param {boolean} [path=true] 
 * @returns {number[]} times of each arrival in a Poisson Process
 */
var poissP = module.exports.poissP = function(lambda: number, T: number, path: boolean): Array<number> {
  var U, exp, N_t, t, n;
  N_t = [0];
  t = 0;
  n = 0;

  if (T <= 0 || lambda <= 0) {
    return N_t;
  }

  while (t < T) {
    U = Math.random();
    exp = -Math.log(U) / lambda;
    t += exp;
    if (t < T) {
      n += 1;
      N_t.push(t);
    }
  }

  if (path == false) {
    return [n];
  } else {
    return N_t;
  }
};

/**
 * Returns an array with num normal random variables in a [normal distribution](http://en.wikipedia.org/wiki/Normal_distribution) of mean mu and standard deviation sigma.
 *
 * ![norm](out/norm.png)
 * @example var norm = stoch.norm(1, 1, 100);
 * @param {number} mu the mean or expectation of the distribution (and also its median and mode)
 * @param {number} sigma standard deviation as positive number
 * @param {number} [num=1] a positive integer
 * @returns {number[]} normal random values 
 */
var norm = module.exports.norm = function(mu: number, sigma: number, num: number): Array<number> {
  var U1, U2, x, y, z1, z2;
  var sample = [];

  if (num <= 0 || sigma <= 0) {
    return sample;
  }

  function boxMuller(mu, sigma) {
    U1 = Math.random();
    U2 = Math.random();
    z1 = Math.sqrt(-2 * Math.log(U1)) * Math.cos(2 * U2 * Math.PI);
    z2 = Math.sqrt(-2 * Math.log(U1)) * Math.sin(2 * U2 * Math.PI);
    x = mu + (sigma * z1);
    y = mu + (sigma * z2);
    return [x, y];
  }

  if (typeof num === 'undefined' || num == 1 || (num % 1) != 0) {
      return [boxMuller(mu, sigma)[0]];
  }

  if (num / 2 % 2 != 0) sample.push(boxMuller(mu, sigma)[0]);
  for (var i = 0; i < Math.floor(num / 2); i++) {
    sample = sample.concat(boxMuller(mu, sigma));
  }
  return sample;
};

/**
 * Returns an array corresponding to the path of [Brownian motion](http://en.wikipedia.org/wiki/Wiener_process#Related_processes) from time 0 to T with drift parameter mu and volatility parameter sigma (the process is initialized to be 0). The i-th entry in the array corresponds to the Brownian process at time i * (T/steps).
 * 
 * ![brown](out/brown.png)
 * @example var brown = stoch.brown(1.0, -0.1, +0.1, 100, true);
 * @param {number} mu drift parameter (a real number)
 * @param {number} sigma volatility parameter (strictly positive real) 
 * @param {number} T time (strictly positive real)
 * @param {number} steps (positive integer) 
 * @param {boolean} [path=true]
 * @return {number[]} Brownian motion path
 */
var brown = module.exports.brown = function(mu: number, sigma: number, T: number, steps: number, path: boolean): Array<number> {
  var B_t = [0];
  var B = 0;
  var dt = T / steps;
  var dB;

  if (!(T > 0) || !(steps > 0)) {
    return B_t;
  }

  if (path == false) {
      return [((mu * T) + (sigma * norm(0, Math.sqrt(T), 1)[0]))];
  }
  else {
    for (var i = 0; i < steps; i++) {
        dB = (mu * dt) + (sigma * norm(0, Math.sqrt(dt), 1)[0]);
      B += dB;
      B_t.push(B);
    }
    return B_t;
  }
};

/**
 * Returns an array corresponding to the path of [geometric Brownian motion](http://en.wikipedia.org/wiki/Geometric_Brownian_motion) from time 0 to T with drift parameter mu and volatility parameter sigma (the process is initialized to be S0). The i-th entry in the array corresponds to the geometric Brownian process at time i * (T/steps).
 * 
 * ![GBM](out/GBM.png)
 * @example var GBM = stoch.GBM(1.0, -0.1, 0.1, 1.0, 100, true);
 * @param {number} S0 initialized process value
 * @param {number} mu drift parameter
 * @param {number} sigma volatility parameter (strictly positive real)
 * @param {number} T time (strictly positive real)
 * @param {number} steps (positive integer)
 * @param {boolean} [path=true]
 * @returns {number[]} geometric Brownian motion
 */
var GBM = module.exports.GBM = function(S0: number, mu:number, sigma: number, T: number, steps: number, path: boolean): Array<number> {
  var S_t = [];
    var B_t = [0];

  if (!(T > 0) || !(steps > 0)) {
    return B_t;
  }

  if (path == false) {
      return [S0 * Math.exp((mu - (sigma * sigma / 2)) * T + (sigma * norm(0, Math.sqrt(T), 1)[0]))];
  } else {
      var B_t = brown((mu - (sigma * sigma / 2)), sigma, T, steps, true);
    B_t.forEach(function(B) {
      S_t.push(S0 * Math.exp(B));
    });
    return S_t;
  }
};

/**
 * Returns an array with the states at each step of the [discrete-time Markov Chain](http://en.wikipedia.org/wiki/Markov_chain) given by transMatrix (2-d array). The number of transitions is given by steps. The initial state is given by start (the states are indexed from 0 to n-1 where n is the number of arrays in transMatrix).
 * 
 * ![DTMC](out/DTMC.png)
 * @example var DTMC = stoch.DTMC([[0,1,0],[0,0,1],[1,0,0]], 20, 0, true);
 * @param {Array<Array<number>>} transMatrix
 * @param {number} steps (positive integer)
 * @param {number} start
 * @param {boolean} path
 * @returns {number[]}
 */
var DTMC = module.exports.DTMC = function(transMatrix: Array<Array<number>>, steps: number, start: number, path: boolean): Array<number> {
  //function to check if input is a valid transition matrix
  var isValid = function(matrix) {
    var n = matrix.length;
    for (var i = 0; i < n; i++) {
      var sum = 0;
      if (matrix[i].length != n) {
        return false;
      }
      for (var j = 0; j < n; j++) {
        if (matrix[i][j] > 1 || matrix[i][j] < 0) {
          return false;
        }
        sum += matrix[i][j];
      }
      var eps = (4 * Math.pow(10, -16));
      if (sum < 1 - eps || sum > 1 + eps) {
        return false;
      }
    }
    return true;
  };

  //return null if the transition matrix is not valid
  if (!isValid(transMatrix)) {
    return null;
  }

  //initialize the Markov Chain
  var fullPath = [start];
  var stateRow = transMatrix[start];
  var U;

  for (var i = 0; i < steps; i++) {
    U = Math.random();
    var sum = 0;
    for (var j = 0; j < stateRow.length; j++) {
      sum += stateRow[j];
      if (sum > U) {
        fullPath.push(j);
        stateRow = transMatrix[j];
        j = stateRow.length;
      }
    }
  }
  if (path == false) {
    return fullPath[fullPath.length - 1];
  }
  else {
    return fullPath;
  }
};


/**
 * Returns an object with the {key:value} pair {time:state} at each step of the [continuous-time Markov Chain](http://en.wikipedia.org/wiki/Continuous-time_Markov_chain) given by transMatrix (2-d array). The Markov Chain is simulated until time T. The initial state is given by start (the states are indexed from 0 to n-1 where n is the number of arrays in transMatrix).
 * 
 * ![CTMC](out/CTMC.png)
 * @example var CTMC = stoch.CTMC([[0,1,0],[0,0,1],[1,0,0]], 20, 0, true);
 * @param {Array<Array<number>>} transMatrix
 * @param {number} T
 * @param {number} start
 * @param {boolean} [path=true]
 * @returns {Object} Continuous-time Markov chain
 */
var CTMC = module.exports.CTMC = function(transMatrix: Array<Array<number>>, T: number, start: number, path: boolean) {
  // function to determine if input is a valid CTMC transition matrix
  var isValid = function(matrix) {
    var n = matrix.length;
    for (var i = 0; i < n; i++) {
      if (matrix[i].length != n) {
        return false;
      }
      for (var j = 0; j < n; j++) {
        if (matrix[i][j] < 0) {
          return false;
        }
      }
    }
    return true;
  };

  //return null if the transition matrix is not valid
  if (!isValid(transMatrix)) {
    return null;
  }

  // initialize simulation of the CTMC
  var fullPath = { "0": start };
  var lastState = start;
  var stateRow = transMatrix[start];
  var t = 0;
  var U, exp, sum;

  // begin simulation
  while (t < T) {
    var lambda = 0;
    for (var i = 0; i < stateRow.length; i++) {
      lambda += stateRow[i];
    }
    U = Math.random();
    exp = -Math.log(U) / lambda; //exp is the time to make the transition
    t += exp;

    if (t > T) {
      if (path == false) {
        return lastState;
      }
      else {
        return fullPath;
      }
    }

    sum = 0;
    U = Math.random();
    for (var i = 0; i < stateRow.length; i++) {
      sum += stateRow[i] / lambda;
      if (sum > U) {
        stateRow = transMatrix[i];
        fullPath[t] = i;
        lastState = i;
        i = stateRow.length;
      }
    }
  }
};

/**
 * Generates a random sample (with replacement) from a user input array of observations. Number of observations is specified by the user.
 * @example var sample = stoch.sample([1,2,3,4,5], +10);
 * @param {number[]} arr
 * @param {number} n (positive integer)
 * @returns {number[]} random sample 
 */
var sample = module.exports.sample = function(arr: number[], n: number) {
  var samp = [];
  for (var i = 0; i < n; i++) {
    var index = Math.floor(Math.random() * arr.length);
    var value = arr[index];
    samp.push(value);
  }
  return samp;
};

/**
 * Generates an exponential random variable with rate parameter lambda.
 * @example var exp = stoch.exp(20);
 * @param {number} lambda (positive)
 * @returns {number} variable
 */
var exp = module.exports.exp = function(lambda: number) {
  return (-Math.log(Math.random()) / lambda);
};

/**
 * Generates a Pareto random variables with parameters x_m and alpha.
 * @example var pareto = stoch.pareto(+20.0, -1.0);
 * @param {number} x_a (positive)
 * @param {number} alpha
 * @returns {number} distribution
 */
var pareto = module.exports.pareto = function(x_m: number, alpha: number) {
  return (x_m / Math.pow(Math.random(), 1 / alpha));
};

/**
 * Generates a histogram object from an array of data. Keys denote the lower bound of each bin and the values indicate the frequency of data in each bin.
 * 
 * ![hist](out/hist.png)
 * @example var hist = stoch.hist([1,1,1,1,2,3,3,4,4,4]);
 * @param {Array<number>} arr
 * @returns {Object} histogram
 */
var hist = module.exports.hist = function(arr: Array<number>) {
  var newArr = arr.slice().sort(function(a, b) {
    return a - b;
  });

  var max = newArr[arr.length - 1];
  var min = newArr[0];
  var bins = Math.round(Math.sqrt(arr.length));
  var binSize = (max - min) / bins;

  var obj = {};
  var keys = [];
  for (var i = 0; i < bins; i++) {
    var key = min + (i * binSize);
    keys.push(key);
    obj[key] = 0;
  }

  for (var j = 0; j < arr.length; j++) {
    var val = min;
    var temp_key = 0;
    while (true) {
      if (newArr[j] == newArr[newArr.length - 1]) {
        obj[keys[keys.length - 1]] += 1;
        break;
      }
      else if (newArr[j] < val + binSize) {
        obj[keys[temp_key]] += 1;
        break;
      }
      else {
        temp_key += 1;
        val += binSize;
      }
    }
  }

  return obj;
};
