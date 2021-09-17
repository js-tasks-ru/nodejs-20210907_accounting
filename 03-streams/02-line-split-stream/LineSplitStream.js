const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.totalChunks = ''
  }

  _transform(chunk, encoding, callback) {
    this.totalChunks += chunk
    // const chunks = this.totalChunks.toString().split(os.EOL)
    // chunks.forEach((chunk) => {
    //   this.push(chunk)
    // })
    callback(null)
  }

  _flush(callback) {
    this.totalChunks.split(os.EOL).forEach((chunk) => this.push(chunk))
    this.totalChunks = null
    callback(null)
  }
}

module.exports = LineSplitStream;
