import { createCheckoutSessionForItems } from "../services/checkoutService.js";

export async function createCheckoutSession(req, res) {
  try {
    const session = await createCheckoutSessionForItems(req.body?.items);

    return res.status(201).json(session);
  } catch (error) {
    console.error("Stripe checkout session error", error);

    return res.status(500).json({
      message:
        error.message === "STRIPE_SECRET_KEY is not configured"
          ? "Stripe is not configured yet"
          : error.message === "Cart is empty" ||
              error.message?.startsWith("Unknown product:") ||
              error.message?.startsWith("Invalid quantity for product:")
            ? error.message
          : "Could not create checkout session"
    });
  }
}
