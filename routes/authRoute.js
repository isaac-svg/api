const { register, login, profile } = require("../controllers/authController");

const router = require("express").Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(profile);

module.exports = router;
