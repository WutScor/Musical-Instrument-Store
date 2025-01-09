const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { upload } = require("../config/supabase");

router.get("/", userController.getUsers);
router.post("/", upload.single("avatar"), userController.insertUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", upload.single("avatar"), userController.updateUser);
router.post("/payment_account", userController.createPaymentAccount);

module.exports = router;
