const express = require("express");
const router = express.Router();
const mastercontroller = require('../controller/master-controller');
router.route("/organizationroleinsert").get(mastercontroller.organizationRoleInsert);
router.route("/insuranceroleinsert").get(mastercontroller.InsuranceRoleInsert);
router.route("/organizationrole").get(mastercontroller.getorganizationRole);
router.route("/insurancerole").get(mastercontroller.getInsuranceRole);
router.route("/getcmotor").get(mastercontroller.getcmotor);
router.route("/getuserlist").get(mastercontroller.getUserList);
module.exports = router;