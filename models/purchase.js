const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
  amount: String,
  customer: String,
  items: [{ type: mongoose.Schema.ObjectId, ref: "Event" }],
  orderNumber: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchases", PurchaseSchema);
