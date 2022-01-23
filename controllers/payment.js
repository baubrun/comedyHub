const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Purchase = require("../models/purchase");

const createPayment = async (req, res) => {
  const { paymentId, order, items, total, customer } = req.body;
  try {
    await stripe.paymentIntents.create({
      amount: total,
      currency: "cad",
      confirm: true,
      description: "event",
      payment_method: paymentId,
      metadata: {
        order: order,
      },
    });

    const purchase = await new Purchase({
      customer: customer,
      items: items,
      paymentId: paymentId,
      order: order,
      total: total,
    });

    purchase.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.json({
      error: error.raw ? error.raw.message : error.message,
    });
  }
};

module.exports = {
  createPayment,
};
