const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
  orderNumber: String,
  customer: String,
  items: [
    {
      event: {
        type: mongoose.Schema.ObjectId,
        ref: "Event",
      },
      amount: Number,
      quantity: Number,
    },
  ],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
