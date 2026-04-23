import { Router } from "express";
import { createCheckoutSession } from "../controllers/checkoutController.js";

const router = Router();

router.post("/session", createCheckoutSession);

export default router;
