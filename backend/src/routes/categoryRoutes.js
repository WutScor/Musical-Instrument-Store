const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { upload } = require("../config/supabase");

router.get("/", categoryController.getCategories);
router.post("/", upload.single("image"), categoryController.insertCategory);
router.delete("/:id", categoryController.deleteCategory);
router.put("/:id", upload.single("image"), categoryController.updateCategory);

module.exports = router;
