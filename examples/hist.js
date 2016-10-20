// hist(arr)
import {plot} from 'plotter';

import * as stoch from '../src/index';

// [ 31, 63, 41, 60, 35...]
const arr = Array
      .apply(
        null,
        Array(200))
      .map(
        (e, i, c) => Math.round(Math.random() * 100));

// var hist = stoch.hist(arr);
const hist = stoch.hist([1,1,1,1,2,3,3,4,4,4]);


const data = Object.keys(hist).map((e, i, c) => { return hist[e]; });
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
