const { ERROR_CODES } = require("../constants/errors.constants");

const errorHandler = (err, req, res, next) => {
  // Log interno para desarrollo
  console.error(`[Error Handler] ${err.message}`);

  // Si es un error operativo (lanzado por nosotros con AppError)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Si es un error no controlado (ej. un bug, fallo de sintaxis, Mongo se cayó)
  // En producción NO deberíamos mandar el stack trace ni el mensaje real
  return res.status(500).json({
    status: "error",
    message: ERROR_CODES.INTERNAL_ERROR.message,
  });
};

module.exports = errorHandler;
