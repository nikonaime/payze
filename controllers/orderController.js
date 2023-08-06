const Order = require("../models/orderModel");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

//get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single order
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create an order
const createOrder = async (req, res) => {
  try {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: {
          amount: req.body.amount,
          currency: "USD",
          lang: "EN",
          callback: "https://webhook.site/72f6e7e5-fed4-41da-b7fb-fe464e09ff2c",
          callbackError:
            "https://webhook.site/72f6e7e5-fed4-41da-b7fb-fe464e09ff2c",
        },
        method: "justPay",
        apiKey: API_KEY,
        apiSecret: API_SECRET,
      }),
    };

    const response = await fetch("https://payze.io/api/v1", options);
    const responseData = await response.json();

    const transactionUrl = responseData.response.transactionUrl;

    const orderData = {
      ...req.body,
      transactionUrl,
    };

    // const order = await Order.create(req.body);

    res.status(200).json(orderData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//update an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body);
    // we cannot find any product with the given id
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }
    const updatedOrder = await Order.findById(id);

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    // we cannot find any product with the given id
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getOrders, getOrder, createOrder, updateOrder, deleteOrder };
