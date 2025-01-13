const { paginate } = require("../helpers/paginationHelper");
const orderModel = require("../models/orderModel");

exports.getOrders = async (req, res, next) => {
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
    console.log('result', result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getRevenue = async (req, res, next) => {
  try {
      const result = await orderModel.getRevenue();
      res.json(result);
  } catch (error) {
    next(error);
  }
};
