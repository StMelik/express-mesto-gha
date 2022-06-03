class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 404
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 401
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 500
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 400
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 409
  }
}

module.exports = {
  NotFoundError,
  AuthError,
  ServerError,
  BadRequestError,
  ConflictError
}