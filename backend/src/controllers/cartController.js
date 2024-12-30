const cartModel = require("../models/cartModel");
const { paginate } = require("../helpers/paginationHelper");

const getOrCreateCart = async (req, res) => {
  const { user_id } = req.body;
  const page = req.query.page ? parseInt(req.query.page) : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;

  let offset = 0;
  if (page && limit) {
    offset = (page - 1) * limit;
  }

  if (!user_id) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const cart = await cartModel.getOrCreateCart(user_id, limit, offset);
    const totalItems = await cartModel.getItemsInCartCount(user_id);
    const result = limit
      ? paginate(cart, totalItems, page || 1, limit)
      : { data: cart, totalItems };
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const addItemToCart = async (req, res) => {
  const { cart_id, item_id } = req.params;
  const { quantity } = req.body;

  if (!cart_id || !item_id || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await cartModel.addItemToCart(cart_id, item_id, quantity);
    res.status(200).json(result);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
};

const deleteItemFromCart = async (req, res) => {
  const { cart_id, item_id } = req.params;

  if (!cart_id || !item_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await cartModel.deleteItemFromCart(cart_id, item_id);

    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const checkoutCart = async (req, res) => {
  // Call payment gateway API

  // Mark cart as paid
  const { cart_id } = req.params;
  try {
    const result = await cartModel.markCartAsPaid(cart_id);
    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }

  // Save order
};

module.exports = {
  getOrCreateCart,
  addItemToCart,
  deleteItemFromCart,
  checkoutCart,
};
