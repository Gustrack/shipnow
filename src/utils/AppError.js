class AppError extends Error {
  constructor(errorType, customMessage = null) {
    // Si pasamos un objeto del diccionario, usamos su mensaje. Si no, el string tal cual.
    super(customMessage || errorType.message);
    this.statusCode = errorType.status || 500;
    this.code = errorType.code || "UNKNOWN_ERROR"; // Opcional, para el frontend
    this.isOperational = true; // Diferencia errores esperados de bugs

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
