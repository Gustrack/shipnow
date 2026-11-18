const orderService = require("../services/order.service");

class OrderController {
  async getAll(req, res, next) {
    try {
      const orders = await orderService.getAll();
      res.status(200).json({ data: orders }); // Envolvemos en { data: ... }
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const order = await orderService.getById(req.params.id);
      res.status(200).json({ data: order });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
