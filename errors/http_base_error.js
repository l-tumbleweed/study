class HTTPBaseError extends Error {
  constructor(httpStatusCode, httpMsg, errCode, msg) {
    super(`HTTP ERROR:${msg}`);
    this.httpStatusCode = httpStatusCode;
    this.httpMsg = httpMsg;
    this.errCode = errCode;
  }
}

module.exports = HTTPBaseError;

// try {
//   throw new HTTPBaseError(404, '资源不存在', 1000, 'resource not found');
// } catch (e) {
//   console.log(e.message);
//   console.log(e.httpStatusCode);
//   console.log(e.httpMsg);
//   console.log(e.errCode);
// }
