const Purchases = require("../models/Purchase")
const stripe = require("stripe")(process.env.STRIPE_SECRET)
const mongoose = require("mongoose")




const create = async (req, res) => {
    const {amount, items, orderNumber, customer, } = req.body
    const foundItems = JSON.parse(items)
    const oids = foundItems.map(i => mongoose.Types.ObjectId(i._id))
    
    try {
        const purchase = Purchases({
            customer: customer,
            items: oids,
            amount: amount,
            orderNumber: orderNumber,
        })
        await purchase.save()
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}





const processPmt =  async (req, res) => {
    const {
        id,
        amount,
        order,
    } = req.body

  
    try {
        await stripe.paymentIntents.create({
            amount: amount,
            currency: "cad",
            confirm: true,
            description: "ticket",
            payment_method: id,
            metadata: {
                order: order
            }
        })
        return res.json({
            success: true
        })
    } catch (error) {
        return res.json({
            error: error.raw.message
        })
    }

}




module.exports = {
    processPmt,
    create,
}