const express = require("express");
const Order = require("../models/orderModel");
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getStatus
} = require("../controllers/orderController");
const router = express.Router();

router.get("/:id", getOrder);

router.post("/status", getStatus);

router.get("/", getOrders);

router.post("/", createOrder);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

module.exports = router;
