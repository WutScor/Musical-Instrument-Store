const db = require("../config/database");

exports.getMusicalInstruments = async (limit, offset) => {
  return await db.any("SELECT * FROM musical_instrument LIMIT $1 OFFSET $2", [
    limit,
    offset,
  ]);
};

exports.getMusicalInstrumentCount = async () => {
  const result = await db.one("SELECT COUNT(*) FROM musical_instrument");
  return parseInt(result.count);
};

exports.insertMusicalInstrument = async (
  name,
  description,
  additional_information,
  image,
  price,
  category_id
) => {
  const query = `
    INSERT INTO musical_instrument (name, description, additional_information, image, price, category_id)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  const values = [
    name,
    description,
    additional_information,
    image,
    price,
    category_id,
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
