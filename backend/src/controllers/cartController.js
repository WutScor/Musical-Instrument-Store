const cartModel = require("../models/cartModel");
const { paginate } = require("../helpers/paginationHelper");
const https = require("https");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET_SUB_SYSTEM;

const getOrCreateCart = async (req, res, next) => {
  const { user_id } = req.body;
  const page = req.query.page ? parseInt(req.query.page) : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;

  let offset = 0;
  if (page && limit) {
    offset = (page - 1) * limit;
  }

  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  try {
    const cart = await cartModel.getOrCreateCart(user_id, limit, offset);
    const totalItems = await cartModel.getItemsInCartCount(cart.cart_id);
    const result = limit
      ? paginate(cart, totalItems, page || 1, limit)
      : { data: cart, totalItems };
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addItemsToCart = async (req, res, next) => {
  const { cart_id } = req.params;
  const items = req.body;

  if (!cart_id || !Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ error: "Missing required fields or invalid format" });
  }

  try {
    const result = await cartModel.addItemsToCart(cart_id, items);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteItemFromCart = async (req, res, next) => {
  const { cart_id, item_id } = req.params;

  if (!cart_id || !item_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await cartModel.deleteItemFromCart(cart_id, item_id);

    res.status(200).json({ message: result.message });
  } catch (error) {
    next(error);
  }
};

const checkoutCart = async (req, res, next) => {
  const { cart_id } = req.params;

  if (!cart_id) {
    return res.status(400).json({ message: "cart_id is required" });
  }

  const token = jwt.sign({ system: "backend" }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  try {
    const response = await axios.post(
      "https://localhost:4001/payments/checkout",
      { cartId: cart_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        httpsAgent,
      }
    );

    const result = response.data;

    res.status(200).json(result);
  } catch (error) {
    // If the error is from the axios response (e.g. status code 4xx or 5xx)
    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json(data);
    }

    // If the error is not from the axios response (e.g. network error)
    next(error);
  }
};

module.exports = {
  getOrCreateCart,
  addItemsToCart,
  deleteItemFromCart,
  checkoutCart,
};
