import { createSuperPanelist } from "../controllers/superPController.js";
import { uploadToPanelist } from "../middlewares/upload.js";
import { validateSuperPanelistCreation } from "../middlewares/userValidator.js";
import express from "express";

const router = express.Router();

router.post(
  "/super-panelists",
  uploadToPanelist.single("image"),
  validateSuperPanelistCreation,
  createSuperPanelist
);

export default router;
