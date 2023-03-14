const {
  create,

  replyComment,
  updateComment,
  deleteComment,
  deleteReply,
  getAllComments,
  createComment,
} = require("../controllers/postController");

const router = require("express").Router();

router.route("/create").post(createComment);
router.route("/reply").post(replyComment);
router.route("/update").put(updateComment);
router.route("/delete").delete(deleteComment);
router.route("/delete/reply").delete(deleteReply);
router.route("/").get(getAllComments);

module.exports = router;
