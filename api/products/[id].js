import { getProductById } from "../../server/services/productsService.js";

export default function handler(request, response) {
  const product = getProductById(request.query.id);

  if (!product) {
    return response.status(404).json({ message: "Product not found" });
  }

  return response.status(200).json(product);
}
