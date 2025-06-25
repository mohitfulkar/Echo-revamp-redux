// routes/categoryRoutes.js
import express from "express";
import { createResponsibility } from "../controllers/responsibilityController.js";
import { getRsb } from "../controllers/responsibilityController.js";
const router = express.Router();

router.post("/", createResponsibility);
router.get("/", getRsb);

export default router;
