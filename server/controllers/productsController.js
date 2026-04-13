import { products } from "../data/products.js";

export function getProducts(req, res) {
  res.json(products);
}

export function getProductById(req, res) {
  const product = products.find((item) => item.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(product);
}
