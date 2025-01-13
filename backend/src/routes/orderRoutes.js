const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const passport = require("passport");

router.get("/",
    passport.authenticate("jwt", { session: false }),
    orderController.getOrders);
router.get('/revenue',
    passport.authenticate("jwt", { session: false }),
    orderController.getRevenue);

module.exports = router;
