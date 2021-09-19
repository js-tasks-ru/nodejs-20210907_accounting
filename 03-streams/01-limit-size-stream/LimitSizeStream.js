const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    const { limit } = options;
    this.limit = limit;
    this.size = 0;
  }

  _transform(chunk, encoding, callback) {
    const error = new LimitExceededError()
    this.size += chunk.byteLength
    this.size > this.limit ? callback(error) : callback(null, chunk)
  }
}

module.exports = LimitSizeStream;
