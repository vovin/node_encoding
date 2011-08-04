/*
    encoding.js - decoding national characters for Node.js

     Copyright (C) 2011 by Pawel Rogozinski

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

modules.exports = Encoder;

function Encoder(codepage) {
    var o = {};
    var translator = mapping[codepage];
    if (typeof translator !== 'function') {
        throw new Error('unknown codepage ' + codepage);
    }

    o.decode = function decode(input) {
        return convert_2_utf8(input, input.len, translator).toString('utf8');
    }
    return o;
}



var t_iso8859_2 = [
    /* 0x80 */
    0x0080, 0x0081, 0x0082, 0x0083, 0x0084, 0x0085, 0x0086, 0x0087,
    0x0088, 0x0089, 0x008a, 0x008b, 0x008c, 0x008d, 0x008e, 0x008f,
    0x0090, 0x0091, 0x0092, 0x0093, 0x0094, 0x0095, 0x0096, 0x0097,
    0x0098, 0x0099, 0x009a, 0x009b, 0x009c, 0x009d, 0x009e, 0x009f,
    0x00a0, 0x0104, 0x02d8, 0x0141, 0x00a4, 0x013d, 0x015a, 0x00a7,
    0x00a8, 0x0160, 0x015e, 0x0164, 0x0179, 0x00ad, 0x017d, 0x017b,
    0x00b0, 0x0105, 0x02db, 0x0142, 0x00b4, 0x013e, 0x015b, 0x02c7,
    0x00b8, 0x0161, 0x015f, 0x0165, 0x017a, 0x02dd, 0x017e, 0x017c,
    0x0154, 0x00c1, 0x00c2, 0x0102, 0x00c4, 0x0139, 0x0106, 0x00c7,
    0x010c, 0x00c9, 0x0118, 0x00cb, 0x011a, 0x00cd, 0x00ce, 0x010e,
    0x0110, 0x0143, 0x0147, 0x00d3, 0x00d4, 0x0150, 0x00d6, 0x00d7,
    0x0158, 0x016e, 0x00da, 0x0170, 0x00dc, 0x00dd, 0x0162, 0x00df,
    0x0155, 0x00e1, 0x00e2, 0x0103, 0x00e4, 0x013a, 0x0107, 0x00e7,
    0x010d, 0x00e9, 0x0119, 0x00eb, 0x011b, 0x00ed, 0x00ee, 0x010f,
    0x0111, 0x0144, 0x0148, 0x00f3, 0x00f4, 0x0151, 0x00f6, 0x00f7,
    0x0159, 0x016f, 0x00fa, 0x0171, 0x00fc, 0x00fd, 0x0163, 0x02d9
    ];

var t_cp1250 = [
    /* 0x80 */
    0x20ac, 0x0000, 0x201a, 0x0000, 0x201e, 0x2026, 0x2020, 0x2021,
    0x0000, 0x2030, 0x0160, 0x2039, 0x015a, 0x0160, 0x017d, 0x0179,
    0x0000, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022, 0x2013, 0x2014,
    0x0000, 0x2122, 0x0161, 0x203a, 0x015b, 0x0165, 0x017e, 0x017a,
    0x00a0, 0x02c7, 0x02d8, 0x0141, 0x00a4, 0x0104, 0x00a6, 0x00a7,
    0x00a8, 0x00a9, 0x015e, 0x00ab, 0x00ac, 0x00ad, 0x00ae, 0x017b,
    0x00b0, 0x00b1, 0x02db, 0x0142, 0x00b4, 0x00b5, 0x00b6, 0x00b7,
    0x00b8, 0x0105, 0x015f, 0x00bb, 0x013d, 0x02dd, 0x013e, 0x017c,
    0x0154, 0x00c1, 0x00c2, 0x0102, 0x00c4, 0x0139, 0x0106, 0x00c7,
    0x010c, 0x00c9, 0x0118, 0x00cb, 0x011a, 0x00cd, 0x00ce, 0x010e,
    0x0110, 0x0143, 0x0147, 0x00d3, 0x00d4, 0x0150, 0x00d6, 0x00d7,
    0x0158, 0x016e, 0x00da, 0x0170, 0x00dc, 0x00dd, 0x0162, 0x00df,
    0x0155, 0x00e1, 0x00e2, 0x0103, 0x00e4, 0x013a, 0x0107, 0x00e7,
    0x010d, 0x00e9, 0x0119, 0x00eb, 0x011b, 0x00ed, 0x00ee, 0x010f,
    0x0111, 0x0144, 0x0148, 0x00f3, 0x00f4, 0x0151, 0x00f6, 0x00f7,
    0x0159, 0x016f, 0x00fa, 0x0171, 0x00fc, 0x00fd, 0x0163, 0x02d9
    ];


