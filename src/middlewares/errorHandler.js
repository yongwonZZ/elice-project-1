class customError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

class notFoundError extends customError {
  constructor(message = 'Not found') {
    super(404, message);
    this.name = 'notFoundError';
  }
}

class badRequestError extends customError {
  constructor(message = 'Bad request') {
    super(400, message);
    this.name = 'badRequestError';
  }
}

class unauthorizedError extends customError {
  constructor(message = 'Unauthorized') {
    super(401, message);
    this.name = 'unauthorizedError';
  }
}

class forbiddenError extends customError {
  constructor(message = 'Forbidden') {
    super(403, message);
    this.name = 'forbiddenError';
  }
}

class internalServerError extends customError {
  constructor(message = 'Internal server error') {
    super(500, message);
    this.name = 'internalServerError';
  }
}

class validationError extends customError {
  constructor(message = 'Validation failed') {
    super(422, message);
    this.name = 'validationError';
  }
}

class databaseError extends customError {
  constructor(message = 'Database error') {
    super(500, message);
    this.name = 'databaseError';
  }
}

class notModifiedError extends customError {
  constructor(message = 'Not modified') {
    super(304, message);
    this.name = 'notModifiedError';
  }
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || err.code || 500;
  res.status(statusCode).json({
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = {
  errorHandler,
  notFoundError,
  badRequestError,
  unauthorizedError,
  forbiddenError,
  internalServerError,
  validationError,
  databaseError,
  notModifiedError,
};
