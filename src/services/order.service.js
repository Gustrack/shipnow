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
    if (!order)
      throw new AppError({ status: 404, message: "Pedido no encontrado" });
    return order;
  }
  async create({ user, items, total }) {
    if (!user || !items || items.length === 0) {
      throw new AppError({
        status: 400,
        message: "Datos del pedido inválidos",
      });
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
      throw new AppError({ status: 400, message: "Estado de pedido inválido" });
    }
    const updated = await orderRepository.updateStatus(id, status);
    if (!updated)
      throw new AppError({ status: 404, message: "Pedido no encontrado" });
    return updated;
  }
}

module.exports = new OrderService();
