const express = require("express");
const router = express.Router();
const EventController = require("../controllers/events");
const upload = require("../middlewares/upload");

router.route("/venue/:venueId").get(EventController.getEventsByVenue);

router
  .route("/event/:id")
  .get(EventController.getEvent)
  .delete(EventController.deleteEvent)
  .patch([upload], EventController.patchEvent);

router
  .route("/")
  .get(EventController.getEvents)
  .post([upload], EventController.postEvent);

module.exports = router;
