const jwt = require("jsonwebtoken");
require("dotenv").config();

const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const verifyPayload = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};

module.exports = {
  signToken,
  verifyPayload,
};
