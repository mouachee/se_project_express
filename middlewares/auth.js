const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { JWT_SECRET } = require("../utils/config");

const handleAuthError = (next) => {
  const error = new UnauthorizedError("Authorization required");
  next(error);
};

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(next);
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return handleAuthError(next);
  }
  req.user = payload;
  return next();
};
module.exports = authMiddleware;
