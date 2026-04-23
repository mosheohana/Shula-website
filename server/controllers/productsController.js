import { getAllProducts, getProductById as findProductById } from "../services/productsService.js";

export function getProducts(req, res) {
  res.json(getAllProducts());
}

export function getProductById(req, res) {
  const product = findProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(product);
}
