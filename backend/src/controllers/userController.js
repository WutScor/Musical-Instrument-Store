const userModel = require("../models/userModel");
const { paginate } = require("../helpers/paginationHelper");

exports.getUsers = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    let offset = 0;
    if (page && limit) {
      offset = (page - 1) * limit;
    }

    const users = await userModel.getUsers(limit, offset);
    const totalItems = await userModel.getUserCount();

    const result = limit
      ? paginate(users, totalItems, page || 1, limit)
      : { data: users, totalItems };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching Users" });
  }
};

exports.insertUser = async (req, res) => {
  try {
    const { username, password, email, isAdmin } = req.body;

    if (
      !username ||
      !password ||
      !email ||
      isAdmin === undefined ||
      isAdmin === null
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    await userModel.insertUser(username, password, email, isAdmin);

    res.status(201).json({
      username,
      password,
      email,
      isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error inserting user." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const result = await userModel.deleteUserById(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    const updatedUser = await userModel.updateUserById(id, updates);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user." });
  }
};
