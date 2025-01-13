const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const passport = require("passport");
const authController = require('../controllers/authController'); 

router.get("/",
    passport.authenticate('jwt', { session: false }),
    authController.requireRole('admin'), 
    orderController.getOrders);
router.get('/revenue',
    // passport.authenticate('jwt', { session: false }),
    // authController.requireRole('admin'),
    orderController.getRevenue);

module.exports = router;
