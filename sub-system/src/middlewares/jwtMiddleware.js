const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET_SUB_SYSTEM;

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Access token is required." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = verifyJWT;
