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
});

module.exports = { ERROR_CODES };
