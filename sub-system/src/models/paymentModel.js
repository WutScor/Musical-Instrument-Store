const db = require("../config/database");
const defaultBalance = require("../config/constant").defaultBalance;

const bcrypt = require("bcrypt");

exports.createUserAccount = async (username, password) => {
  const query = `
    INSERT INTO public.user (username, password, isAdmin)
    VALUES ($1, $2, true)
    RETURNING id
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
