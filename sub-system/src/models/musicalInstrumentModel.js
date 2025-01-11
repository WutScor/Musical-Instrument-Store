const db = require("../config/database");

exports.updateMusicalInstrumentQuantity = async (cart_id, t) => {
  // Get all items in the cart
  const cartItems = await db.any(
    `SELECT musical_instrument_id, quantity FROM cart_item WHERE cart_id = $1`,
    [cart_id]
  );

  // Update the quantity of each item in the cart
  for (let item of cartItems) {
    await t.none(
      `UPDATE musical_instrument 
       SET quantity = quantity - $1 
       WHERE id = $2 AND quantity >= $1`,
      [item.quantity, item.musical_instrument_id]
    );
  }

  return { message: "Stock updated successfully" };
};
