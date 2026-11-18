const Order = require("../models/order.model");

class OrderRepository {
  async findAll() {
    return Order.find().populate("user").select("-__v").lean();
  }
  async findById(id) {
    return Order.findById(id).populate("user").select("-__v").lean();
  }
}

module.exports = new OrderRepository();
