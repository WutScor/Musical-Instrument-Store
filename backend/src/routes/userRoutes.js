const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const { upload } = require("../config/supabase");
const authController = require('../controllers/authController');
const { upload } = require("../config/supabase");

router.get("/", 
    passport.authenticate('jwt', { session: false }),
    userController.getUsers
);
router.post("/", 
    passport.authenticate('jwt', { session: false }),
    authController.requireRole('admin'),
    upload.single("avatar"), userController.insertUser
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
router.post("/payment_account", 
    passport.authenticate('jwt', { session: false }),
    userController.createPaymentAccount
);

module.exports = router;
