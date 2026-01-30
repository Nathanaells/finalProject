const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError"
  ) {
    status = 400;
    message = err.errors.map((e) => e.message);
  }

  if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid Token";
  }

  if (err.name === "ValidationError") {
    status = 400;
    message = err.message;
  }

  if (err.name === "UnauthorizedError") {
    status = 401;
    message = "Unauthorized";
  }

  if (err.name === "ForbiddenError") {
    status = 403;
    message = "Forbidden";
  }
  if (err.name === "NotFoundError") {
    status = 404;
    message = "Not Found";
  }

  res.status(status).json({ message, error: err.message });
};

module.exports = errorHandler;
