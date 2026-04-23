import { products } from "../data/products.js";
import { getCheckoutUrls, getStripe } from "../lib/stripe.js";

function getStripeProductData(product) {
  const productData = {
    name: product.name.en,
    description: product.short.en
  };

  // Stripe Checkout expects publicly reachable image URLs, so we skip local assets here.
  return productData;
}

function buildLineItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return { error: "Cart is empty" };
  }

  const lineItems = [];

  for (const item of items) {
    const product = products.find((entry) => entry.id === item.productId);

    if (!product) {
      return { error: `Unknown product: ${item.productId}` };
    }

    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return { error: `Invalid quantity for product: ${item.productId}` };
    }

    lineItems.push({
      quantity,
      price_data: {
        currency: "ils",
        unit_amount: product.price * 100,
        product_data: getStripeProductData(product)
      }
    });
  }

  return { lineItems };
}

export async function createCheckoutSession(req, res) {
  try {
    const { lineItems, error } = buildLineItems(req.body?.items);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const stripe = getStripe();
    const { successUrl, cancelUrl } = getCheckoutUrls();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl
    });

    return res.status(201).json({ url: session.url, id: session.id });
  } catch (error) {
    console.error("Stripe checkout session error", error);

    return res.status(500).json({
      message:
        error.message === "STRIPE_SECRET_KEY is not configured"
          ? "Stripe is not configured yet"
          : "Could not create checkout session"
    });
  }
}
