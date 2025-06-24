// routes/designationRoutes.js
import express from "express";
import { createDesignation } from "../controllers/designationController.js";
const router = express.Router();

router.post("/", createDesignation);

export default router;
