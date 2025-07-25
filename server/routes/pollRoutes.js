// routes/auth.js
import express from "express";
import { createPoll, getAll } from "../controllers/pollController.js";
import { validateCreatePoll } from "../middlewares/pollValidator.js";

// import { getDasboardItems } from "../controllers/dashboardController.js";
const router = express.Router();

router.post("/create-poll", validateCreatePoll, createPoll);
router.get("/polls", getAll);

export default router;
