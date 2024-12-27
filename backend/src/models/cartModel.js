const db = require("../config/database");

const getOrCreateCart = async (userId, limit, offset) => {
  try {
    // Check if the user exists
    let cart = await db.oneOrNone(
      `SELECT id AS cart_id 
       FROM cart 
       WHERE user_id = $1 AND isPaid = false`,
      [userId]
    );

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = await db.one(
        `INSERT INTO cart (user_id) 
         VALUES ($1) 
         RETURNING id AS cart_id`,
        [userId]
      );
    }

    // Pagination query
    let paginationQuery = "";
    const values = [cart.cart_id];

    if (limit !== null && offset !== null) {
      paginationQuery = `LIMIT $2 OFFSET $3`;
      values.push(limit, offset);
    }

    // Get items in the cart
    const items = await db.any(
      `
      SELECT 
        ci.quantity,
        mi.id AS musical_instrument_id,
        mi.name,
        mi.description,
        mi.additional_information,
        mi.image,
        mi.price,
        mi.quantity AS available_quantity,
        mi.release_year,
        mi.category_id
      FROM cart_item ci
      JOIN musical_instrument mi ON ci.musical_instrument_id = mi.id
      WHERE ci.cart_id = $1
      ${paginationQuery}
      `,
      values
    );

    // Format data
    const formattedItems = items.map((item) => ({
      quantity: item.quantity,
      musical_instrument: {
        id: item.musical_instrument_id,
        name: item.name,
        description: item.description,
        additional_information: item.additional_information,
        image: item.image,
        price: item.price,
        available_quantity: item.available_quantity,
        release_year: item.release_year,
        category_id: item.category_id,
      },
    }));

    return { cart_id: cart.cart_id, items: formattedItems };
  } catch (error) {
    console.error("Error in getOrCreateCart:", error);
    throw new Error("Database query failed");
  }
};

const getItemsInCartCount = async (cart_id) => {
  const result = await db.one(
    `SELECT COUNT(*) 
         FROM cart_item 
         WHERE cart_id = $1`,
    [cart_id]
  );

  return parseInt(result.count);
};

const addItemToCart = async (cart_id, musical_instrument_id, quantity) => {
  try {
    // Check if the cart exists and is unpaid
    const cart = await db.oneOrNone(
      `SELECT id AS cart_id 
       FROM cart 
       WHERE id = $1 AND isPaid = false`,
      [cart_id]
    );

    if (!cart) {
      const error = new Error("Cart not found or already paid");
      error.status = 404;
      throw error;
    }

    // Check if the musical instrument exists and get its available quantity
    const instrument = await db.oneOrNone(
      `SELECT id, quantity 
       FROM musical_instrument 
       WHERE id = $1`,
      [musical_instrument_id]
    );

    if (!instrument) {
      const error = new Error("Musical instrument not found");
      error.status = 404;
      throw error;
    }

    // Check if the requested quantity exceeds the available quantity
    if (quantity > instrument.quantity) {
      const error = new Error(
        "Not enough quantity available for this musical instrument"
      );
      error.status = 400;
      throw error;
    }

    // Check if the item already exists in the cart
    const existingItem = await db.oneOrNone(
      `SELECT id 
       FROM cart_item 
       WHERE cart_id = $1 AND musical_instrument_id = $2`,
      [cart_id, musical_instrument_id]
    );

    if (existingItem) {
      // If the item already exists, update the quantity
      await db.none(
        `UPDATE cart_item 
         SET quantity = $1 
         WHERE id = $2`,
        [quantity, existingItem.id]
      );
    } else {
      // If the item doesn't exist, add it to the cart
      await db.none(
        `INSERT INTO cart_item (cart_id, musical_instrument_id, quantity) 
         VALUES ($1, $2, $3)`,
        [cart_id, musical_instrument_id, quantity]
      );
    }

    return { message: "Item added/updated successfully" };
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "An unexpected error occurred";

    throw { status, message };
  }
};

const deleteItemFromCart = async (cart_id, musical_instrument_id) => {
  try {
    // Check if the cart exists and is unpaid
    const cart = await db.oneOrNone(
      `SELECT id AS cart_id 
       FROM cart 
       WHERE id = $1 AND isPaid = false`,
      [cart_id]
    );

    if (!cart) {
      const error = new Error("Cart not found or already paid");
      error.status = 404;
      throw error;
    }

    // Check if the item exists in the cart
    const existingItem = await db.oneOrNone(
      `SELECT id 
       FROM cart_item 
       WHERE cart_id = $1 AND musical_instrument_id = $2`,
      [cart_id, musical_instrument_id]
    );

    if (!existingItem) {
      const error = new Error("Item not found in the cart");
      error.status = 404;
      throw error;
    }

    // Remove the item from the cart
    await db.none(
      `DELETE FROM cart_item 
       WHERE id = $1`,
      [existingItem.id]
    );

    return { message: "Item removed from cart successfully" };
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "An unexpected error occurred";
    throw { status, message };
  }
};

const markCartAsPaid = async (cart_id) => {
  // Mark the cart as paid
  const updateCart = await db.result(
    `UPDATE cart SET isPaid = true WHERE id = $1 AND isPaid = false RETURNING id`,
    [cart_id]
  );

  // If the cart is not found or already paid, throw an error
  if (updateCart.rowCount === 0) {
    const error = new Error("Cart not found or already paid");
    error.status = 404;
    throw error;
  }

  return { message: "Checkout successful" };
};

module.exports = {
  getOrCreateCart,
  getItemsInCartCount,
  addItemToCart,
  deleteItemFromCart,
  markCartAsPaid,
};
