import cors from "cors";
import express from "express";
import productsRouter from "./routes/products.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "shula-api" });
});

app.use("/api/products", productsRouter);

app.listen(port, () => {
  console.log(`Shula API simulation running on http://localhost:${port}`);
});
