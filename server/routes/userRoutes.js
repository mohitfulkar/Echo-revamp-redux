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
  uploadToPanelist.single("image"),
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
