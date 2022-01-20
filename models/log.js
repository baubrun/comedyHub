const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  type: String,
  path: String,
  body: Object,
  headers: Object,
  date: String,
});

module.exports = mongoose.model("Log", LogSchema);
