const musicalInstrumentModel = require("../models/musicalInstrumentModel");
const { paginate } = require("../helpers/paginationHelper");

exports.getMusicalInstruments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const filters = {
      category_id: req.query.category_id,
      search: req.query.search,
      min_price: req.query.min_price
        ? parseFloat(req.query.min_price)
        : undefined,
      max_price: req.query.max_price
        ? parseFloat(req.query.max_price)
        : undefined,
      min_release_year: req.query.min_release_year
        ? parseInt(req.query.min_release_year)
        : undefined,
      max_release_year: req.query.max_release_year
        ? parseInt(req.query.max_release_year)
        : undefined,
      isAvailable:
        req.query.isAvailable !== undefined && req.query.isAvailable !== ""
          ? req.query.isAvailable === "true"
          : undefined,
    };

    const items = await musicalInstrumentModel.getMusicalInstruments(
      limit,
      offset,
      filters
    );

    const totalItems = await musicalInstrumentModel.getMusicalInstrumentCount(
      filters
    );

    const result = paginate(items, totalItems, page, limit);

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
      quantity,
      release_year,
    } = req.body;

    if (
      !name ||
      !description ||
      !image ||
      !price ||
      !category_id ||
      !quantity ||
      !release_year
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    await musicalInstrumentModel.insertMusicalInstrument(
      name,
      description,
      additional_information,
      image,
      price,
      category_id,
      quantity,
      release_year
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

exports.getRelatedMusicalInstruments = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;

    if (limit <= 0 || page <= 0) {
      return res
        .status(400)
        .json({ message: "Limit and page must be greater than 0." });
    }

    const offset = (page - 1) * limit;

    const items = await musicalInstrumentModel.getRelatedMusicalInstruments(
      id,
      limit,
      offset
    );

    const totalItems =
      await musicalInstrumentModel.getRelatedMusicalInstrumentCount(id);

    const result = paginate(items, totalItems, page, limit);

    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching related musical instruments." });
  }
};
