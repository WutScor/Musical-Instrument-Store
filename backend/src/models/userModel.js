const db = require("../config/database");
const bcrypt = require("bcrypt");

module.exports = {
  getUsers: async (limit, offset) => {
    const baseQuery = `
    SELECT 
      u.*, 
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
  insertUser: async (username, password, email, isAdmin, publicUrl) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await db.none(
      "INSERT INTO public.user (username, password, email, isAdmin, avatar) VALUES ($1, $2, $3, $4, $5)",
      [username, hashedPassword, email, isAdmin, publicUrl]
    );
  },
  deleteUserById: async (id) => {
    const query = `
      DELETE FROM public.user
      WHERE id = $1
    `;

    if (filters.username) {
      conditions.push(`username ILIKE $${conditions.length + 1}`);
      values.push(`%${filters.username}%`);
    }

    if (filters.email) {
      conditions.push(`email ILIKE $${conditions.length + 1}`);
      values.push(`%${filters.email}%`);
    }

    if (filters.isAdmin !== undefined) {
      conditions.push(`isadmin = $${conditions.length + 1}`);
      values.push(filters.isAdmin);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += ` ORDER BY id`;

    if (limit) {
      query += ` LIMIT $${values.length + 1}`;
      values.push(limit);
    }

    if (offset !== null) {
      query += ` OFFSET $${values.length + 1}`;
      values.push(offset);
    }

    return await db.manyOrNone(query, values);
  },
  getUserCount: async (filters) => {
    const conditions = [];
    const values = [];
    let query = "SELECT COUNT(*) FROM public.user";

    if (filters.username) {
      conditions.push(`username ILIKE $${conditions.length + 1}`);
      values.push(`%${filters.username}%`);
    }

    if (filters.email) {
      conditions.push(`email ILIKE $${conditions.length + 1}`);
      values.push(`%${filters.email}%`);
    }

    if (filters.isAdmin !== undefined) {
      conditions.push(`isadmin = $${conditions.length + 1}`);
      values.push(filters.isAdmin);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    return await db.one(query, values, (data) => +data.count);
  },
  insertUser: async (username, email, password, isAdmin) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await db.one({
      text: `
        INSERT INTO public.user (username, password, email, isadmin, avatar)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, email, isadmin, avatar
      `,
      values: [username, hashedPassword, email, isAdmin, 'https://i.pinimg.com/originals/95/4e/0f/954e0f2ab2e4f5ade11b494a479fbf18.jpg'],
    });
  },
  deleteUserById: async (id, username, email, password, is) => {
    const query = `DELETE FROM public.user WHERE id = $1 RETURNING id`;
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
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await db.one({
      text: `
        INSERT INTO public.user (username, password, email, isadmin, avatar)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, email, isadmin, avatar
      `,
      values: [user.username, hashedPassword, user.email, false, 'https://i.pinimg.com/originals/95/4e/0f/954e0f2ab2e4f5ade11b494a479fbf18.jpg'],
    });
  },
  getUserByUsername: async (username) => {
    return await db.oneOrNone({
      text: "SELECT * FROM public.user WHERE username = $1",
      values: [username],
    });
  },
  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
  getUserById: async (id) => {
    try {
      const query = `
        SELECT id, username, isadmin, avatar
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
