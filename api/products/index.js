import { getAllProducts } from "../../server/services/productsService.js";

export default function handler(request, response) {
  return response.status(200).json(getAllProducts());
}
