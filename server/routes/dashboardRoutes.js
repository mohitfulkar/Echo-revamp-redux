// routes/auth.js
import express from "express";

import { getDasboardItems } from "../controllers/dashboardController.js";
const router = express.Router();

router.get("/admin-dashboard", getDasboardItems);

export default router;
