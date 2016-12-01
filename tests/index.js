import { spec, valid, explain, conform } from 'js.spec';
import _ from 'lodash';
import * as stoch from '../src/index';

console.log(stoch);
console.log(spec, valid, explain, conform);
const normal = spec.set;
const e = stoch.norm(1, 1, 100);
console.log('norm is a Collection', spec.coll(e));

// console.log(explain(normal, e));
