const deliveryService = require("../services/delivery.service");

class DeliveryController {
  async getAll(req, res, next) {
    try {
      const deliveries = await deliveryService.getAll();
      res.status(200).json({ data: deliveries });
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const delivery = await deliveryService.getById(req.params.id);
      res.status(200).json({ data: delivery });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DeliveryController();
