const HTTPBaseError = require('./http_base_error');

const ERROR_CODE = 4000000;

class HTTPReqParamError extends HTTPBaseError {
  constructor(paramNmae, desc, msg) {
    super(200, desc, ERROR_CODE, `${paramNmae} wrong: ${msg}`);
  }
}

module.exports = HTTPReqParamError;
