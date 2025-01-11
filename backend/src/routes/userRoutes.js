const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const authController = require('../controllers/authController');
const { upload } = require("../config/supabase");

router.get("/", userController.getUsers);
router.post("/", upload.single("avatar"),
    passport.authenticate('jwt', { session: false }),
    authController.requireRole('admin'),
    userController.insertUser
);
router.delete("/:id", 
    passport.authenticate('jwt', { session: false }),
    authController.requireRole('admin'),
    userController.deleteUser
);
router.put("/:id",
    passport.authenticate('jwt', { session: false }),
    authController.requireRole('admin'),
    upload.single("avatar"),
    userController.updateUser
);
router.post("/payment_account", userController.createPaymentAccount);

module.exports = router;
