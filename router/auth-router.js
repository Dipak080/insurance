const express = require("express");
const router = express.Router();
const authcontroller = require('../controller/auth-controller');
// const validateBody = require('../middlewares/validate-middlewares');
// const registrationSchema = require('../validators/auth-validators');
// router.route("/").get(authcontroller.home);
router.route("/register").post(authcontroller.register);
router.route("/login").post(authcontroller.login);
router.route("/updateuser").post(authcontroller.updateuser);
router.route("/singaluser/:id").get(authcontroller.getUserById);
module.exports = router;