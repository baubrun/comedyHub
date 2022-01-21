const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VenueSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("Venue", VenueSchema);
