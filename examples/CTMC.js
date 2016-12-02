/* @flow */

// CTMC(transMatrix, T, start, path)
import {plot} from 'plotter';

import * as stoch from '../src/index';

// switch to state 2 90% of the time; otherwise even probablity of staying or leaving state 2
const transMatrixTwo = [
        [0.1, 0.9],
        [0.5, 0.5]
];

// var CTMC = stoch.CTMC(transMatrixTwo, 20, 0, true);
const CTMC = stoch.CTMC([[0,1,0],[0,0,1],[.5,.5,0]], 20, 0, true);

plot({
    data:       {tick: CTMC},
    filename:   'out/CTMC.png',
    xlabel:     'time',
    ylabel:     'state',
    format:     'png'
});
