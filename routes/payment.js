const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/payment");

router.route("/").post(PaymentController.createPayment);

module.exports = router;
