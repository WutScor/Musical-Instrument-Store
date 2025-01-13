const db = require("../config/database");

module.exports = {
    getOrders: async (limit, offset, filters) => {
        const conditions = [];
        const values = [];
        let query = `
            SELECT id, user_id, order_date, total_price
            FROM public.order
        `;
        if (filters.userId) {
            conditions.push(`user_id = $${conditions.length + 1}`);
            values.push(filters.userId);
        }
        if (filters.order_date) {
            conditions.push(`order_date = $${conditions.length + 1}`);
            values.push(filters.order_date);
        }
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }
        query += ` ORDER BY id`;
        if (limit) {
            query += ` LIMIT $${values.length + 1}`;
            values.push(limit);
        }
        if (offset !== null) {
            query += ` OFFSET $${values.length + 1}`;
            values.push(offset);
        }
    
        console.log('query at ordersModel:', query);
        console.log('conditions at ordersModel:', conditions);  
        console.log('values at ordersModel:', values);
    
        const orders = await db.manyOrNone(query, values);
    
        // Fetch order_items for each order
        for (const order of orders) {
            const items = await db.manyOrNone(
                `SELECT * FROM public.order_item WHERE order_id = $1`, 
                [order.id]
            );
            order.items = items;
        }
        console.log('orders at ordersModel:', orders);
    
        return orders;
    },    
    getOrdersCount: async (filters) => {
        const conditions = [];
        const values = [];
        let query = `
      SELECT COUNT(*)
        FROM public.order
    `;
        if (filters.user_id) {
            conditions.push(`user_id = $${conditions.length + 1}`);
            values.push(filters.user_id);
        }
        if (filters.order_date) {
            conditions.push(`order_date = $${conditions.length + 1}`);
            values.push(filters.order_date);
        }
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }
        return await db.one(query, values, (a) => +a.count);
    },

};