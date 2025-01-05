exports.createOrder = async (cart_id, t) => {
  // 1. Lấy user_id từ bảng cart
  const cartResult = await t.one(`SELECT user_id FROM cart WHERE id = $1`, [
    cart_id,
  ]);
  const user_id = cartResult.user_id;

  // 2. Tính tổng giá từ các item trong giỏ hàng
  const totalPriceResult = await t.one(
    `SELECT SUM(mi.price * ci.quantity) AS total_price
       FROM cart_item ci
       JOIN musical_instrument mi ON ci.musical_instrument_id = mi.id
       WHERE ci.cart_id = $1`,
    [cart_id]
  );
  const totalPrice = totalPriceResult.total_price;

  // 3. Lưu vào bảng "order"
  const orderResult = await t.one(
    `INSERT INTO "order" (user_id, total_price)
       VALUES ($1, $2)
       RETURNING id`,
    [user_id, totalPrice]
  );
  const orderId = orderResult.id;

  // 4. Lấy tất cả các item từ giỏ hàng
  const cartItems = await t.any(
    `SELECT mi.name, mi.image, mi.price, ci.quantity
       FROM cart_item ci
       JOIN musical_instrument mi ON ci.musical_instrument_id = mi.id
       WHERE ci.cart_id = $1`,
    [cart_id]
  );

  // 5. Lưu các item vào bảng "order_item"
  const orderItemsQueries = cartItems.map((item) => {
    return t.none(
      `INSERT INTO order_item (order_id, name, image, quantity, price)
         VALUES ($1, $2, $3, $4, $5)`,
      [orderId, item.name, item.image, item.quantity, item.price]
    );
  });
  await t.batch(orderItemsQueries);

  // 6. Trả về kết quả
  return { message: "Order saved successfully", orderId };
};
