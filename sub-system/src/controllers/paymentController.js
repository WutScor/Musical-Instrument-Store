const paymentModel = require("../models/paymentModel");
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const musicalInstrumentModel = require("../models/musicalInstrumentModel");
const cartModel = require("../models/cartModel");
const db = require("../config/database");

const createReceiverAccount = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userId = await userModel.createUserAccount(username, password);
    await paymentModel.createPaymentAccount(userId.id);
  } catch (error) {
    throw error;
  }
};

const createPaymentAccount = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  const exists = await paymentModel.isExistedUserAccount(userId);
  if (exists) {
    return res.status(201).json({ 
      message: "Payment account already exists",
    });
  }

  try {
    const result = await paymentModel.createPaymentAccount(userId);

    if (result === 1) {
      res.status(201).json({ message: "Payment account created successfully" });
    } else if (result === 0) {
      res.status(409).json({ message: "Payment account already exists" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const checkout = async (req, res) => {
  const username = process.env.PAYMENT_USERNAME;
  const password = process.env.PAYMENT_PASSWORD;
  const { cartId } = req.body;

  try {
    const t = await db.tx(async (t) => {
      try {
        // Update available quantity of musical instruments
        await musicalInstrumentModel.updateMusicalInstrumentQuantity(cartId, t);

        // Calculate total price of cart items
        const totalPrice = await cartModel.calculateTotalPrice(cartId);

        // Update payment account balance of user
        const user = await userModel.findByCartId(cartId);
        const userId = user.id;
        await paymentModel.updateBalance(userId, -totalPrice, t);

        // Update payment account balance of receiver
        const receiver = await userModel.findByCredentials(username, password);
        const receiverId = receiver.id;
        await paymentModel.updateBalance(receiverId, totalPrice, t);

        // Save order to database
        await orderModel.createOrder(cartId, t);

        // Delete cart items
        await cartModel.deleteCartItems(cartId, t);

        // Return success message
        return { message: "Checkout completed successfully" };
      } catch (error) {
        throw new Error("Checkout failed: " + error.message);
      }
    });

    // Return transaction result
    res.status(200).json(t);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReceiverAccount,
  createPaymentAccount,
  checkout,
};
