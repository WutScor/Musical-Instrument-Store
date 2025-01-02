const express = require("express");
const router = express.Router();
const { createAccount } = require("../controllers/paymentController");
const verifyJWT = require("../middlewares/jwtMiddleware");

router.get("/", verifyJWT, createAccount);

module.exports = router;
