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

module.exports.verifyUser = (req, res, next) => {
  this.verifyToken(req, res, next, () => {
    if (req.user.id == req.params.id) {
      return next();
    } else {
      return next(
        res.json(StatusCodes.UNAUTHORIZED).json({
          success: false,
          msg: "Unathorized to perform this operation",
        })
      );
    }
  });
};
module.exports.isNotAllowed = (req, res, next) => {
  this.verifyToken(req, res, next, () => {
    if (req.user.id == req.params.id) {
      return next(
        res.json(StatusCodes.UNAUTHORIZED).json({
          success: false,
          msg: "Unathorized",
        })
      );
    } else {
      return next();
    }
  });
};
