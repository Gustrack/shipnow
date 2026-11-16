const { ERROR_CODES } = require("../constants/errors.constants");
const logger = require("../config/logger"); // <-- NUEVO

const errorHandler = (err, req, res, next) => {
  // Si es un error operativo (lanzado por nosotros con AppError)
  if (err.isOperational) {
    // Los errores de negocio (400, 404) se registran como "warning"
    if (err.statusCode >= 400 && err.statusCode < 500) {
      logger.warning(
        `Error de negocio [${req.method} ${req.url}]: ${err.message}`,
      );
    } else {
      // Errores 500 controlados se registran como "error"
      logger.error(
        `Error interno controlado [${req.method} ${req.url}]: ${err.message}`,
      );
    }

    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Si es un error NO controlado (un bug, fallo de sintaxis, caída de DB)
  logger.error(
    `Error inesperado del servidor [${req.method} ${req.url}]: ${err.message}`,
  );

  return res.status(500).json({
    status: "error",
    message: ERROR_CODES.INTERNAL_ERROR.message,
  });
};

module.exports = errorHandler;
