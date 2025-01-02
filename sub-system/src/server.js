require("dotenv").config();
const https = require("https");
const fs = require("fs");
const app = require("./app");

const PORT = process.env.PORT || 4002;

const options = {
  key: fs.readFileSync(__dirname + "/../certs/key.pem"),
  cert: fs.readFileSync(__dirname + "/../certs/cert.pem"),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server sub-system is running on https://localhost:${PORT}`);

  // Check payment account
  const username = process.env.PAYMENT_USERNAME;
  const password = process.env.PAYMENT_PASSWORD;
});
