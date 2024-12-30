const { paginate } = require("../helpers/paginationHelper");
const orderModel = require("../models/orderModel");

exports.getOrders = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const userId = req.query.userId ? parseInt(req.query.userId) : null;

    let offset = 0;
    if (page && limit) {
      offset = (page - 1) * limit;
    }

    const orders = await orderModel.getOrders(limit, offset, userId);
    const totalItems = await orderModel.getOrderCount(userId);

    const result = limit
      ? paginate(orders, totalItems, page || 1, limit)
      : { data: orders, totalItems };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};
