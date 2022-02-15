require('dotenv').config();
const { STRIPE_PRIVATE_API_KEY = "missing_key" } = process.env;
const stripe = require('stripe')(STRIPE_PRIVATE_API_KEY);
const paymentsRouter = require("express").Router();
const { isLoggedIn } = require("./util")

paymentsRouter.post('/create-checkout-session', isLoggedIn, async (req, res) => {
  const { userId } = req.user.id
  // pull getCartById to return stripe_price_id, quantity to put into line items 
  const session = await stripe.checkout.sessions.create({
    line_items: [
      //loop through order products that are in the cart and add in the stripe id and quantity
      {
        price: price_1KTE9sDiPmSSqdKeVVdhtN1x,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/payments/?success=true`,
    cancel_url: `${YOUR_DOMAIN}/payments/?canceled=true`,
  });
  res.redirect(303, session.url);
});

paymentsRouter.get('/?success=true', isLoggedIn, async (req, res) =>{
  res.send({
    name: "Success",
    message: "Thank you for your order. A confirmation will be sent to your email shortly."
  })
})

paymentsRouter.get('/?canceled=true', isLoggedIn, async (req, res) =>{
  res.send({
    name: "Canceled",
    message: "There has been an error with your order. We cannot successfully process the order at this time. Please try again."
  })
})

module.exports = paymentsRouter;