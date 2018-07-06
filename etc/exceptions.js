function InvalidArgumentException(message) {
  this.messge = message;
  if("captureStackTrace" in Error) {
    Error.captureStackTrace(this, InvalidArgumentException);
  }
  else {
    this.stack = (new Error()).stack;
  }
}

InvalidArgumentException.prototype = Object.create(Error.prototype);
InvalidArgumentException.prototype.name = "InvalidArgumentException";
InvalidArgumentException.prototype.constructor = InvalidArgumentException;

exports.InvalidArgumentException = InvalidArgumentException;