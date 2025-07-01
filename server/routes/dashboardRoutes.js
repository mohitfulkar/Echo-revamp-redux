// routes/auth.js
import express from "express";

import {
  categorySummary,
  designationSummary,
  expertiseSummary,
  getDasboardItems,
  rsbSummary,
} from "../controllers/dashboardController.js";
const router = express.Router();

router.get("/admin-dashboard", getDasboardItems);
router.get("/category-summary", categorySummary);
router.get("/expertise-summary", expertiseSummary);
router.get("/rsb-summary", rsbSummary);
router.get("/designation-summary", designationSummary);

export default router;
