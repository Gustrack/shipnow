const { ERROR_CODES } = require("../constants/errors.constants");
const logger = require("../config/logger");
const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  // 1. Atrapar errores específicos de Multer (ej. tamaño excedido)
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      logger.warning(`Intento de subir archivo demasiado grande en ${req.url}`);
      return res.status(400).json({
        status: "error",
        code: ERROR_CODES.FILE_TOO_LARGE.code, // <-- Agregamos el código
        message: ERROR_CODES.FILE_TOO_LARGE.message,
      });
    }
    // Otros errores de Multer
    return res.status(400).json({
      status: "error",
      code: "ERR_MULTER", // <-- Agregamos un código genérico
      message: err.message,
    });
  }

  // 2. Errores operativos controlados (AppError)
  if (err.isOperational) {
    if (err.statusCode >= 400 && err.statusCode < 500) {
      logger.warning(
        `Error de negocio [${req.method} ${req.url}]: ${err.message}`,
      );
    } else {
      logger.error(
        `Error interno controlado [${req.method} ${req.url}]: ${err.message}`,
      );
    }

    return res.status(err.statusCode).json({
      status: "error",
      code: err.code || "ERR_OPERATIONAL",
      message: err.message,
    });
  }

  // 3. Errores inesperados (bugs, fallos de sintaxis, caída de DB)
  logger.error(
    `Error inesperado del servidor [${req.method} ${req.url}]: ${err.message}`,
  );

  return res.status(500).json({
    status: "error",
    code: ERROR_CODES.INTERNAL_ERROR.code, // <-- Agregamos el código
    message: ERROR_CODES.INTERNAL_ERROR.message,
  });
};

module.exports = errorHandler;
