// routes/categoryRoutes.js
import express from "express";
import {
  createExpertise,
  deleteExpertise,
  getAllExpertise,
  getExpertiseById,
  updateExpertise,
} from "../controllers/expertiseController.js";
const router = express.Router();

router.post("/", createExpertise);
router.get("/", getAllExpertise);
router.get("/:id", getExpertiseById);
router.put("/:id", updateExpertise);
router.delete("/:id", deleteExpertise);

export default router;
