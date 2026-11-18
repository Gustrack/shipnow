const deliveryRepository = require("../repositories/delivery.repository");
const AppError = require("../utils/AppError");
const { ERROR_CODES } = require("../constants/errors.constants");

class DeliveryService {
  async getAll() {
    return deliveryRepository.findAll();
  }
  async getById(id) {
    const delivery = await deliveryRepository.findById(id);
    if (!delivery) {
      throw new AppError({ status: 404, message: "Entrega no encontrada" });
    }
    return delivery;
  }
}

module.exports = new DeliveryService();
