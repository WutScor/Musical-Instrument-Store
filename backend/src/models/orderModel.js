const db = require("../config/database");

exports.getOrders = async (limit, offset, userId) => {
  let query = `
    SELECT o.id, o.user_id, o.order_date, o.total_price, oi.name, oi.image, oi.quantity, oi.price
    FROM public.order o
    LEFT JOIN order_item oi ON o.id = oi.order_id
  `;
  const values = [];

  if (userId) {
    query += " WHERE o.user_id = $1";
    values.push(userId);
  }

  if (limit) {
    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);
  }

  const rows = await db.any(query, values);

  const orders = rows.reduce((acc, row) => {
    let order = acc.find((o) => o.id === row.id);
    if (!order) {
      order = {
        id: row.id,
        user_id: row.user_id,
        order_date: row.order_date,
        total_price: row.total_price,
        items: [],
      };
      acc.push(order);
    }

    order.items.push({
      name: row.name,
      image: row.image,
      quantity: row.quantity,
      price: row.price,
    });

    return acc;
  }, []);

  return orders;
};

exports.getOrderCount = async (userId) => {
  let query = "SELECT COUNT(*) FROM public.order";
  const values = [];

  if (userId) {
    query += " WHERE user_id = $1";
    values.push(userId);
  }

  const result = await db.one(query, values);
  return parseInt(result.count);
};
