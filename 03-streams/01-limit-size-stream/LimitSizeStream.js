const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    const { limit } = options;
    this.limit = limit;
    this.totalChunks = '';
  }

  _transform(chunk, encoding, callback) {
    const error = new LimitExceededError()
    this.totalChunks += chunk
    Buffer.from(this.totalChunks).byteLength > this.limit ? callback(error) : callback(null, chunk)
  }
}

module.exports = LimitSizeStream;
