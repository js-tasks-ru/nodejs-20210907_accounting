const http = require('http');
const path = require('path');
const fs = require('fs');
const server = new http.Server();
const { isFile } = require('./helpers');



server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  const stream = fs.createReadStream(filepath);

  switch (req.method) {
    case 'GET':
      stream.on('error', (err) => {
        if (err.code === 'ENOENT') {
          if (!isFile(pathname)) {
            res.statusCode = 400
            res.end('Bad request')
          } else {
            res.statusCode = 404
            res.end('Not Found')
          }
        }
        else {
          res.statusCode = 500
          res.end('Server error')
        }
      })
      stream.on('data', (chunk) => res.end(chunk))
      req.on('aborted', () => stream.destroy())
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});


module.exports = server;
