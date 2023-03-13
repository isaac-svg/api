const {
  create,

  replyComment,
  updateComment,
  deleteComment,
  deleteReply,
  getAllComments,
} = require("../controllers/postController");

const router = require("express").Router();

router.route("/create").post(create);
router.route("/reply").post(replyComment);
router.route("/update").put(updateComment);
router.route("/delete").delete(deleteComment);
router.route("/delete/reply").delete(deleteReply);
router.route("/").get(getAllComments);

module.exports = router;
