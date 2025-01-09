const db = require("../config/database");

exports.calculateTotalPrice = async (cart_id) => {
  const query = `
        SELECT COALESCE(SUM(mi.price * ci.quantity), 0) AS total_price
        FROM cart_item ci
        JOIN musical_instrument mi ON ci.musical_instrument_id = mi.id
        WHERE ci.cart_id = $1
    `;

  const result = await db.one(query, [cart_id]);
  return result.total_price;
};

exports.deleteCartItems = async (cart_id, t) => {
  await t.none(`DELETE FROM cart_item WHERE cart_id = $1`, [cart_id]);
  await t.none(`DELETE FROM cart WHERE id = $1`, [cart_id]);
};
