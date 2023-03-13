const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide a username"],
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

const User = mongoose.model("User", userSchema);
module.exports = { User };
