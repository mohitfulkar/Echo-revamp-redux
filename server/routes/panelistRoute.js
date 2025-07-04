import express from "express";
import { validatePanelistCreation } from "../middlewares/userValidator.js";
import {
  createPanelist,
  getPanelist,
  getPanelistByCategoryId,
} from "../controllers/panelistController.js";
import { uploadToPanelist } from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/panelists",
  uploadToPanelist.fields([
    { name: "photo", maxCount: 5 }, // Allow multiple photos
    { name: "identityProof", maxCount: 5 }, // Allow multiple identity proofs
    { name: "resume", maxCount: 3 }, // Allow multiple resumes
    { name: "certification", maxCount: 10 }, // Allow multiple certifications
  ]),
  validatePanelistCreation,
  createPanelist
);

router.get("/panelists", getPanelist);
router.get("/panelists/categories/:categoryId", getPanelistByCategoryId);
export default router;
