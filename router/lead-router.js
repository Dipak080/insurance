const express = require('express');
const leadController = require('../controller/lead-controller');
const router = express.Router();

router.route("/createlead").post(leadController.createLead);
router.route('/getalllead').get(leadController.getAllLeads);

module.exports = router;