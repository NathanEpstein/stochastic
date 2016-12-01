import { spec, valid, explain, conform } from 'js.spec';

import * as stoch from '../src/index';

console.log(stoch);
console.log(spec);

console.log('norm is an Array', spec.array(stoch.norm(1, 1, 100)));
