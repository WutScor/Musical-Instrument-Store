const express = require("express");
const router = express.Router();
const {
  createPaymentAccount,
  checkout,
} = require("../controllers/paymentController");
const verifyJWT = require("../middlewares/jwtMiddleware");

router.post("/accounts", verifyJWT, createPaymentAccount);
router.post("/checkout", verifyJWT, checkout);

module.exports = router;
