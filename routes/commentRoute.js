const {
  create,

  replyComment,
  updateComment,
  deleteComment,
  deleteReply,
  getAllComments,
  createComment,
  replyReply,
  deleteReplyToReply,
  upVote,
  downVote,
} = require("../controllers/postController");
const {
  verifyToken,
  verifyUser,
  isNotAllowed,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

router.route("/").post(verifyToken, createComment);
router.route("/reply").post(isNotAllowed, replyComment);
router.route("/update").patch(verifyUser, updateComment);
router.route("/delete").delete(verifyUser, deleteComment);
router.route("/delete/reply").delete(verifyUser, deleteReply);
router.route("/reply/reply").post(isNotAllowed, replyReply);
router.route("/reply/delete").delete(verifyUser, deleteReplyToReply);
router.route("/upvote").patch(isNotAllowed, upVote);
router.route("/downvote").patch(isNotAllowed, downVote);
router.route("/").get(verifyToken, getAllComments);

module.exports = router;
