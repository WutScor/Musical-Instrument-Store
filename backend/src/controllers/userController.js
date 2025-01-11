const userModel = require("../models/userModel");
const { paginate } = require("../helpers/paginationHelper");

exports.getUsers = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : null;
    console.log('page at userController:', page);
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    console.log('limit at userController:', limit);
    const offset = page && limit ? (page - 1) * limit : null;
    console.log('offset at userController:', offset);

    const filters = {
      username: req.query.username,
      email: req.query.email,
      isAdmin:
        req.query.isAdmin !== undefined && req.query.isAdmin !== ""
          ? req.query.isAdmin === "true"
          : undefined,
    };

    const items = await userModel.getUsers(limit, offset, filters);

    const totalItems = await userModel.getUserCount(filters);

    const mappedItems = items.map(({ password, ...item }) => item);

    const result = limit
      ? paginate(mappedItems, totalItems, page || 1, limit)
      : { data: mappedItems, totalItems };
    console.log('paginate at userController:', result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users." });
  }
};

exports.insertUser = async (req, res) => {
  try {
    console.log('req.body at insertUser', req.body);
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required." });
    }

    const newUser = await userModel.insertUser(username, email, password, isAdmin);

    res.status(201).json({ newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user." });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.deleteUserById(id);
    console.log('deletedUser', deletedUser);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('req.body', req.body);
    const { username, email, password, isAdmin } = req.body;

    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const updatedUser = await userModel.updateUserById(id, username, email, password, isAdmin);

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user." });
  }
};
