// norm(mu, sigma, num)

import * as stoch from '../src/index';

import {plot} from 'plotter';


const norm = stoch.norm(1, 1, 100);
const hist = stoch.hist(norm);

const data = Object.keys(hist).map((e, i, c) => { return hist[e]; });
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
