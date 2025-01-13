const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const passport = require("passport");

router.post("/",
    passport.authenticate('jwt', { session: false }),
    cartController.getOrCreateCart);
router.post("/:cart_id/items",
    passport.authenticate('jwt', { session: false }),
    cartController.addItemsToCart);
router.delete("/:cart_id/items/:item_id",
    passport.authenticate('jwt', { session: false }),
    cartController.deleteItemFromCart);
router.post("/:cart_id/checkout",
    passport.authenticate('jwt', { session: false }),
    cartController.checkoutCart);

module.exports = router;
