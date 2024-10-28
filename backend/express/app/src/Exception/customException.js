class CustomException extends Error {
    constructor(statusCode, message, logLevel) {
      super(message);
      this.message = message;
      this.statusCode = statusCode;
      this.logLevel = logLevel;
      Object.setPrototypeOf(this, CustomException.prototype);
    }
  }
  
module.exports = CustomException;
