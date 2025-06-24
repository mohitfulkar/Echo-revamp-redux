// routes/auth.js
import express from "express";
import {
  createPanelist,
  fetchAllUsers,
  getPanelist,
  getPanelistByCategoryId,
  createSuperPanelist,
} from "../controllers/userController.js";
import {
  validatePanelistCreation,
  validateSuperPanelistCreation,
} from "../middlewares/userValidator.js";
import { uploadToPanelist } from "../middlewares/upload.js";

// import { getDasboardItems } from "../controllers/dashboardController.js";
const router = express.Router();

router.get("/", fetchAllUsers);
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
router.post(
  "/super-panelists",
  uploadToPanelist.single("image"),
  validateSuperPanelistCreation,
  createSuperPanelist
);
router.get("/panelists", getPanelist);
router.get("/panelists/categories/:categoryId", getPanelistByCategoryId);

export default router;
