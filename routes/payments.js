const paymentsRouter = require("express").Router();
require('dotenv').config();
const { STRIPE_PRIVATE_API_KEY = "missing_key", DOMAIN_URL = 'http://porto3000.herokuapp.com/' } = process.env;
const stripe = require('stripe')(STRIPE_PRIVATE_API_KEY);
const { isLoggedIn } = require("./util");
const { getCartByUser } = require("../db");

paymentsRouter.post('/create-checkout-session', isLoggedIn, async (req, res, next) => {
  const id = req.user.id
  const cart = await getCartByUser({id});
  const line_items = cart.products.map(product => {
    return { price: product.price_stripe_id, quantity: product.quantity }
  })
  console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${DOMAIN_URL}/payments/?success=true`,
    cancel_url: `${DOMAIN_URL}/payments/?canceled=true`,
  });
  res.redirect(303, session.url);
});

module.exports = paymentsRouter;