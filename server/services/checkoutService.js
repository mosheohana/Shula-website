import { getProductById } from "./productsService.js";
import { getCheckoutUrls, getStripe } from "../lib/stripe.js";

function getStripeProductData(product) {
  return {
    name: product.name.en,
    description: product.short.en
  };
}

function buildLineItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Cart is empty");
  }

  return items.map((item) => {
    const product = getProductById(item.productId);

    if (!product) {
      throw new Error(`Unknown product: ${item.productId}`);
    }

    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(`Invalid quantity for product: ${item.productId}`);
    }

    return {
      quantity,
      price_data: {
        currency: "ils",
        unit_amount: product.price * 100,
        product_data: getStripeProductData(product)
      }
    };
  });
}

export async function createCheckoutSessionForItems(items) {
  const stripe = getStripe();
  const { successUrl, cancelUrl } = getCheckoutUrls();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: buildLineItems(items),
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl
  });

  return { url: session.url, id: session.id };
}
