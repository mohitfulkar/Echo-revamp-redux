// routes/auth.js
import express from "express";
import { createPoll } from "../controllers/pollController.js";
import { validateCreatePoll } from "../middlewares/pollValidator.js";

// import { getDasboardItems } from "../controllers/dashboardController.js";
const router = express.Router();

router.post("/create-poll", validateCreatePoll, createPoll);

export default router;
