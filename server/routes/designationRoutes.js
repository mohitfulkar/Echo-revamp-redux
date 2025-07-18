// routes/designationRoutes.js
import express from "express";
import {
  createDesignation,
  getDesignation,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
} from "../controllers/designationController.js";
const router = express.Router();

router.post("/", createDesignation);
router.get("/", getDesignation);
router.get("/:id", getDesignationById);
router.put("/:id", updateDesignation);
router.delete("/:id", deleteDesignation);

export default router;
