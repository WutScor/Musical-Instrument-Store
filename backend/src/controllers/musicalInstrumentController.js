const musicalInstrumentModel = require("../models/musicalInstrumentModel");
const { paginate } = require("../helpers/paginationHelper");
const { supabase } = require("../config/supabase");
const { BUCKET_NAME: bucketName } = require("../config/constant");
require("dotenv").config();

exports.getMusicalInstruments = async (req, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const offset = page && limit ? (page - 1) * limit : null;

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

    const mappedItems = items.map(({ category_id, ...item }) => ({
      ...item,
      category: item.category,
    }));

    const result = limit
      ? paginate(mappedItems, totalItems, page || 1, limit)
      : { data: mappedItems, totalItems };

    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.insertMusicalInstrument = async (req, res, next) => {
  try {
    const {
      name,
      description,
      additional_information,
      price,
      category_id,
      quantity,
      release_year,
    } = req.body;
    const image = req.file;

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

    await musicalInstrumentModel.insertMusicalInstrument(
      name,
      description,
      additional_information,
      publicUrl,
      price,
      category_id,
      quantity,
      release_year
    );

    res.status(201).json({
      name,
      description,
      additional_information,
      image: publicUrl,
      price,
      category_id,
      quantity,
      release_year,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteMusicalInstrument = async (req, res, next) => {
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
    next(error);
  }
};

exports.updateMusicalInstrument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    let imageUrl = null;

    if (req.file) {
      const { file } = req;
      const { originalname, buffer } = file;
      const fileName = `${Date.now()}-${originalname}`;
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, buffer);

      if (uploadError) {
        console.log(uploadError);
        return res.status(500).json({ message: "Error uploading image." });
      }

      const supabaseUrl = process.env.SUPABASE_URL;
      imageUrl = `https://${supabaseUrl.replace(
        "https://",
        ""
      )}/storage/v1/object/public/${bucketName}/${fileName}`;
    }

    if (imageUrl) {
      updates.image = imageUrl;
    }

    const updatedInstrument =
      await musicalInstrumentModel.updateMusicalInstrument(id, updates);

    if (!updatedInstrument) {
      return res.status(404).json({ message: "Musical instrument not found." });
    }

    res.status(200).json({
      updatedInstrument,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRelatedMusicalInstruments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const page = req.query.page ? parseInt(req.query.page) : null;

    if ((limit !== null && limit <= 0) || (page !== null && page <= 0)) {
      return res
        .status(400)
        .json({ message: "Limit and page must be greater than 0." });
    }

    const offset = limit && page ? (page - 1) * limit : null;

    const items = await musicalInstrumentModel.getRelatedMusicalInstruments(
      id,
      limit,
      offset
    );

    const totalItems =
      await musicalInstrumentModel.getRelatedMusicalInstrumentCount(id);

    const mappedItems = items.map(({ category_id, ...item }) => ({
      ...item,
      category: item.category,
    }));

    const result = limit
      ? paginate(mappedItems, totalItems, page || 1, limit)
      : { data: mappedItems, totalItems };

    res.json(result);
  } catch (error) {
    next(error);
  }
};
