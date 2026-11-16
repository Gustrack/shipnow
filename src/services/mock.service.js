const { faker } = require("@faker-js/faker");
const mockRepository = require("../repositories/mock.repository");
const {
  USER_ROLES,
  ORDER_STATUS,
  DELIVERY_PRIORITY,
  PRODUCT_STATUS,
} = require("../constants");
const { ERROR_CODES } = require("../constants/errors.constants");
const AppError = require("../utils/AppError");

class MockService {
  // NUEVO: Función auxiliar para validar la cantidad
  validateQuantity(qty) {
    // Si no es un número o es menor o igual a 0, lanzamos error
    if (isNaN(qty) || qty <= 0) {
      throw new AppError(ERROR_CODES.INVALID_QUANTITY);
    }
  }

  generateMockUsers(qty = 10) {
    this.validateQuantity(qty); // <-- Validación
    // ... (resto del código de generación igual)
  }

  // ... generateMockProducts ...

  async seedDatabase(qty = 10) {
    this.validateQuantity(qty); // <-- Validación
    try {
      // ... (todo el código de generación y guardado)
      return { users: savedUsers.length /* ... */ };
    } catch (error) {
      // Si falla algo en Mongo (ej. conexión perdida), lanzamos un error controlado
      if (!error.isOperational) {
        throw new AppError(ERROR_CODES.SEED_ERROR);
      }
      throw error; // Si ya es un AppError, lo dejamos pasar
    }
  }
}

module.exports = new MockService();
