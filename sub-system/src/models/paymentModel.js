const db = require("../config/database");
const defaultBalance = require("../config/constant").defaultBalance;

const bcrypt = require("bcrypt");

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

exports.createPaymentAccount = async (userId) => {
  const query = `
    INSERT INTO payment_account (id, balance)
    VALUES ($1, ${defaultBalance})
  `;

  await db.none(query, [userId]);
};
