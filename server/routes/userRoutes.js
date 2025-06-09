// routes/auth.js
import express from "express";
import {
  createPanelist,
  fetchAllUsers,
  getPanelist,
  getPanelistByCategoryId,
  getRecentUsers,
} from "../controllers/userController.js";
import {
  validateCreatePanelist,
  validatePanelistCreation,
} from "../middlewares/userValidator.js";
import { createUploader, uploadToPanelist } from "../middlewares/upload.js";

// import { getDasboardItems } from "../controllers/dashboardController.js";
const router = express.Router();

router.get("/", fetchAllUsers);
router.get("/recent", getRecentUsers);
router.post(
  "/panelists",
  uploadToPanelist.single("image"),
  validatePanelistCreation,
  createPanelist
);
router.get("/panelists", getPanelist);
router.get("/panelists/categories/:categoryId", getPanelistByCategoryId);

export default router;
