/* @flow */

'use strict';


/**
 * Given a Poisson process, the probability of obtaining exactly n successes in N trials is given by the limit of a binomial distribution
 * http://en.wikipedia.org/wiki/Poisson_process
 * @return {Array<nuber:positive>} An array with the times of each arrival in a Poisson Process
 * @param {number:positive} lambda (rate)
 * @param {number:positive} T (time)
 * @param {boolean} path
 */
var poissP = module.exports.poissP = function(lambda: number, T: number, path: boolean) {
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
    return n;
  }
  else {
    return N_t;
  }
};

/**
 * A normal distribution in a variate X with mean mu and variance sigma^2 is a statistic distribution with probability density function
 * @param {number} mu
 * @param {number:positive} sigma
 * @param {int:positive} num
 */
var norm = module.exports.norm = function(mu: number, sigma: number, num: number) {
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
    return boxMuller(mu, sigma)[0];
  }

  if (num / 2 % 2 != 0) sample.push(boxMuller(mu, sigma)[0]);
  for (var i = 0; i < Math.floor(num / 2); i++) {
    sample = sample.concat(boxMuller(mu, sigma));
  }
  return sample;
};

/**
 * Returns an array corresponding to the path of Brownian motion (http://en.wikipedia.org/wiki/Wiener_process#Related_processes) from time 0 to T with drift parameter mu and volatility parameter sigma (the process is initialized to be 0). The i-th entry in the array corresponds to the Brownian process at time i * (T/steps).
 * @param {number} mu
 * @param {number:positive} sigma
 * @param {number:positive} T
 * @param {int:positive} steps
 * @param {boolean} path
 */
var brown = module.exports.brown = function(mu: number, sigma: number, T: number, steps: number, path: boolean) {
  var B_t = [0];
  var B = 0;
  var dt = T / steps;
  var dB;

  if (!(T > 0) || !(steps > 0)) {
    return B_t;
  }

  if (path == false) {
    return ((mu * T) + (sigma * norm(0, Math.sqrt(T))));
  }
  else {
    for (var i = 0; i < steps; i++) {
      dB = (mu * dt) + (sigma * norm(0, Math.sqrt(dt)));
      B += dB;
      B_t.push(B);
    }
    return B_t;
  }
};

/**
 * Returns an array corresponding to the path of geometric Brownian motion (http://en.wikipedia.org/wiki/Geometric_Brownian_motion) from time 0 to T with drift parameter mu and volatility parameter sigma (the process is initialized to be S0). The i-th entry in the array corresponds to the geometric Brownian process at time i * (T/steps).
 * (dS/S) = mu*dt + sigma*dW, W(t) ~ norm(0,sqrt(t))
 * @param {number:positive} S0
 * @param {number} mu
 * @param {number:positive} sigma
 * @param {number:positive} T
 * @param {int:positive} steps
 * @param {boolean} path
 */
var GBM = module.exports.GBM = function(S0: number, mu:number, sigma: number, T: number, steps: number, path: boolean) {
  var S_t = [];

  if (!(T > 0) || !(steps > 0)) {
    return B_t;
  }

  if (path == false) {
    return S0 * Math.exp((mu - (sigma * sigma / 2)) * T + (sigma * norm(0, Math.sqrt(T))));
  }
  else {
    var B_t = brown((mu - (sigma * sigma / 2)), sigma, T, steps);
    B_t.forEach(function(B) {
      S_t.push(S0 * Math.exp(B));
    });
    return S_t;
  }
};

/**
 * Discrete-time Markov chain (DTMC)
 * @param {Array.Array<number>} transMatrix
 * @param {int:positive} steps
 * @param {number} start
 * @param {boolean} path
 */
var DTMC = module.exports.DTMC = function(transMatrix: number[][], steps: number, start: number, path: boolean) {
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
 * Continuous-time Markov chain (CTMC)
 * Returns an object with the {key:value} pair {time:state} at each step of the continuous-time Markov Chain (http://en.wikipedia.org/wiki/Continuous-time_Markov_chain) given by transMatrix (2-d array). The Markov Chain is simulated until time T. The initial state is given by start (the states are indexed from 0 to n-1 where n is the number of arrays in transMatrix).
 * @param {Array<Array<number>>} transMatrix
 * @param {number} T
 * @param {number} start
 * @param {boolean} path
 */
var CTMC = module.exports.CTMC = function(transMatrix: number[][], T: number, start: number, path: boolean) {
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
 * @param {Array<number>} arr  
 * @param {int:positive} n 
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
 * @param {number:positive} lambda
 */
var exp = module.exports.exp = function(lambda: number) {
  return (-Math.log(Math.random()) / lambda);
};

/**
 * The distribution with probability density function 
 * @param {number:positive} x_a
 * @param {number} alpha
 */
var pareto = module.exports.pareto = function(x_m: number, alpha: number) {
  return (x_m / Math.pow(Math.random(), 1 / alpha));
};

/**
 * Generates a histogram object from an array of data. Keys denote the lower bound of each bin and the values indicate the frequency of data in each bin.
 * @param {Array<number>} arr 
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
