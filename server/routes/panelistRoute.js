import express from "express";
import {
  createPanelist,
  getPanelist,
  getPanelistByCategoryId,
  getPanelistById,
  updatePanelist,
} from "../controllers/panelistController.js";
import { multiFieldUpload } from "../middlewares/upload.js";
import { validatePanelistCreation } from "./../middlewares/userValidator.js";

const router = express.Router();

router.post(
  "/panelists",
  multiFieldUpload([
    { name: "photo", maxCount: 1 }, // Allow multiple photos
    { name: "identityProof", maxCount: 3 }, // Allow multiple identity proofs
    { name: "resume", maxCount: 1 }, // Allow multiple resumes
    { name: "certification", maxCount: 5 }, // Allow multiple certifications
  ]),
  validatePanelistCreation,
  createPanelist
);

router.get("/panelists", getPanelist);
router.get("/panelists/categories/:categoryId", getPanelistByCategoryId);
router.get("/panelist/:id", getPanelistById);
router.put(
  "/panelist/:id",
  multiFieldUpload([
    { name: "photo", maxCount: 1 }, // Allow multiple photos
    { name: "identityProof", maxCount: 3 }, // Allow multiple identity proofs
    { name: "resume", maxCount: 1 }, // Allow multiple resumes
    { name: "certification", maxCount: 5 }, // Allow multiple certifications
  ]),
  // validatePanelistCreation,
  updatePanelist
);
export default router;
