require('dotenv').config();
const { STRIPE_PRIVATE_API_KEY = "missing_key" } = process.env;
const stripe = require('stripe')(STRIPE_PRIVATE_API_KEY);
const paymentsRouter = require("express").Router();
const { isLoggedIn } = require("./util")

// Do we really need the domain if this is going to route to /payments/?success=true   ?
// const { YOUR_DOMAIN = 'http://localhost:3000' } = process.env;

// TBD: modify to check isLoggedIn
// Try it out: curl -X POST http://localhost:4000/api/payments/create-checkout-session
paymentsRouter.post('/create-checkout-session', isLoggedIn, async (req, res) => {
  const { price } = req.body
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: price,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: '/?success=true',
    cancel_url: '/?canceled=true',
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