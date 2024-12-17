const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategories);
router.post("/", categoryController.insertCategory);
router.delete("/:id", categoryController.deleteCategory);
router.put("/:id", categoryController.updateCategory);

module.exports = router;
