const express = require("express");
const router = express.Router();
const EventController = require("../controllers/events");

router.route("/venue/:venueId").get(EventController.getEventsByVenue);

router.route("/event/:id").get(EventController.getEvent);

router.route("/").get(EventController.getEvents);

module.exports = router;
