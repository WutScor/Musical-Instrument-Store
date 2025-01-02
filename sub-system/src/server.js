require("dotenv").config();
const https = require("https");
const fs = require("fs");
const app = require("./app");
const paymentController = require("./controllers/paymentController");

const PORT = process.env.PORT || 4002;

const options = {
  key: fs.readFileSync(__dirname + "/../certs/key.pem"),
  cert: fs.readFileSync(__dirname + "/../certs/cert.pem"),
};

const server = https.createServer(options, app).listen(PORT, async () => {
  console.log(`Server sub-system is running on https://localhost:${PORT}`);

  const username = process.env.PAYMENT_USERNAME;
  const password = process.env.PAYMENT_PASSWORD;

  let req = { body: { username, password } };
  let res = {};

  try {
    await paymentController.createReceiverAccount(req, res);
  } catch (error) {
    console.error("Error creating user:", error);
    server.close(() => {
      console.log("Server stopped due to error.");
    });
  }
});
