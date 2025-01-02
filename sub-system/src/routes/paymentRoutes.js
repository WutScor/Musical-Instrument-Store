const express = require("express");
const router = express.Router();
const {
  createUserAccount,
  createPaymentAccount,
} = require("../controllers/paymentController");
const verifyJWT = require("../middlewares/jwtMiddleware");

router.get("/", verifyJWT, createUserAccount);

module.exports = router;
