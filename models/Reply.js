const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    content: {
      type: String,
    },
    avatar: {
      type: String,
    },
    replies: [],
    vote: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Reply = mongoose.model("Reply", replySchema);

module.exports = { Reply };
