const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':
      if (req.url.split('/').length > 2) {
        res.statusCode = 400;
        res.end('Nested folders are not supported')
      } else if (!fs.existsSync(filepath)) {
        res.statusCode = 404
        res.end('Not found')
      } else {
        res.statusCode = 200;
        fs.unlink(filepath, (err) => { })
        res.end('File was deleted successfully')
      }
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
