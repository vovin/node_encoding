var assert = require('assert');

var Encoder = require('../encoding.js');

var c1250 = new Encoder('cp1250');
var iso_2 = new Encoder('iso-8859-2');

assert.equal('Ą',c1250.decode('\xa5'));
assert.equal('ąęćśź',c1250.decode('\xb9\xea\xe6\x9c\x9f'));

assert.equal('Ą',iso_2.decode('\xa1'));

assert.equal(typeof (cp1250.decode('\xa5')), 'string');

