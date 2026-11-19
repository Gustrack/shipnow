const ERROR_CODES = Object.freeze({
  // Generales
  INTERNAL_ERROR: {
    status: 500,
    code: "ERR_INTERNAL_SERVER",
    message: "Error interno del servidor",
  },
  VALIDATION_ERROR: {
    status: 400,
    code: "ERR_VALIDATION",
    message: "Error de validación de datos",
  },
  INVALID_ID: {
    status: 400,
    code: "ERR_INVALID_ID",
    message: "El ID proporcionado no es válido",
  }, // <-- NUEVO para CastError

  // Usuarios y Productos
  USER_NOT_FOUND: {
    status: 404,
    code: "ERR_USER_NOT_FOUND",
    message: "Usuario no encontrado",
  },
  PRODUCT_NOT_FOUND: {
    status: 404,
    code: "ERR_PRODUCT_NOT_FOUND",
    message: "Producto no encontrado",
  },
  EMAIL_EXISTS: {
    status: 409,
    code: "ERR_EMAIL_EXISTS",
    message: "Ya existe un usuario con ese email",
  },
  NEGATIVE_PRICE: {
    status: 400,
    code: "ERR_NEGATIVE_PRICE",
    message: "El precio no puede ser negativo",
  },
  INVALID_ROLE: {
    status: 400,
    code: "ERR_INVALID_ROLE",
    message: "El rol proporcionado no es válido",
  },

  // Pedidos y Entregas
  ORDER_NOT_FOUND: {
    status: 404,
    code: "ERR_ORDER_NOT_FOUND",
    message: "Pedido no encontrado",
  },
  INVALID_ORDER_STATUS: {
    status: 400,
    code: "ERR_INVALID_ORDER_STATUS",
    message: "El estado del pedido no es válido",
  },
  DELIVERY_NOT_FOUND: {
    status: 404,
    code: "ERR_DELIVERY_NOT_FOUND",
    message: "Entrega no encontrada",
  },

  // Mocks
  INVALID_QUANTITY: {
    status: 400,
    code: "ERR_INVALID_QUANTITY",
    message: "La cantidad debe ser un número entero positivo mayor a 0",
  },
  SEED_ERROR: {
    status: 500,
    code: "ERR_SEED_ERROR",
    message:
      "Error al intentar insertar los datos de prueba en la base de datos",
  },

  // Archivos
  FILE_REQUIRED: {
    status: 400,
    code: "ERR_FILE_REQUIRED",
    message: "El archivo es requerido",
  },
  INVALID_FILE_TYPE: {
    status: 400,
    code: "ERR_INVALID_FILE_TYPE",
    message: "Tipo de archivo no permitido",
  },
  FILE_TOO_LARGE: {
    status: 400,
    code: "ERR_FILE_TOO_LARGE",
    message: "El archivo supera el límite de tamaño permitido",
  },
  INVALID_DOCUMENT_TYPE: {
    status: 400,
    code: "ERR_INVALID_DOCUMENT_TYPE",
    message: "El tipo de documento no es válido",
  },
  UPLOAD_ERROR: {
    status: 500,
    code: "ERR_UPLOAD_ERROR",
    message: "Error al intentar guardar el archivo",
  },
});

module.exports = { ERROR_CODES };
