const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const app = require("express")();
app.use(cookieParser());
module.exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  console.log(req.body);
  if (!username || !password || !email) {
    res.json({ success: false, message: "Please Provide Credentials" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = User({ username, password: hashedPassword, email });
    await newUser.save();
    res.json({ success: true, message: "User successfull created" });
    console.log(newUser);
  } catch (error) {
    res.json({
      sucess: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

module.exports.login = async (req, res) => {
  const { password, email } = req.body;
  console.log(req.body);
  try {
    // find in db if a user exists with such email
    const user = await User.findOne({ email });
    console.log(user, "user");
    if (!user) {
      // if email is not found a response is sent back to the user
      res.json({
        success: false,
        message: "Username or password incorrect from user",
      });
    }
    const isAuth = await bcrypt.compare(password, user.password);
    console.log(isAuth, "isAuth");
    if (!isAuth) {
      // if current password is not  same as the one registered, send back a response
      res.json({
        success: false,
        message: "Username or password incorrect from isAuth",
      });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    console.log(token, "from login");
    res
      .cookie("token", token)
      .json({ success: true, message: "User log in success", token });
  } catch (error) {
    res.json({
      sucess: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

// PROFILE PAGE

module.exports.profile = async (req, res) => {
  const { token } = req.cookies;

  try {
    const info = jwt.verify(token, process.env.JWT_SECRET);
    if (!info) res.json({ sucess: false, message: "Unauthorized access" });
    if (info) {
      res.json({
        sucess: true,
        message: "User allowed to access this route",
        id: info.id,
      });
    }
  } catch (error) {
    res.json({
      sucess: false,
      message: "YUou are not authorized to acess this page",
      error: error.message,
    });
  }
};
