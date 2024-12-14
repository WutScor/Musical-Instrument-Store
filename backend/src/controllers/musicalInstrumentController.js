const musicalInstrumentModel = require("../models/musicalInstrumentModel");
const { paginate } = require("../helpers/paginationHelper");

exports.getMusicalInstruments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const categories = await musicalInstrumentModel.getMusicalInstruments(
      limit,
      offset
    );
    const totalItems = await musicalInstrumentModel.getMusicalInstrumentCount();

    const result = paginate(categories, totalItems, page, limit);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching musical instruments" });
  }
};

exports.insertMusicalInstrument = async (req, res) => {
  try {
    const {
      name,
      description,
      additional_information,
      image,
      price,
      category_id,
    } = req.body;

    if (!name || !description || !image || !price || !category_id) {
      return res.status(400).json({ message: "All fields are required." });
    }

    await musicalInstrumentModel.insertMusicalInstrument(
      name,
      description,
      additional_information,
      image,
      price,
      category_id
    );

    res.status(201).json({ message: "Musical instrument added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error inserting musical instrument." });
  }
};

exports.deleteMusicalInstrument = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    const result = await musicalInstrumentModel.deleteMusicalInstrument(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Musical instrument not found." });
    }

    res
      .status(200)
      .json({ message: "Musical instrument deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting musical instrument." });
  }
};

exports.updateMusicalInstrument = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    const updatedInstrument =
      await musicalInstrumentModel.updateMusicalInstrument(id, updates);

    if (!updatedInstrument) {
      return res.status(404).json({ message: "Musical instrument not found." });
    }

    res.status(200).json({
      message: "Musical instrument updated successfully.",
      updatedInstrument,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating musical instrument." });
  }
};
