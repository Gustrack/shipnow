const Delivery = require("../models/delivery.model");

class DeliveryRepository {
  async findAll() {
    return Delivery.find()
      .populate("order")
      .populate("courier")
      .select("-__v")
      .lean();
  }
  async findById(id) {
    return Delivery.findById(id)
      .populate("order")
      .populate("courier")
      .select("-__v")
      .lean();
  }
}

module.exports = new DeliveryRepository();
