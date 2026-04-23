import { products as localProducts } from "../data/products.js";

const API_URL = import.meta.env.VITE_API_URL ?? "/api";

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_URL}${path}`, options);

    if (!response.ok) {
      let message = "API request failed";

      try {
        const payload = await response.json();
        message = payload.message || message;
      } catch {
        // Keep the fallback message when the response is not JSON.
      }

      throw new Error(message);
    }

    return response.json();
  } catch {
    // Local mock data keeps the UI useful without a running server.
    if (options.method && options.method !== "GET") {
      throw new Error("The server is unavailable right now");
    }

    if (path === "/products") {
      return localProducts;
    }

    const productMatch = path.match(/^\/products\/(.+)$/);

    if (productMatch) {
      return localProducts.find((product) => product.id === productMatch[1]);
    }

    return null;
  }
}

export const api = {
  getProducts: () => request("/products"),
  getProduct: (id) => request(`/products/${id}`),
  createCheckoutSession: (items) =>
    request("/checkout/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        }))
      })
    })
};
