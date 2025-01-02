const https = require("https");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET_SUB_SYSTEM;

exports.getOrders = async (req, res) => {
  try {
    const token = jwt.sign({ system: "backend" }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const response = await axios.get("https://localhost:4001/payments/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent,
    });

    res.status(200).json({
      message: "Data from sub-system",
      data: response.data,
    });
  } catch (error) {
    console.error("Error calling sub-system API:", error.message);
    res.status(500).json({
      message: "Failed to call sub-system API.",
      error: error.message,
    });
  }
};
