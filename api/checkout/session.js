import { createCheckoutSessionForItems } from "../../server/services/checkoutService.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await createCheckoutSessionForItems(request.body?.items);

    return response.status(201).json(session);
  } catch (error) {
    console.error("Stripe checkout session error", error);

    return response.status(
      error.message === "Cart is empty" ||
        error.message?.startsWith("Unknown product:") ||
        error.message?.startsWith("Invalid quantity for product:")
        ? 400
        : 500
    ).json({
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
