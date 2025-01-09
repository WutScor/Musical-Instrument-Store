const bcrypt = require("bcrypt");
const db = require("../config/database");

exports.createUserAccount = async (username, password) => {
  const query = `
    WITH ins AS (
      INSERT INTO public.user (username, password, isAdmin)
      VALUES ($1, $2, true)
      ON CONFLICT (username) DO NOTHING
      RETURNING id
    )
    SELECT id FROM ins
    UNION ALL
    SELECT id FROM public.user WHERE username = $1 LIMIT 1
  `;

  const hashedPassword = await bcrypt.hash(password, 10);
  const values = [username, hashedPassword];
  return await db.one(query, values);
};

exports.findByCartId = async (cart_id) => {
  const query = `
        SELECT u.*
        FROM cart c, public.user u
        WHERE c.user_id = u.id AND c.id = $1
    `;

  return await db.one(query, [cart_id]);
};

exports.findByCredentials = async (username, password) => {
  const query = `
        SELECT *
        FROM public.user
        WHERE username = $1
    `;

  const user = await db.oneOrNone(query, [username]);
  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  return user;
};
