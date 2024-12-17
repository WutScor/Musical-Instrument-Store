const db = require("../config/database");

exports.getUsers = async (limit, offset) => {
  return await db.any("SELECT * FROM public.user LIMIT $1 OFFSET $2", [
    limit,
    offset,
  ]);
};

exports.getUserCount = async () => {
  const result = await db.one("SELECT COUNT(*) FROM public.user");
  return parseInt(result.count);
};

exports.deleteUserById = async (id) => {
  const query = `
    DELETE FROM public.user
    WHERE id = $1
  `;
  return await db.result(query, [id]);
};
