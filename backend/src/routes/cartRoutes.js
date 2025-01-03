const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/", cartController.getOrCreateCart);
router.post("/:cart_id/items", cartController.addItemsToCart);
router.delete("/:cart_id/items/:item_id", cartController.deleteItemFromCart);
router.post("/:cart_id/checkout", cartController.checkoutCart);

module.exports = router;
