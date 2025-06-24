// routes/categoryRoutes.js
import express from "express";
import { createResponsibility } from "../controllers/responsibilityController.js";
const router = express.Router();

router.post("/", createResponsibility);

export default router;
