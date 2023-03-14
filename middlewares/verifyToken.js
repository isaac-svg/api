const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
module.exports.verifyToken = (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];
  if (!token) return next(new Error("Token empty"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new Error("You are not authorized to access this route"));
    }

    req.user = user;
    next();
  });
};
