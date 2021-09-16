const isFile = (pathname) => pathname.split('/').length > 1 ? false : true;

module.exports = { isFile }