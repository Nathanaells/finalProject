const { verifyPayload } = require("../helpers/jwt");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader)
      throw { name: "UnauthorizedError", message: "No token provided" };

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;
    const payload = verifyPayload(token);
    req.user = payload;
    next();
  } catch (error) {
    next({
      name: "JsonWebTokenError",
      message: error.message || "Invalid token",
    });
  }
};

const authZ = (req, res, next) => {
  // Placeholder for role-based checks if needed later
  next();
};

module.exports = { auth, authZ };
