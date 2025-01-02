const paymentModel = require("../models/paymentModel");

const createReceiverAccount = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userId = await paymentModel.createUserAccount(username, password);
    await paymentModel.createPaymentAccount(userId.id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const createPaymentAccount = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
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

module.exports = {
  createReceiverAccount,
  createPaymentAccount,
};
