const defaultBalance = require("../config/constant").defaultBalance;
const db = require("../config/database");
require("dotenv").config();

exports.createPaymentAccount = async (userId) => {
  const queryCheck = `
    SELECT COUNT(*)
    FROM payment_account
    WHERE id = $1
  `;

  const queryInsert = `
    INSERT INTO payment_account (id, balance)
    VALUES ($1, ${defaultBalance})
  `;

  const result = await db.one(queryCheck, [userId]);

  if (parseInt(result.count) === 0) {
    await db.none(queryInsert, [userId]);
    return 1;
  } else {
    return 0;
  }
};

exports.updateBalance = async (id, adjustmentAmount, t) => {
  const query = `
    UPDATE payment_account
    SET balance = balance + $2
    WHERE id = $1
    RETURNING *
  `;

  const result = await t.any(query, [id, adjustmentAmount]);

  if (result.length === 0) {
    throw new Error(`No payment account found with id ${id}`);
  }
};
