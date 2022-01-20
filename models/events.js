const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  allDay: { type: Boolean, default: false },
  endDate: String,
  endTime: String,
  hostId: String,
  image: String,
  performer: String,
  price: Number,
  startDate: String,
  startTime: String,
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
  },
  title: String,
  venue: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Events", EventSchema);
