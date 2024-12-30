const db = require("../config/database");
const bcrypt = require("bcrypt");

module.exports = {
  getUsers: async (limit, offset) => {
    if (limit) {
      return await db.any("SELECT * FROM public.user LIMIT $1 OFFSET $2", [
        limit,
        offset,
      ]);
    }
    return await db.any("SELECT * FROM public.user");
  },
  getUserCount: async () => {
    const result = await db.one("SELECT COUNT(*) FROM public.user");
    return parseInt(result.count);
  },
  insertUser: async (username, password, email, isAdmin) => {
    return await db.none(
      "INSERT INTO public.user (username, password, email, isAdmin) VALUES ($1, $2, $3, $4)",
      [username, password, email, isAdmin]
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
    WHERE id = ${id}
    RETURNING *;
  `;

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
  }
};
