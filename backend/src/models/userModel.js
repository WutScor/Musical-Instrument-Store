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
  deleteUserById: async (id) => {
    const query = `
      DELETE FROM public.user
      WHERE id = $1
    `;
    return await db.result(query, [id]);
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
};
