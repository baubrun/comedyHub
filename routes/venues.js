const express = require("express");
const router = express.Router();
const VenuesController = require("../controllers/venues");

router.route("/").get(VenuesController.getVenues);

module.exports = router;
