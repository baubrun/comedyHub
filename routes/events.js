const express = require("express");
const router = express.Router();
const EventController = require("../controllers/events");
const upload = require("../middlewares/upload");

router
  .route("/:id")
  .delete(EventController.deleteEvent)
  .patch([upload], EventController.patchEvent);

router
  .route("/")
  .get(EventController.getEvents)
  .post([upload], EventController.postEvent);

module.exports = router;
