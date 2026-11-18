const Order = require("../models/order.model");

class OrderRepository {
  async findAll() {
    return Order.find().populate("user").select("-__v").lean();
  }
  async findById(id) {
    return Order.findById(id).populate("user").select("-__v").lean();
  }
  async create(data) {
    const order = await Order.create(data);
    return order.toObject({ versionKey: false });
  }
  async updateStatus(id, status) {
    return Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    )
      .select("-__v")
      .lean();
  }
}

module.exports = new OrderRepository();
