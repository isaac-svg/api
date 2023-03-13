const { Comments } = require("../models/Comment");
const jwt = require("jsonwebtoken");
const { Reply } = require("../models/Reply");
module.exports.createComment = async (req, res) => {
  const { content } = req.body;

  try {
    const token = req.headers.cookie.split("=")[2];
    //

    const info = jwt.verify(token, process.env.JWT_SECRET);
    console.log(info, "info");
    const comment = await Comments.create({
      content,
      author: info.id,
    });
    res.json({
      success: true,
      message: "Comment created",
      comment,
      id: info.id,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Comment creation failed",
      error: error.message,
    });
  }
};
// Updating post
module.exports.updateComment = async (req, res) => {
  const { content, commentId } = req.body;

  try {
    const token = req.headers.cookie.split("=")[1];
    //
    const info = jwt.verify(token, process.env.JWT_SECRET);
    const updatedComment = await Comments.findByIdAndUpdate(commentId, {
      $set: { content },
    });

    res.json({
      success: true,
      message: "Comment created",
      updatedComment,
      id: info.id,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Comment update failed",
      error: error.message,
    });
  }
};
// Deleting Comment
module.exports.deleteComment = async (req, res) => {
  const { commentId } = req.body;

  try {
    const token = req.headers.cookie.split("=")[1];
    //
    const info = jwt.verify(token, process.env.JWT_SECRET);
    const deletedComment = await Comments.findByIdAndDelete(commentId);

    res.json({
      success: true,
      message: "Comment deleted",
      deletedComment,
      id: info.id,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Comment update failed",
      error: error.message,
    });
  }
};
// Deleting Reply
module.exports.deleteReply = async (req, res) => {
  const { replyId, commentId } = req.body;
  console.log(req.params);
  try {
    const token = req.headers.cookie.split("=")[1];
    //
    const info = jwt.verify(token, process.env.JWT_SECRET);
    const comment = await Comments.findById(commentId);
    const reply = await Reply.findById(replyId);
    const deletedReply = await comment.updateOne({ $pull: { replies: reply } });

    res.json({
      success: true,
      message: "Comment deleted",
      deletedReply,
      id: info.id,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Comment update failed",
      error: error.message,
    });
  }
};
// reply

module.exports.replyComment = async (req, res) => {
  const { id } = req.params;
  try {
    const { content, commentId } = req.body;

    const reply = await Reply.create({ content, commentId });
    const comment = await Comments.findById(commentId);
    const data = await comment.updateOne({ $push: { replies: reply._id } });

    res.json({
      success: true,
      message: "reply Successfull",
      comment,
      reply,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Reply creation failed",
      error: error.message,
    });
  }
};
// Replying a Reply
module.exports.replyReply = async (req, res) => {
  const { content, commentId } = req.body;
  try {
    const reply = await Reply.create(content);
    const comment = await Comments.findOneAndUpdate(commentId, {
      $push: { replies: reply._id },
    });
    console.log("reply to reply successful");
  } catch (error) {
    res.json({
      success: false,
      message: "replying to a reply failed",
      error: error.message,
    });
  }
};
// get All Comments

module.exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comments.find().populate("replies");

    res.json(comments);
  } catch (error) {
    res.json({
      success: false,
      message: "Getting all users failed",
      error: error.message,
    });
  }
};
