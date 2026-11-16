const User = require("../models/user.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");
const Delivery = require("../models/delivery.model");

class MockRepository {
  async insertUsers(users) {
    return await User.insertMany(users);
  }

  async insertProducts(products) {
    return await Product.insertMany(products);
  }

  async insertOrders(orders) {
    return await Order.insertMany(orders);
  }

  async insertDeliveries(deliveries) {
    return await Delivery.insertMany(deliveries);
  }
}

module.exports = new MockRepository();
