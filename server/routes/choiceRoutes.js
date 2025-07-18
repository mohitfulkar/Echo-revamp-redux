// routes/categoryRoutes.js
import express from "express";
import {
  getCategories,
  getDesignations,
  getExpertises,
  getPanelists,
  getRsb,
} from "../controllers/choiceController.js";
const router = express.Router();

router.get("/category", getCategories);
router.get("/panelists", getPanelists);
router.get("/expertise", getExpertises);
router.get("/rsb", getRsb);
router.get("/designation", getDesignations);

export default router;