var t_cp1252[32] = [ 
    /* 0x80 */
    0x20ac, 0x0000, 0x201a, 0x0192, 0x201e, 0x2026, 0x2020, 0x2021, 
    0x02c6, 0x2030, 0x0160, 0x2039, 0x0152, 0x0000, 0x017d, 0x0000,
    0x0000, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022, 0x2013, 0x2014,
    0x02dc, 0x2122, 0x0161, 0x203a, 0x0153, 0x0000, 0x017e, 0x0178,
    ];

function unifrom_generator(from, table) {
    var to = from + table.length;
    return function(c) {
        if (c < from || c >= to) {
            return c;
        } else {
            return table[c - from];
        }
    }
}

var unifrom_cp1252 = unifrom_generator(0x80, t_cp1252);
var unifrom_cp1250 = unifrom_generator(0x80, t_cp1250);
var unifrom_latin2 = unifrom_generator(0x80, t_iso8859_2);
var unifrom_latin1 = unifrom_generator(0xffff, []);


var mapping = {
    'ISO-8859-1': unifrom_latin1,
    'iso-8859-1': unifrom_latin1,
    'ISO8859-1': unifrom_latin1,
    'iso8859-1': unifrom_latin1,
    'Latin1': unifrom_latin1,
    'Latin-1': unifrom_latin1,
    'latin1': unifrom_latin1,
    'latin-1': unifrom_latin1,

    'ISO-8859-2': unifrom_latin2,
    'iso-8859-2': unifrom_latin2,
    'ISO8859-2': unifrom_latin2,
    'iso8859-2': unifrom_latin2,
    'Latin2': unifrom_latin2,
    'Latin-2': unifrom_latin2,
    'latin2': unifrom_latin2,
    'latin-2': unifrom_latin2,

    'WINDOWS-1250': unifrom_cp1250,
    'Windows-1250': unifrom_cp1250,
    'windows-1250': unifrom_cp1250,
    'cp-1250': unifrom_cp1250,
    'cp1250': unifrom_cp1250,
    'Win1250': unifrom_cp1250,

    'WINDOWS-1252': unifrom_cp1252,
    'Windows-1252': unifrom_cp1252,
    'windows-1252': unifrom_cp1252,
    'cp-1252': unifrom_cp1252,
    'cp-1252': unifrom_cp1252,
    'CP1252': unifrom_cp1252,
    'CP1252': unifrom_cp1252
}


function convert_2_utf8(input, len, unicodefunction) {
    // input = Buffer.
    if (!Buffer.isBuffer(input)) {
        input = new Buffer(input, 'binary');
    }

    // calculate new buffer length
    var i, outpos, ac = 0;
    var output;
    var c;

    for (i = 0; i < len; ++i) {
        if (input[i] >= 0x80) {
            ++ac;
        }
    }

    output = new Buffer(len + ac * 2); // three bytes for each high charactrer, just in case if we need them
    for (i = 0, outpos = 0; i < len; ++i) {
        c = input[i];
        if (c >= 0x80) {
            c = unicodefunction(c);
            if (!c) {
                // undefined character change to '?'
                c = '?'.charAtCode(0);
            } else {
                if (c < 0x800) {
                    // two bytes char
                    output[outpos++] = ((c >> 6) & 0x1F) | 0xC0;
                    c = (c & 0x3F) | 0x80;
                } else {
                    // three bytes character
                    output[outpos++] = ((c >> 12) & 0x0F) | 0xE0;
                    output[outpos++] = ((c >> 6) & 0x3F) | 0x80;
                    c = (c & 0x3F) | 0x80;
                }
            }
        }
        output[outpos++] = c;

    }
    return output.slice(0, outpos);
}

