require('dotenv').config();
const { STRIPE_PRIVATE_API_KEY = "missing_key" } = process.env;
const stripe = require('stripe')(STRIPE_PRIVATE_API_KEY);
const paymentsRouter = require("express").Router();

const { YOUR_DOMAIN = 'http://localhost:3000' } = process.env;

// TBD: modify to check isLoggedIn
// Try it out: curl -X POST http://localhost:4000/api/payments/create-checkout-session
paymentsRouter.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1KPvxsDHUl6aLbssoSVzhDJG',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  res.redirect(303, session.url);
});

module.exports = paymentsRouter;