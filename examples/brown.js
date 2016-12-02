// brown(mu, sigma, T, steps, path)

import {plot} from 'plotter';
import {brown} from '../src/index';

const example = brown(1.0, -0.1, 0.1, 100, true);

console.log(example);


plot({
    data:       example,
    filename:   'out/brown.png',
    xlabel:     'index',
    ylabel:     'goal',
    format:     'png'
});
