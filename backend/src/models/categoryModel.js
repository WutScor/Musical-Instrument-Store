const db = require("../config/database");

exports.getCategories = async (limit, offset) => {
  if (limit) {
    return await db.any("SELECT * FROM category LIMIT $1 OFFSET $2", [
      limit,
      offset,
    ]);
  }
  return await db.any("SELECT * FROM category");
};

exports.getCategoryCount = async () => {
  const result = await db.one("SELECT COUNT(*) FROM category");
  return parseInt(result.count);
};

exports.insertCategory = async (name, image) => {
  return await db.none("INSERT INTO category (name, image) VALUES ($1, $2)", [
    name,
    image,
  ]);
};

exports.deleteCategoryById = async (id) => {
  return await db.result("DELETE FROM category WHERE id = $1", [id]);
};

exports.updateCategoryById = async (id, updates) => {
  const fields = [];
  const values = [];

  Object.keys(updates).forEach((key, index) => {
    fields.push(`${key} = $${index + 1}`);
    values.push(updates[key]);
  });

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  const query = `UPDATE category SET ${fields.join(", ")} WHERE id = ${id}`;
  return await db.result(query, values);
};
