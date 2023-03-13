const { StatusCodes } = require("http-status-codes");
const jwt = requie("jsonwebtoken");
module.exports.verifyToken = async (req, res, next) => {
  const { token } = req.cookies;
  const verifiedUser = jwt.veriy(token, process.env.JWT_SECRET);
  if (!verifiedUser) {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
      success: false,
      msg: "user is not authorized to perform this operation",
    });
  } else {
    next();
  }
};
