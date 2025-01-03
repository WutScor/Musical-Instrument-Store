const cartModel = require("../models/cartModel");
const { paginate } = require("../helpers/paginationHelper");

const getOrCreateCart = async (req, res, next) => {
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
  // Call payment gateway API
  // update quantity of items in stock
  await cartModel.updateMusicalInstrumentStock(cart_id);
  // Mark cart as paid

  try {
    const result = await cartModel.markCartAsPaid(cart_id);
    // Save order
    const orderResult = await cartModel.saveOrder(cart_id);
    res.status(200).json({
      message: "Checkout successful",
      orderId: orderResult.orderId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrCreateCart,
  addItemsToCart,
  deleteItemFromCart,
  checkoutCart,
};
