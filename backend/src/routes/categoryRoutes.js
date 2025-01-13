const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { upload } = require("../config/supabase");
const passport = require("passport");
const authController = require('../controllers/authController');    

router.get("/", categoryController.getCategories);
router.post("/", 
    passport.authenticate('jwt', { session: false }),
    authController.requireRole('admin'),
    upload.single("image"), 
    categoryController.insertCategory);
router.delete("/:id",
    passport.authenticate('jwt', { session: false }),
    authController.requireRole('admin'),
    categoryController.deleteCategory);
router.put("/:id",
    passport.authenticate('jwt', { session: false }),
    authController.requireRole('admin'),
    upload.single("image"),
    categoryController.updateCategory);

module.exports = router;
