const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.totalChunks = ''
  }

  _transform(chunk, encoding, callback) {
    this.totalChunks += chunk
    if (chunk.includes(os.EOL)) {
      const chunks = this.totalChunks.toString().split(os.EOL)
      if (chunks.length === 1) {
        this.push(chunk)
        this.totalChunks = ''
      } else {
        chunks.forEach((chunk, idx) => {
          if (idx !== chunks.length - 1) {
            this.push(chunk)
          } else {
            this.totalChunks = chunk
          }
        })
      }
    }
    callback(null)
  }

  _flush(callback) {
    if (this.totalChunks) {
      this.push(this.totalChunks)
    }
    callback(null)
  }
}

module.exports = LineSplitStream;
