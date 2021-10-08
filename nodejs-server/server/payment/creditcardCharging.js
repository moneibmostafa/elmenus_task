const Stripe = require('stripe');
const config = require('../../config');

const { stripeSecretKey } = config.payment;
const stripe = Stripe(stripeSecretKey);

module.exports = async function payment(amount, token, currency) {
  const response = await stripe.charges.create({
    amount: amount,
    source: token,
    currency: currency,
  });
  return response;
};
