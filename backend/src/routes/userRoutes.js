const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const authController = require('../controllers/authController');

router.get("/", userController.getUsers);
router.post("/",
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
    userController.updateUser
);

module.exports = router;
