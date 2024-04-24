const express = require("express");
const router = express.Router();
const authcontroller = require('../controller/auth-controller');
const validateBody = require('../middlewares/validate-middlewares');
const registrationSchema = require('../validators/auth-validators');
router.route("/").get(authcontroller.home);
router.route("/register").post(validateBody(registrationSchema),authcontroller.register);
module.exports = router;