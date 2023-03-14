const { register, login, profile } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(verifyToken, profile);

module.exports = router;
