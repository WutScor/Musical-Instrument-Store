const db = require("../config/database");
const bcrypt = require("bcrypt");

module.exports = {
  getUsers: async (limit, offset, filters) => {
    const conditions = [];
    const values = [];
    let query = `
      SELECT id, username, email, isadmin, avatar
      FROM public.user
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
  updateUserById: async (id, username, email, password, isAdmin) => {
    if (password == '') {
      const query = `
        UPDATE public.user
        SET username = $2, email = $3, isadmin = $4
        WHERE id = $1
        RETURNING id, username, email, isadmin
      `;
      return await db.one(query, [id, username, email, isAdmin]);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `
        UPDATE public.user
        SET username = $2, email = $3, password = $4, isadmin = $5
        WHERE id = $1
        RETURNING id, username, email, isadmin
      `;
      return await db.one(query, [id, username, email, hashedPassword, isAdmin]);
    }
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
    return await db.oneOrNone({
      text: "SELECT id, username, email, isadmin, avatar FROM public.user WHERE id = $1",
      values: [id],
    });
  },
  getUserByEmail: async (email) => {
    return await db.oneOrNone({
      text: "SELECT id, username, email, isadmin, avatar FROM public.user WHERE email = $1",
      values: [email],
    });
  },
};
