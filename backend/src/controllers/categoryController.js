const categoryModel = require("../models/categoryModel");
const { paginate } = require("../helpers/paginationHelper");

exports.getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const categories = await categoryModel.getCategories(limit, offset);
    const totalItems = await categoryModel.getCategoryCount();

    const result = paginate(categories, totalItems, page, limit);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

exports.insertCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({ message: "Name and image are required." });
    }

    await categoryModel.insertCategory(name, image);

    res.status(201).json({ message: "Category added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error inserting category." });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Category ID is required." });
    }

    const result = await categoryModel.deleteCategoryById(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting category." });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Category ID is required." });
    }

    const updates = {};
    const { name, image } = req.body;

    if (name) updates.name = name;
    if (image) updates.image = image;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    const result = await categoryModel.updateCategoryById(id, updates);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating category." });
  }
};
