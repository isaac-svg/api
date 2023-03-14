const mongoose = require("mongoose");
const replyToReplySchema = new mongoose.Schema(
  {
    replyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
    },
    content: {
      type: String,
    },
    avatar: {
      type: String,
    },
    vote: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);
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
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    vote: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Reply = mongoose.model("Reply", replySchema);
const ReplyToReply = mongoose.model("ReplyToReply", replyToReplySchema);
module.exports = { Reply, ReplyToReply };
