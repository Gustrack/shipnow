const orderRepository = require("../repositories/order.repository");
const AppError = require("../utils/AppError");
const { ERROR_CODES } = require("../constants/errors.constants");
const { ORDER_STATUS } = require("../constants");

class OrderService {
  async getAll() {
    return orderRepository.findAll();
  }

  async getById(id) {
    const order = await orderRepository.findById(id);
    if (!order) {
      throw new AppError(ERROR_CODES.ORDER_NOT_FOUND); // <-- Usa el diccionario
    }
    return order;
  }

  async create({ user, items, total }) {
    if (!user || !items || items.length === 0) {
      // Usamos el error de validación genérico o creamos uno específico
      throw new AppError(ERROR_CODES.VALIDATION_ERROR);
    }
    return orderRepository.create({
      user,
      items,
      total,
      status: ORDER_STATUS.CREATED,
    });
  }

  async updateStatus(id, status) {
    if (!Object.values(ORDER_STATUS).includes(status)) {
      throw new AppError(ERROR_CODES.INVALID_ORDER_STATUS); // <-- Usa el diccionario
    }
    const updated = await orderRepository.updateStatus(id, status);
    if (!updated) {
      throw new AppError(ERROR_CODES.ORDER_NOT_FOUND); // <-- Usa el diccionario
    }
    return updated;
  }
}

module.exports = new OrderService();
