const orderRepository = require("../repositories/order.repository");
const AppError = require("../utils/AppError");
const { ERROR_CODES } = require("../constants/errors.constants");

class OrderService {
  async getAll() {
    return orderRepository.findAll();
  }
  async getById(id) {
    const order = await orderRepository.findById(id);
    if (!order) {
      // Si no tenés ORDER_NOT_FOUND en tu diccionario, usamos un error genérico
      throw new AppError({ status: 404, message: "Pedido no encontrado" });
    }
    return order;
  }
}

module.exports = new OrderService();
