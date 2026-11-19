const { ERROR_CODES } = require("../constants/errors.constants");
const logger = require("../config/logger");
const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  // 1. Errores de Multer
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      logger.warning(`Intento de subir archivo demasiado grande en ${req.url}`);
      return res.status(400).json({
        status: "error",
        code: ERROR_CODES.FILE_TOO_LARGE.code,
        message: ERROR_CODES.FILE_TOO_LARGE.message,
      });
    }
    return res
      .status(400)
      .json({ status: "error", code: "ERR_MULTER", message: err.message });
  }

  // 2. CastError de Mongoose (ID inválido, ej: GET /users/123)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    logger.warning(
      `ID inválido proporcionado en ${req.method} ${req.url}: ${err.value}`,
    );
    return res.status(400).json({
      status: "error",
      code: ERROR_CODES.INVALID_ID.code,
      message: ERROR_CODES.INVALID_ID.message,
    });
  }

  // 3. Errores operativos controlados (AppError)
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
      code: err.code,
      message: err.message,
    });
  }

  // 4. Errores inesperados
  logger.error(
    `Error inesperado del servidor [${req.method} ${req.url}]: ${err.message}`,
  );
  return res.status(500).json({
    status: "error",
    code: ERROR_CODES.INTERNAL_ERROR.code,
    message: ERROR_CODES.INTERNAL_ERROR.message,
  });
};

module.exports = errorHandler;
