const ordersModel = require('../models/ordersModel');
const { paginate } = require("../helpers/paginationHelper");

module.exports = {
    getOrders: async (req, res) => {
        try {
            const page = req.query.page ? parseInt(req.query.page) : null;
            console.log('page at ordersController:', page); 
            const limit = req.query.limit ? parseInt(req.query.limit) : null;
            console.log('limit at ordersController:', limit);
            const offset = page && limit ? (page - 1) * limit : null;
            console.log('offset at ordersController:', offset);
            
            const filters = {
                userId: req.query.userId,
                order_date: req.query.order_date,
            };

            const orders = await ordersModel.getOrders(limit, offset, filters);

            const totalOrders = await ordersModel.getOrdersCount(filters);

            const mappedItems = orders.map((order) => {
                const { items, ...orderData } = order;
                const mappedItems = items.map((item) => {
                    const { order_id, ...itemData } = item;
                    return itemData;
                });
                return { ...orderData, items: mappedItems };
            });

            const result = limit
                ? paginate(mappedItems, totalOrders, page || 1, limit)
                : { data: mappedItems, totalOrders };
            console.log('paginate at ordersController:', result);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching orders' });
        }
    },
};