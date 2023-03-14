const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const app = require("express")();
app.use(cookieParser());
module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Please all fileds are required",
    });
  }
  const newUser = new User({ email, password, username });
  await newUser.save();
  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "User created successfully",
  });
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "please fill all fields",
    });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "username or password incorrect",
    });
  }
  const isPasswordMatch = await user.comparePasswords(password);
  if (!isPasswordMatch) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "invalid credentials",
    });
  }
  if (isPasswordMatch) {
    const token = await user.createToken();
    res
      .cookie("access_token", token)
      .status(StatusCodes.OK)
      .json({
        success: true,
        msg: "Login successfull",
        payload: { username: user.username, id: user._id },
      });
  }
};

module.exports.logout = function (req, res) {
  req.cookies("token", "").json("ok");
  res.status(StatusCodes.OK).json({
    success: true,
    msg: "Logout successfull",
  });
};
// PROFILE PAGE

module.exports.profile = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    msg: "You have access to this route",
  });
};
