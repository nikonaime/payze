const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
