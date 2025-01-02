const categoryModel = require("../models/categoryModel");
const { paginate } = require("../helpers/paginationHelper");
const { supabase } = require("../config/supabase");
const { BUCKET_NAME: bucketName } = require("../config/constant");
require("dotenv").config();

exports.getCategories = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    let offset = 0;
    if (page && limit) {
      offset = (page - 1) * limit;
    }

    const categories = await categoryModel.getCategories(limit, offset);
    const totalItems = await categoryModel.getCategoryCount();

    const result = limit
      ? paginate(categories, totalItems, page || 1, limit)
      : { data: categories, totalItems };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

exports.insertCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file;

    if (!name || !image) {
      return res.status(400).json({ message: "Name and image are required." });
    }

    const fileName = `${Date.now()}-${image.originalname}`;
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, image.buffer, {
        contentType: image.mimetype,
      });

    if (uploadError) {
      console.log(uploadError);
      return res.status(500).json({ message: "Error uploading image." });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const publicUrl = `https://${supabaseUrl.replace(
      "https://",
      ""
    )}/storage/v1/object/public/${bucketName}/${fileName}`;

    await categoryModel.insertCategory(name, publicUrl);

    res.status(201).json({
      name,
      image: publicUrl,
    });
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
    const { name } = req.body;
    const image = req.file;

    if (image) {
      const fileName = `${Date.now()}-${image.originalname}`;
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, image.buffer, {
          contentType: image.mimetype,
        });

      if (uploadError) {
        console.log(uploadError);
        return res.status(500).json({ message: "Error uploading image." });
      }

      const supabaseUrl = process.env.SUPABASE_URL;
      const publicUrl = `https://${supabaseUrl.replace(
        "https://",
        ""
      )}/storage/v1/object/public/${bucketName}/${fileName}`;
      if (publicUrl) updates.image = publicUrl;
    }

    if (name) updates.name = name;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    const updatedCategory = await categoryModel.updateCategoryById(id, updates);

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({
      updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating category." });
  }
};
