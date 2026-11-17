const ERROR_CODES = Object.freeze({
  // Generales
  INTERNAL_ERROR: { status: 500, message: "Error interno del servidor" },
  VALIDATION_ERROR: { status: 400, message: "Error de validación de datos" },

  // Usuarios y Productos
  USER_NOT_FOUND: { status: 404, message: "Usuario no encontrado" },
  PRODUCT_NOT_FOUND: { status: 404, message: "Producto no encontrado" },
  EMAIL_EXISTS: { status: 409, message: "Ya existe un usuario con ese email" },
  NEGATIVE_PRICE: { status: 400, message: "El precio no puede ser negativo" },
  INVALID_ROLE: { status: 400, message: "El rol proporcionado no es válido" },

  // Mocks (Módulo 3)
  INVALID_QUANTITY: {
    status: 400,
    message: "La cantidad debe ser un número entero positivo mayor a 0",
  },
  SEED_ERROR: {
    status: 500,
    message:
      "Error al intentar insertar los datos de prueba en la base de datos",
  },

  // Archivos y Carga (Módulo 7)
  FILE_REQUIRED: {
    status: 400,
    message: "El archivo es requerido",
  },
  INVALID_FILE_TYPE: {
    status: 400,
    message: "Tipo de archivo no permitido. Solo se aceptan PDF, JPG o PNG",
  },
  FILE_TOO_LARGE: {
    status: 400,
    message: "El archivo supera el límite de tamaño permitido (5MB)",
  },
  INVALID_DOCUMENT_TYPE: {
    status: 400,
    message: "El tipo de documento no es válido",
  },
  UPLOAD_ERROR: {
    status: 500,
    message: "Error al intentar guardar el archivo",
  },
});

module.exports = { ERROR_CODES };
