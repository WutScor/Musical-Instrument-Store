const ordersModel = require('../models/ordersModel');
const { paginate } = require("../helpers/paginationHelper");

module.exports = {
    getOrders: async (req, res) => {
        try {
            const page = req.query.page ? parseInt(req.query.page) : null;
            const limit = req.query.limit ? parseInt(req.query.limit) : null;
            const offset = page && limit ? (page - 1) * limit : null;
            
            console.log('req.query.userId at ordersController:', req.query.userId);
            const filters = {
                userId: req.query.userId,
                order_date: req.query.order_date,
            };

            console.log('filters at ordersController:', filters);

            const orders = await ordersModel.getOrders(limit, offset, filters);

            console.log('orders at ordersController:', orders);

            const totalOrders = await ordersModel.getOrdersCount(filters);

            const mappedItems = orders.map(({ userId, ...order }) => ({
                ...order,
                user: order.user,
            }));

            console.log('mappedItems at ordersController:', mappedItems);

            const result = limit
                ? paginate(mappedItems, totalOrders, page || 1, limit)
                : { data: mappedItems, totalOrders };

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching orders' });
        }
    },
};