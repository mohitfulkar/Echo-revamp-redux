import express from "express";
import { voteOnPanelist } from "../controllers/voteController.js";

const router = express.Router();

router.post("/panelist/:panelistId", voteOnPanelist);

export default router;
