const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
  customer: {
    name: String,
    email: String,
  },
  order: String,
  paymentId: String,
  total: Number,
  items: [
    {
      event: {
        type: mongoose.Schema.ObjectId,
        ref: "Event",
      },
      quantity: Number,
    },
  ],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
