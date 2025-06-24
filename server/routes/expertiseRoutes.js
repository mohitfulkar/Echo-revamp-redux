// routes/categoryRoutes.js
import express from "express";
import {
  createExpertise,
  getAllExpertise,
} from "../controllers/expertiseController.js";
const router = express.Router();

router.post("/", createExpertise);
router.get("/", getAllExpertise);

export default router;
