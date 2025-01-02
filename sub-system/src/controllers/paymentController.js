const createUserAccount = (req, res) => {
  res.status(200).json({
    message: "Access granted to protected data.",
    user: req.user,
  });
};

const createPaymentAccount = (req, res) => {};

module.exports = {
  createUserAccount,
  createPaymentAccount,
};
