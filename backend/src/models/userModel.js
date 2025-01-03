const db = require("../config/database");
const bcrypt = require("bcrypt");

module.exports = {
  getUsers: async (limit, offset) => {
    const baseQuery = `
    SELECT 
      u.id, 
      u.username, 
      u.email, 
      u.isAdmin, 
      pa.balance
    FROM public.user u
    LEFT JOIN payment_account pa ON u.id = pa.id
  `;

    if (limit) {
      return await db.any(`${baseQuery} LIMIT $1 OFFSET $2`, [limit, offset]);
    }
    return await db.any(baseQuery);
  },
  getUserCount: async () => {
    const result = await db.one("SELECT COUNT(*) FROM public.user");
    return parseInt(result.count);
  },
  insertUser: async (username, password, email, isAdmin) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await db.none(
      "INSERT INTO public.user (username, password, email, isAdmin) VALUES ($1, $2, $3, $4)",
      [username, hashedPassword, email, isAdmin]
    );
  },
  deleteUserById: async (id) => {
    const query = `
      DELETE FROM public.user
      WHERE id = $1
    `;
    return await db.result(query, [id]);
  },
  updateUserById: async (id, updates) => {
    const fields = [];
    const values = [];

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    Object.keys(updates).forEach((key, index) => {
      fields.push(`${key} = $${index + 1}`);
      values.push(updates[key]);
    });

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    const query = `
    UPDATE public.user
    SET ${fields.join(", ")}
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `;

    values.push(id);

    return await db.oneOrNone(query, values);
  },
  createUser: async (user) => {
    try {
      const query = `
        INSERT INTO public.user (username, password, isadmin)
        VALUES ($1, $2, false)
        RETURNING id, username, isadmin
      `;

      const hashedPassword = await bcrypt.hash(user.password, 10);

      return await db.one(query, [user.username, hashedPassword]);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  getUserByUsername: async (username) => {
    try {
      const query = `
        SELECT * FROM public.user
        WHERE username = $1
      `;

      return await db.oneOrNone(query, [username]);
    } catch (error) {
      console.error("Error getting user by username:", error);
      throw error;
    }
  },
  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
  getUserById: async (id) => {
    try {
      const query = `
        SELECT id, username, isadmin
        FROM public.user
        WHERE id = $1
      `;

      return await db.oneOrNone(query, [id]);
    } catch (error) {
      console.error("Error getting user by id:", error);
      throw error;
    }
  },
};
