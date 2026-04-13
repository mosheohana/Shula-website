import { products as localProducts } from "../data/products.js";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

async function request(path) {
  try {
    const response = await fetch(`${API_URL}${path}`);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return response.json();
  } catch {
    // Local mock data keeps the UI useful without a running server.
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
  getProduct: (id) => request(`/products/${id}`)
};
