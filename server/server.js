import "dotenv/config";
import cors from "cors";
import express from "express";
import checkoutRouter from "./routes/checkout.js";
import productsRouter from "./routes/products.js";

const app = express();
const port = process.env.PORT || 4000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: clientUrl
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "shula-api" });
});

app.use("/api/checkout", checkoutRouter);
app.use("/api/products", productsRouter);

app.listen(port, () => {
  console.log(`Shula API simulation running on http://localhost:${port}`);
});
