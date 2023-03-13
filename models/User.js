const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please provide an email"],
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (req, res, next) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Please all fileds are required",
    });
  }
  const salt = await bcrypt.genSalt(+process.env.SALT);
  const hashedPassword = await bcrypt.hash(password, salt);
  this.password = hashedPassword;
  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "User created successfully",
  });
  next();
});
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { username: this.username, userId: this._id },
    process.env.JWT_SECRET
  );
  return token;
};
userSchema.methods.comparePasswords = function (userPassword) {
  return bcrypt.compare(userPassword, this.password);
};
const User = mongoose.model("User", userSchema);
module.exports = { User };
