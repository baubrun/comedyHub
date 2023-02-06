const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: String,
  performer: String,
  startDate: String,
  image: String,
  price: Number,
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
  },
  venue: { type: mongoose.Schema.ObjectId, ref: "Venue" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
