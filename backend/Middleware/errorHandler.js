const { AppError } = require("../Utils/customeError");
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
  // Handle unknown errors
  console.error("Unknown error:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
