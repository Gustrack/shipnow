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
const logger = require("../config/logger"); // <-- NUEVO

class MockService {
  validateQuantity(qty) {
    if (isNaN(qty) || qty <= 0) {
      logger.warning(
        `Intento de generar mocks con cantidad inválida: '${qty}'`,
      ); // <-- NUEVO
      throw new AppError(ERROR_CODES.INVALID_QUANTITY);
    }
  }

  generateMockUsers(qty = 10) {
    this.validateQuantity(qty);
    logger.debug(`Generando ${qty} usuarios mock en memoria`); // <-- NUEVO
    // ... (resto del código de generación igual)
  }

  async seedDatabase(qty = 10) {
    this.validateQuantity(qty);
    try {
      logger.info(`Iniciando carga de datos de prueba en DB (qty=${qty})`); // <-- NUEVO
      // ... (resto del código de guardado)
      logger.info(
        `Carga de mocks exitosa: ${savedUsers.length} usuarios, ${orders.length} pedidos...`,
      ); // <-- NUEVO
      return { users: savedUsers.length /* ... */ };
    } catch (error) {
      if (!error.isOperational) {
        logger.error(
          `Fallo al insertar datos mock en MongoDB: ${error.message}`,
        ); // <-- NUEVO
        throw new AppError(ERROR_CODES.SEED_ERROR);
      }
      throw error;
    }
  }
}
module.exports = new MockService();
