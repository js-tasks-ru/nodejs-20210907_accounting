const LineSplitStream = require('./LineSplitStream');
const os = require('os');

const lines = new LineSplitStream({
    encoding: 'utf-8',
});
let count = 0;
function onData(line) {
    count += 1
    console.log(line);
    console.log('count: ' + count);
}

lines.on('data', onData);

lines.write('a');
lines.write(`b${os.EOL}c`);
lines.write(`d${os.EOL}e`);
lines.write('f');

lines.end();