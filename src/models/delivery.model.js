const mongoose = require("mongoose");
const { DELIVERY_PRIORITY } = require("../constants");

const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    courier: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // El repartidor
    priority: {
      type: String,
      enum: Object.values(DELIVERY_PRIORITY),
      default: DELIVERY_PRIORITY.MEDIUM,
    },
    status: { type: String, default: "PENDING" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Delivery", deliverySchema);
