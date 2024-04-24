const express = require("express");
const router = express.Router();
const citycontroller = require('../controller/city-controller');
router.route("/carCityInsert").get(citycontroller.carCityInsert);
router.route("/citylist").get(citycontroller.Cityget);
module.exports = router;