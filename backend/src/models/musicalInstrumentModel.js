const db = require("../config/database");

exports.getMusicalInstruments = async (limit, offset, filters) => {
  const conditions = [];
  const values = [];
  let query = "SELECT * FROM musical_instrument";

  if (filters.category_id) {
    conditions.push(`category_id = $${conditions.length + 1}`);
    values.push(filters.category_id);
  }

  if (filters.search) {
    conditions.push(`name ILIKE $${conditions.length + 1}`);
    values.push(`%${filters.search}%`);
  }

  if (filters.min_price) {
    conditions.push(`price >= $${conditions.length + 1}`);
    values.push(filters.min_price);
  }

  if (filters.max_price) {
    conditions.push(`price <= $${conditions.length + 1}`);
    values.push(filters.max_price);
  }

  if (filters.min_release_year) {
    conditions.push(`release_year >= $${conditions.length + 1}`);
    values.push(filters.min_release_year);
  }

  if (filters.max_release_year) {
    conditions.push(`release_year <= $${conditions.length + 1}`);
    values.push(filters.max_release_year);
  }

  if (filters.isAvailable !== undefined) {
    if (filters.isAvailable === true) {
      conditions.push(`quantity > 0`);
    } else if (filters.isAvailable === false) {
      conditions.push(`quantity <= 0`);
    }
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
  values.push(limit, offset);

  return await db.any(query, values);
};

exports.getMusicalInstrumentCount = async (filters) => {
  const conditions = [];
  const values = [];
  let query = "SELECT COUNT(*) FROM musical_instrument";

  if (filters.category_id) {
    conditions.push(`category_id = $${conditions.length + 1}`);
    values.push(filters.category_id);
  }

  if (filters.search) {
    conditions.push(`name ILIKE $${conditions.length + 1}`);
    values.push(`%${filters.search}%`);
  }

  if (filters.min_price) {
    conditions.push(`price >= $${conditions.length + 1}`);
    values.push(filters.min_price);
  }

  if (filters.max_price) {
    conditions.push(`price <= $${conditions.length + 1}`);
    values.push(filters.max_price);
  }

  if (filters.min_release_year) {
    conditions.push(`release_year >= $${conditions.length + 1}`);
    values.push(filters.min_release_year);
  }

  if (filters.max_release_year) {
    conditions.push(`release_year <= $${conditions.length + 1}`);
    values.push(filters.max_release_year);
  }

  if (filters.isAvailable !== undefined) {
    if (filters.isAvailable === true) {
      conditions.push(`quantity > 0`);
    } else if (filters.isAvailable === false) {
      conditions.push(`quantity <= 0`);
    }
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  return await db.one(query, values, (result) => +result.count);
};

exports.insertMusicalInstrument = async (
  name,
  description,
  additional_information,
  image,
  price,
  category_id,
  quantity,
  release_year
) => {
  const query = `
    INSERT INTO musical_instrument (name, description, additional_information, image, price, category_id, quantity, release_year)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  const values = [
    name,
    description,
    additional_information,
    image,
    price,
    category_id,
    quantity,
    release_year,
  ];

  return await db.none(query, values);
};

exports.deleteMusicalInstrument = async (id) => {
  const query = `
    DELETE FROM musical_instrument WHERE id = $1
  `;

  return await db.result(query, [id]);
};

exports.updateMusicalInstrument = async (id, updates) => {
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
    UPDATE musical_instrument
    SET ${fields.join(", ")}
    WHERE id = ${id}
    RETURNING *;
  `;

  return await db.oneOrNone(query, values);
};

exports.getRelatedMusicalInstruments = async (id, limit, offset) => {
  const query = `
    SELECT * 
    FROM musical_instrument 
    WHERE category_id = (
        SELECT category_id 
        FROM musical_instrument 
        WHERE id = $1
    ) AND id != $1
    ORDER BY quantity DESC
    LIMIT $2 OFFSET $3
  `;
  return await db.any(query, [id, limit, offset]);
};

exports.getRelatedMusicalInstrumentCount = async (id) => {
  const query = `
    SELECT COUNT(*) 
    FROM musical_instrument 
    WHERE category_id = (
        SELECT category_id 
        FROM musical_instrument 
        WHERE id = $1
    ) AND id != $1
  `;
  return await db.one(query, [id], (result) => +result.count);
};
