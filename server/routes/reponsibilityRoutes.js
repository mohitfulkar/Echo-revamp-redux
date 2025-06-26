// routes/categoryRoutes.js
import express from "express";
import {
  createResponsibility,
  deleteResponsibility,
  getRsbById,
  updateResponsibility,
} from "../controllers/responsibilityController.js";
import { getRsb } from "../controllers/responsibilityController.js";
const router = express.Router();

router.post("/", createResponsibility);
router.get("/", getRsb);
router.get("/:id", getRsbById);
router.put("/:id", updateResponsibility);
router.delete("/:id", deleteResponsibility);

export default router;
