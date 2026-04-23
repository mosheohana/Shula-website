import Stripe from "stripe";

let stripeClient = null;

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

export function getCheckoutUrls() {
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

  return {
    clientUrl,
    successUrl: `${clientUrl}/checkout/success`,
    cancelUrl: `${clientUrl}/checkout/cancel`
  };
}
