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
    await paymentModel.createPaymentAccount(userId);
    res.status(200).json({ message: "Payment account created successfully" });
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
