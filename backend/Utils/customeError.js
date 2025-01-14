class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Determine status based on statusCode
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true; // Indicates this is a known, operational error
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
    this.name = "ValidationError";
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
};
