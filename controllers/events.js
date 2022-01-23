const Events = require("../models/events");
const mongoose = require("mongoose");

const getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Events.findById(id).populate("venue");
    return res.status(200).json({ event });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Events.find({}).populate("venue");
    return res.status(200).json({ events });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getEventsByVenue = async (req, res) => {
  const { venueId } = req.params;
  try {
    const events = await Events.aggregate([
      { $match: { venue: mongoose.Types.ObjectId(venueId) } },
    ]).sort({ startDate: 1 });
    return res.status(200).json({ events });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getEvent,
  getEventsByVenue,
  getEvents,
};
