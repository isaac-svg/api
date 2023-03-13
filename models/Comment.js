const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    avatar: {
      type: String,
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    vote: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", commentSchema);

module.exports = { Comments };
