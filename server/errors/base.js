module.exports = class BaseError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new BaseError(400, message, errors);
  }
};
